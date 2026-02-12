// consola (log, info, warn, error, assert)
console.log("Hello World!");
console.info("Creado en el 2009");
console.warn("Es adictivo");
console.error("Los tanques no deben ir atrás");
console.assert(1 == true);

//== Operador "estrictamente igual" de comparación de valor y tipo 
console.assert(1 === true); 

//== variables, constantes

//Forma antigua de declarar variables, tiene mayor alcance por lo que no se recomienda
var personaje_1 = "Gwen"

//Forma moderna de declarar variables, solo vive dentro del ambito donde es declarada
let personaje_2 = "Mordekaiser";

const precio_skin = 300;

//Alcance de las variables
{
    var personaje_3 = "Jax";
    let personaje_4 = "Garen"; //Esta variable solo existe entre las llaves, por su alcance
}

console.log(personaje_3);
//console.log(personaje_4);

// alert, prompt, confirm

alert("No juegues esto por favor");
const personaje_favorito= prompt("¿Cuál es tu personaje favorito?");
console.info("Personaje favorito: " + personaje_favorito);
const hoy_hay_juego = confirm("¿Un jueguito?");
if (hoy_hay_juego) {
    descargar();
} else {
    console.info("Buen día");
}

//Funciones tradicionales
function descargar() {
    window.location.href = "https://www.leagueoflegends.com/es-mx/";
}

// Funciones modernas

() => {}

document.getElementById("boton_desinstalar").onclick = () => {
    alert("jojojo no se puede desinstalar");
}

const iniciar_partida = () => {
    alert("Iniciar partida...");
}

iniciar_partida();

// Arreglos

const personajes = ["Fizz"]; //Aqui se esta guardando lo que tiene una direccion de memoria
const arreglo2 = new Array();

personajes.push("Irelia");
personajes[10] = "Leona";

// Arreglos asociativos
personajes["hola"] = "Lux";

// Recorrido tradicional del arreglo
for (let i = 0; i < personajes.length; i++) {
    console.log(personajes[i]);
}

for (let personaje in personajes) {
    console.log(personaje);
}
