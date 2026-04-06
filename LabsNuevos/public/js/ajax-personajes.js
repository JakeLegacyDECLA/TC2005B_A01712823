/**
 * Componente AJAX para cambiar el tipo de personaje
 * Permite actualizar el tipo sin recargar la página
 */

// Obtener el token CSRF de un elemento hidden en la página
function getCsrfToken() {
    const csrfElement = document.getElementById('_csrf');
    return csrfElement ? csrfElement.value : '';
}

// Función para cambiar el tipo de personaje vía AJAX
async function cambiarTipoPersonaje(personajeId, nuevoTipo, btnElement) {
    try {
        const csrf = getCsrfToken();

        const response = await fetch('/personajes/api/change-type', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf
            },
            body: JSON.stringify({
                id: personajeId,
                tipo_id: nuevoTipo
            })
        });

        const data = await response.json();

        if (data.success) {
            // Mostrar mensaje de éxito
            mostrarNotificacion('Tipo actualizado correctamente', 'success', btnElement);
        } else {
            // Mostrar mensaje de error
            mostrarNotificacion('Error: ' + data.message, 'error', btnElement);
        }
    } catch (error) {
        console.error('Error en la petición AJAX:', error);
        mostrarNotificacion('Error en la conexión', 'error', btnElement);
    }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo, elemento) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notification is-${tipo === 'success' ? 'success' : 'danger'}`;
    notificacion.style.position = 'fixed';
    notificacion.style.top = '20px';
    notificacion.style.right = '20px';
    notificacion.style.zIndex = '9999';
    notificacion.style.minWidth = '300px';
    
    notificacion.innerHTML = `
        <button class="delete"></button>
        <strong>${tipo === 'success' ? 'Éxito' : 'Error'}:</strong> ${mensaje}
    `;

    document.body.appendChild(notificacion);

    // Botón para cerrar notificación
    const closeBtn = notificacion.querySelector('.delete');
    closeBtn.addEventListener('click', () => {
        notificacion.remove();
    });

    // Auto-cerrar después de 4 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.remove();
        }
    }, 4000);
}

// Cargar los tipos disponibles vía AJAX
async function cargarTiposDisponibles(selectElement) {
    try {
        const csrf = getCsrfToken();
        
        const response = await fetch('/personajes/api/tipos', {
            method: 'GET',
            headers: {
                'csrf-token': csrf
            }
        });

        const data = await response.json();

        if (data.success && data.tipos) {
            // Limpiar opciones actuales (excepto la primera si existe)
            const currentValue = selectElement.value;
            selectElement.innerHTML = '';

            // Agregar opciones de tipos
            data.tipos.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo.id;
                option.textContent = tipo.nombre;
                if (tipo.id == currentValue) {
                    option.selected = true;
                }
                selectElement.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error al cargar tipos:', error);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Obtener todos los selectores de tipo
    const selectores = document.querySelectorAll('.tipo-selector-ajax');
    
    selectores.forEach(selector => {
        // Cargar tipos disponibles
        cargarTiposDisponibles(selector);

        // Agregar listener para cambios
        selector.addEventListener('change', (e) => {
            const personajeId = selector.dataset.personajeId;
            const nuevoTipo = e.target.value;
            cambiarTipoPersonaje(personajeId, nuevoTipo, e.target);
        });
    });
});
