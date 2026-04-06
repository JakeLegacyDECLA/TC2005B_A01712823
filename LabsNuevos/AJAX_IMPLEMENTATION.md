# AJAX Implementation - LabsNuevos

## Resumen de Implementación

Se ha agregado funcionalidad AJAX completa al proyecto LabsNuevos, permitiendo actualizar datos de forma asincrónica sin recargar la página.

---

## Componentes AJAX Implementados

### 1. **Cambio de Tipo de Personaje (AJAX)**
- **Ubicación:** Página de Lista de Personajes (`/personajes`)
- **Funcionalidad:** 
  - Selector desplegable para cambiar el tipo de cada personaje
  - El cambio se envía automáticamente al servidor vía AJAX
  - La página NO se recarga
  - Notificaciones de éxito o error
- **Endpoint:** `PUT /personajes/api/change-type`
- **Datos:** `{id: number, tipo_id: number}` → JSON

### 2. **Carga Dinámica de Tipos (AJAX)**
- **Ubicación:** Página de Lista de Personajes
- **Funcionalidad:**
  - Se obtienen todos los tipos disponibles al cargar la página
  - Los selectores se rellenan asincronamente
  - Reutilizable para múltiples personajes
- **Endpoint:** `GET /personajes/api/tipos`
- **Respuesta:** `{success: boolean, tipos: Array<{id, nombre}>}`

---

## Archivos Modificados/Creados

### Backend (Servidor)

1. **[app.js](app.js)**
   - Agregado: `app.use(bodyParser.json())` para manejar peticiones JSON
   - Agregado: Ruta GET `/ajax-info` para página de información

2. **[controllers/personajes.controller.js](controllers/personajes.controller.js)**
   - Modificado: `get_list` - Agregado `csrfToken` a la vista
   - Agregado: `put_change_type` - Actualiza tipo vía AJAX
   - Agregado: `get_types_json` - Obtiene tipos en formato JSON

3. **[routes/personajes.routes.js](routes/personajes.routes.js)**
   - Agregado: `router.get('/api/tipos', ...)`
   - Agregado: `router.put('/api/change-type', ...)`
   - Agregado: `router.post('/add', ...)` (que faltaba)

### Frontend (Cliente)

4. **[public/js/ajax-personajes.js](public/js/ajax-personajes.js)** ⭐ NUEVO
   - Función `cambiarTipoPersonaje()` - Envía petición AJAX PUT
   - Función `cargarTiposDisponibles()` - Obtiene todos los tipos
   - Función `mostrarNotificacion()` - Muestra feedback al usuario
   - Función `getCsrfToken()` - Obtiene token de seguridad
   - Event listeners automáticos para inicialización

5. **[views/list.ejs](views/list.ejs)**
   - Modificado: Agregado componente AJAX con selectores dinámicos
   - Modificado: Diseño mejorado con tarjetas (Bulma CSS)
   - Agregado: Mensaje informativo sobre AJAX
   - Agregado: Script AJAX `/js/ajax-personajes.js`
   - Agregado: Token CSRF en input hidden

6. **[views/ajax-info.ejs](views/ajax-info.ejs)** ⭐ NUEVO
   - Página informativa completa sobre componentes AJAX
   - Explicación de cada endpoint
   - Arquitectura MVC
   - Diagrama de flujo
   - Ventajas implementadas

7. **[views/includes/_header.ejs](views/includes/_header.ejs)**
   - Modificado: Agregado enlace " Info AJAX" en navbar

---

## Flujo AJAX Implementado

```
Navegador (Click en select)
    ↓
JavaScript AJAX (fetch)
    ↓
Servidor (PUT /personajes/api/change-type)
    ↓
Controlador (put_change_type)
    ↓
Modelo (Personaje.edit)
    ↓
Base de Datos (UPDATE)
    ↓
Response JSON {success: true, message: "..."}
    ↓
JavaScript procesa respuesta
    ↓
Notificación al usuario
    ↓
DOM actualizado (SIN RECARGAR)
```

---

## Seguridad CSRF Implementada

- Token CSRF se obtiene de input hidden en la página
- Se envía en header `csrf-token` en todas las peticiones AJAX
- Protege contra Cross-Site Request Forgery
- Validado en el middleware `csrfProtection` de Express

---

## Arquitectura MVC

```
Model (personaje.model.js)
  └─ Métodos: fetchOne(), edit(), fetchAll()

View (views/list.ejs, views/ajax-info.ejs)
  └─ Presentación con selectores AJAX
  └─ Información documentada para el usuario

Controller (controllers/personajes.controller.js)
  └─ get_list() - Renderiza vista con lista
  └─ put_change_type() - API AJAX para cambio de tipo
  └─ get_types_json() - API AJAX para obtener tipos

Routes (routes/personajes.routes.js)
  ├─ GET /personajes - Lista
  ├─ GET /personajes/api/tipos - API
  └─ PUT /personajes/api/change-type - API

JavaScript (public/js/ajax-personajes.js)
  └─ Cliente AJAX - Fetch, parseJSON, DOM Update, notificaciones
```

---

## Características Implementadas

- Peticiones AJAX asincrónicas con Fetch API
- Respuestas en formato JSON
- Sin recargas de página
- Notificaciones de éxito/error
- Token CSRF para seguridad
- Arquitectura MVC clara
- Middleware bodyParser para JSON
- Página informativa documentada
- Interfaz amigable con Bulma CSS
- Manejo de errores robusto

---

## Cómo Usar

1. **Accede a la lista de personajes:** `/personajes`
2. **Nota los selectores de tipo con "Tipo (AJAX)"**
3. **Cambia el tipo en cualquier personaje**
4. **Observa cómo se actualiza SIN recargar la página**
5. **Lee más información en:** `/ajax-info`

---

## URLs Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/personajes` | Lista con AJAX |
| GET | `/ajax-info` | Información sobre AJAX |
| GET | `/personajes/api/tipos` | API - Obtener tipos |
| PUT | `/personajes/api/change-type` | API - Cambiar tipo |

---

## Ventajas AJAX Implementadas

- **Experiencia fluida:** Sin interrupciones de página
- **Respuesta rápida:** Datos en JSON (más livianos)
- **Mejor UX:** Notificaciones inmediatas
- **Seguro:** Protección CSRF en todas las peticiones
- **Escalable:** Fácil agregar más componentes AJAX
- **Mantenible:** Código organizado y bien documentado

---

**Estado:** Completamente implementado y funcional
**Prueba:** Accede a `/personajes` y cambia el tipo de un personaje
