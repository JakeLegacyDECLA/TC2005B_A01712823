//document es el pretotipo que contiene el DOM (Document Object Model)
//console.log(document); //muestra todo el DOM desde Javascript

//Objeto
const gwen = {
    nombre: "Gwen",
    descripcion: `Gwen, una antigua muñeca que se transformó y cobró vida a través de la magia,
    usa las mismas herramientas que en su momento la crearon. 
    Lleva el peso del amor de su creadora a cada paso, sin dar nada por sentado. 
    Bajo su mando está la Niebla Sagrada, una magia antigua y protectora que bendijo 
    las tijeras, las agujas y el hilo de coser de Gwen. Muchas cosas son nuevas para Gwen, 
    pero sigue decidida a luchar con gozo por el bien que prevalece en un mundo roto.`,
    tipo: "mago",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg",
}

const morde = {
    nombre: "Mordekaiser",
    descripcion: `Asesinado dos veces y renacido tres, Mordekaiser es un señor de la guerra brutal de una época olvidada, 
    quien usa su brujería nigromántica para atar almas a una esclavitud eterna. 
    Quedan muy pocos que recuerden sus conquistas precedentes o que conozcan el 
    verdadero alcance de sus poderes, pero las antiguas almas que lo hacen, 
    temen que llegue el día que regrese para reclamar el dominio sobre vivos y muertos.`,
    tipo: "tanque",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_0.jpg"
}

const div_gwen = document.getElementById("gwen");
console.log(div_gwen);

div_gwen.onclick = () => {
    console.log("Click en gwen");
}

const mostrar_datos = () => {
    div_gwen.innerHTML = `<p class="is-size-2">${gwen.nombre}</p>
    <p>${gwen.descripcion}</p>
    <span class="tag">${gwen.tipo}</span>
    `;
    div_gwen.onclick = mostrar_imagen;
}

const mostrar_imagen = () => {
    div_gwen.innerHTML = `<figure class="image">
    <img class="is-rounded" src=${gwen.imagen}>
    </figure>`;
    div_gwen.onclick = mostrar_datos;
}

const modal = document.getElementById("modal-js-example");
const btnMorde = document.querySelector("#morde .js-modal-trigger");
const contenidoModal = document.getElementById("contenido_modal");

btnMorde.onclick = () => {
  contenidoModal.innerHTML = `
    <p class="is-size-3">${morde.nombre}</p>
    <p>${morde.descripcion}</p>
    <span class="tag">${morde.tipo}</span>
  `;
  modal.classList.add("is-active");
};

// cerrar modal (background, X, y ESC)
modal.querySelector(".modal-background").onclick = () => {
    modal.classList.remove("is-active");
}
modal.querySelector(".modal-close").onclick = () => {
    modal.classList.remove("is-active");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.classList.remove("is-active");
});

mostrar_imagen();


