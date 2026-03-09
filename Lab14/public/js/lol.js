//document es el pretotipo que contiene el DOM (Document Object Model)
//console.log(document);
const gwen = {
    nombre: "Gwen",
    descripcion: `Gwen, una antigua muñeca que se transformó y cobró vida a través de la magia, 
        usa las mismas herramientas que en su momento la crearon. 
        Lleva el peso del amor de su creadora a cada paso, sin dar nada por sentado. 
        Bajo su mando está la Niebla Sagrada, una magia antigua y protectora que bendijo las tijeras, 
        las agujas y el hilo de coser de Gwen. Muchas cosas son nuevas para Gwen, 
        pero sigue decidida a luchar con gozo por el bien que prevalece en un mundo roto.`,
    tipo: "mago",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg",
}

const mordekaiser = {
    nombre: "Mordekaiser",
    descripcion: `Mordekaiser es un señor de la guerra nigromante que domina el carril superior con 
        daño mágico sostenido, gran aguante y una definitiva que aísla a enemigos en su "reino de la muerte". 
        Destaca por su pasiva de daño en área, su maza Ocaso y su capacidad para robar estadísticas, 
        siendo popular por su contundencia.`,
    tipo: "tanque",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_0.jpg",
}

const jax = {
    nombre: "Jax",
    descripcion: `Inigualable tanto en sus habilidades de armamentos únicos como en su mordaz sarcasmo, 
    Jax es el último maestro de armas conocido de Icathia. 
    Después de que su tierra natal fue destruida por su propia arrogancia al desencadenar el Vacío, 
    Jax y su especie juraron proteger lo poco que quedó. Mientras la magia aumenta en el mundo, 
    la amenaza durmiente se agita una vez más, y Jax vaga por Valoran, portando la última luz de 
    Icathia y poniendo a prueba a todos los guerreros que conoce para ver si son suficientemente 
    fuertes para erguirse a su lado...`,
    tipo: "tanque",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jax_0.jpg",
}

const div_gwen = document.getElementById("gwen");
console.log(div_gwen);

const mostrar_datos = () => {
    div_gwen.innerHTML = `
        <p class="is-size-2">${gwen.nombre}</p>
        <p>${gwen.descripcion}</p>
        <span class="tag">${gwen.tipo}</span>
    `;
    div_gwen.onclick = mostrar_imagen;
}

const mostrar_imagen = () => {
    div_gwen.innerHTML = `
        <figure class="image">
            <img class="is-rounded" src="${gwen.imagen}" />
        </figure>
    `;
    div_gwen.onclick = mostrar_datos;
}

mostrar_imagen();

div_gwen.onclick = mostrar_datos;

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
      closeAllModals();
    }
  });
});

document.getElementById("contenido_modal").innerHTML = `
    <p class="is-size-2">${mordekaiser.nombre}</p>
    <p>${mordekaiser.descripcion}</p>
    <span class="tag">${mordekaiser.tipo}</span>
`;

const div_jax = document.getElementById("jax");

const mostrar_datos_jax = () => {
    div_jax.innerHTML = `
        <p class="is-size-2">${jax.nombre}</p>
        <p>${jax.descripcion}</p>
        <span class="tag">${jax.tipo}</span>
    `;
}

const mostrar_imagen_jax = () => {
    div_jax.innerHTML = `
        <figure class="image">
            <img class="is-rounded" src="${jax.imagen}" />
        </figure>
    `;
}

mostrar_imagen_jax();
div_jax.onmouseover = mostrar_datos_jax;
div_jax.onmouseleave = mostrar_imagen_jax;