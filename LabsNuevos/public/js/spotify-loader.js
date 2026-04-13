// Script para cargar las canciones favoritas de Spotify
document.addEventListener('DOMContentLoaded', function() {
    // Buscar botón de "Ver mis canciones favoritas"
    const spotifyButton = document.querySelector('a[href="/spotify/top-tracks"]');
    
    if (spotifyButton) {
        spotifyButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hacer fetch a la API JSON
            fetch('/spotify/api/top-tracks')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Redirigir a la página HTML si todo está bien
                        window.location.href = '/spotify/top-tracks';
                    } else {
                        alert('Error: ' + data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Si hay error, simple redirección
                    window.location.href = '/spotify/top-tracks';
                });
        });
    }
});
