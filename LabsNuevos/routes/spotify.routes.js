const express = require('express');
const router = express.Router();
const { 
    getTopTracks, 
    getUserTopTracks,
    getAuthorizationURL,
    getAccessTokenFromCode,
    refreshAccessToken
} = require('../util/spotify');

/**
 * GET /spotify/login
 * Redirige al usuario a Spotify para autorizar
 */
router.get('/login', (request, response) => {
    const authURL = getAuthorizationURL();
    response.redirect(authURL);
});

/**
 * GET /spotify/callback
 * Spotify redirige aquí después de que el usuario autoriza
 */
router.get('/callback', async (request, response) => {
    const code = request.query.code;
    const error = request.query.error;

    console.log('=== /spotify/callback ===');
    console.log('Session ID:', request.sessionID);

    if (error) {
        return response.send(`Error: ${error}`);
    }

    if (!code) {
        return response.send('Error: No authorization code received');
    }

    try {
        // Intercambiar código por token
        const tokenData = await getAccessTokenFromCode(code);

        console.log('Token obtenido exitosamente:', {
            accessToken: tokenData.accessToken.substring(0, 20) + '...',
            refreshToken: tokenData.refreshToken ? 'presente' : 'no presente',
            expiresIn: tokenData.expiresIn
        });

        // Guardar en sesión del usuario
        request.session.spotifyAccessToken = tokenData.accessToken;
        request.session.spotifyRefreshToken = tokenData.refreshToken;
        request.session.spotifyTokenExpiry = Date.now() + (tokenData.expiresIn * 1000);

        // Obtener nombre de usuario de Spotify
        const axios = require('axios');
        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${tokenData.accessToken}`
            }
        });

        request.session.spotifyUsername = userResponse.data.display_name || userResponse.data.email || 'Usuario Spotify';

        console.log('Usuario Spotify:', request.session.spotifyUsername);
        console.log('Sesión guardada:', {
            hasAccessToken: !!request.session.spotifyAccessToken,
            hasRefreshToken: !!request.session.spotifyRefreshToken,
            username: request.session.spotifyUsername,
            sessionID: request.sessionID
        });

        // Forzar guardado de sesión antes de redirigir
        request.session.save((err) => {
            if (err) {
                console.error('Error guardando sesión:', err);
                return response.status(500).send('Error guardando sesión');
            }
            console.log('Sesión guardada en store, redirigiendo...');
            response.redirect('/personajes');
        });
    } catch (error) {
        console.error('Error en callback de Spotify:', error.message);
        response.status(500).send('Error autenticándose con Spotify');
    }
});

/**
 * GET /spotify/logout
 * Cierra la sesión de Spotify
 */
router.get('/logout', (request, response) => {
    delete request.session.spotifyAccessToken;
    delete request.session.spotifyRefreshToken;
    delete request.session.spotifyTokenExpiry;
    delete request.session.spotifyUsername;
    response.redirect('/personajes');
});

/**
 * GET /spotify/top-tracks
 * Obtiene las 5 canciones más escuchadas del usuario autenticado o canciones populares
 */
router.get('/top-tracks', async (request, response) => {
    try {
        console.log('=== /spotify/top-tracks ===');
        console.log('Session ID:', request.sessionID);
        console.log('Verificando sesión de Spotify...', {
            hasAccessToken: !!request.session.spotifyAccessToken
        });

        let tracks = [];
        let isUserTracks = false;

        // Si el usuario tiene sesión de Spotify, usar su token
        if (request.session.spotifyAccessToken) {
            console.log('Usando token de usuario');
            // Verificar si el token está expirado
            if (request.session.spotifyTokenExpiry && Date.now() > request.session.spotifyTokenExpiry) {
                console.log('Token expirado, refrescando...');
                // Refrescar el token
                try {
                    const newTokenData = await refreshAccessToken(request.session.spotifyRefreshToken);
                    request.session.spotifyAccessToken = newTokenData.accessToken;
                    request.session.spotifyTokenExpiry = Date.now() + (newTokenData.expiresIn * 1000);
                    console.log('Token refrescado exitosamente');
                } catch (error) {
                    console.error('Error refrescando token:', error.message);
                    delete request.session.spotifyAccessToken;
                    delete request.session.spotifyRefreshToken;
                }
            }

            if (request.session.spotifyAccessToken) {
                tracks = await getUserTopTracks(request.session.spotifyAccessToken);
                isUserTracks = true;
            }
        }

        // Si no hay tracks, usar canciones públicas
        if (tracks.length === 0) {
            console.log('Usando canciones públicas');
            tracks = await getTopTracks();
        }

        console.log('RENDERING TRACKS:', {
            total: tracks.length,
            isUserTracks: isUserTracks,
            tracks: tracks.map(t => ({ name: t.name, artist: t.artist }))
        });

        response.render('spotify-tracks', {
            tracks: tracks,
            isUserTracks: isUserTracks,
            username: request.session.username || '',
            csrfToken: ''
        });
    } catch (error) {
        console.error('Error en /top-tracks:', error.message);
        response.status(500).send(`Error obteniendo canciones: ${error.message}`);
    }
});

/**
 * GET /spotify/api/top-tracks (JSON)
 * Endpoint JSON para peticiones AJAX
 */
router.get('/api/top-tracks', async (request, response) => {
    try {
        console.log('=== /spotify/api/top-tracks (JSON) ===');
        let tracks = [];
        let isUserTracks = false;

        if (request.session.spotifyAccessToken) {
            if (request.session.spotifyTokenExpiry && Date.now() > request.session.spotifyTokenExpiry) {
                try {
                    const newTokenData = await refreshAccessToken(request.session.spotifyRefreshToken);
                    request.session.spotifyAccessToken = newTokenData.accessToken;
                    request.session.spotifyTokenExpiry = Date.now() + (newTokenData.expiresIn * 1000);
                } catch (error) {
                    delete request.session.spotifyAccessToken;
                    delete request.session.spotifyRefreshToken;
                }
            }

            if (request.session.spotifyAccessToken) {
                tracks = await getUserTopTracks(request.session.spotifyAccessToken);
                isUserTracks = true;
            }
        }

        if (tracks.length === 0) {
            tracks = await getTopTracks();
        }

        response.json({
            success: true,
            tracks: tracks,
            isUserTracks: isUserTracks
        });
    } catch (error) {
        console.error('Error en /api/top-tracks:', error.message);
        response.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

/**
 * GET /spotify/is-logged-in
 * Verificar si el usuario está autenticado con Spotify
 */
router.get('/is-logged-in', (request, response) => {
    const isLoggedIn = !!request.session.spotifyAccessToken;
    response.json({ isLoggedIn });
});

module.exports = router;
