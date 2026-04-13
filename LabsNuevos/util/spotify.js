const axios = require('axios');

// Tus credenciales de Spotify
const CLIENT_ID = 'd240bd62b7b04030bd2eb97d22ad80b8';
const CLIENT_SECRET = 'c64970429e3542a0bcf91a5fdedce90b';
// REEMPLAZA ESTO CON TU URL DE NGROK
const NGROK_URL = 'https://citrus-bargraph-dexterity.ngrok-free.dev';
const REDIRECT_URI = `${NGROK_URL}/spotify/callback`;

let accessToken = null;
let tokenExpiryTime = null;

/**
 * Obtener URL de autorización de Spotify (OAuth 2.0)
 */
function getAuthorizationURL() {
    const scopes = [
        'user-top-read',
        'user-read-private',
        'user-read-email'
    ].join('%20');

    return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${scopes}`;
}

/**
 * Intercambiar código por token de acceso (OAuth 2.0)
 */
async function getAccessTokenFromCode(code) {
    try {
        const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        
        const response = await axios.post('https://accounts.spotify.com/api/token',
            `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in
        };
    } catch (error) {
        console.error('Error intercambiando código por token:', error.message);
        throw error;
    }
}

/**
 * Refrescar token expirado
 */
async function refreshAccessToken(refreshToken) {
    try {
        const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        
        const response = await axios.post('https://accounts.spotify.com/api/token',
            `grant_type=refresh_token&refresh_token=${refreshToken}`,
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return {
            accessToken: response.data.access_token,
            expiresIn: response.data.expires_in
        };
    } catch (error) {
        console.error('Error refrescando token:', error.message);
        throw error;
    }
}

/**
 * Obtener token de acceso de Spotify (Client Credentials - para datos públicos)
 */
async function getAccessToken() {
    // Si el token existe y no ha expirado, reutilizarlo
    if (accessToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
        console.log('Token de Client Credentials usando el existente');
        return accessToken;
    }

    console.log('Generando nuevo token de Client Credentials...');
    try {
        const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            'grant_type=client_credentials',
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        accessToken = response.data.access_token;
        // El token expira en 3600 segundos, guarda el tiempo de expiración (con 5 min de margen)
        tokenExpiryTime = Date.now() + (response.data.expires_in * 1000) - (5 * 60 * 1000);
        
        console.log('Token de Client Credentials generado exitosamente');
        return accessToken;
    } catch (error) {
        console.error('Error obteniendo token de Spotify:', error.message);
        throw error;
    }
}

/**
 * Obtener las 5 canciones más escuchadas del usuario autenticado
 */
async function getUserTopTracks(userAccessToken) {
    try {
        console.log('getUserTopTracks - Token:', userAccessToken.substring(0, 20) + '...');
        
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term',
            {
                headers: {
                    'Authorization': `Bearer ${userAccessToken}`
                }
            }
        );

        console.log('Respuesta exitosa de Spotify:', response.data.items.length, 'canciones');

        // Extraer información relevante
        const tracks = response.data.items.map((track, index) => ({
            position: index + 1,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            image: track.album.images[0]?.url,
            url: track.external_urls.spotify,
            previewUrl: track.preview_url
        }));

        return tracks;
    } catch (error) {
        console.error('Error obteniendo top tracks del usuario:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        return [];
    }
}

/**
 * Obtener canciones populares (funciona sin OAuth)
 */
async function getTopTracks() {
    try {
        const token = await getAccessToken();

        // Buscar las canciones más populares de un artista conocido
        // Primero obtenemos el ID del artista
        const artistSearch = await axios.get('https://api.spotify.com/v1/search?q=The%20Weeknd&type=artist&limit=1',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (!artistSearch.data.artists.items.length) {
            console.error('Artista no encontrado');
            return [];
        }

        const artistId = artistSearch.data.artists.items[0].id;

        // Obtener las top tracks del artista
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        // Extraer información relevante
        const tracks = response.data.tracks.slice(0, 5).map((track, index) => ({
            position: index + 1,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            image: track.album.images[0]?.url,
            url: track.external_urls.spotify,
            previewUrl: track.preview_url
        }));

        return tracks;
    } catch (error) {
        console.error('Error obteniendo top tracks:', error.message);
        return [];
    }
}

/**
 * Obtener información de un artista
 */
async function getArtistInfo(artistId) {
    try {
        const token = await getAccessToken();

        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error obteniendo info del artista:', error.message);
        return null;
    }
}

module.exports = {
    getAccessToken,
    getAccessTokenFromCode,
    refreshAccessToken,
    getAuthorizationURL,
    getTopTracks,
    getUserTopTracks,
    getArtistInfo
};
