// Laboratorio 8

function calcularPromedio(numeros) {
    if (!Array.isArray(numeros)) {
        throw new Error("El parámetro debe ser un arreglo");
    }

    if (numeros.length === 0) {
        return 0;
    }

    let suma = 0;
    for (let i = 0; i < numeros.length; i++) {
        suma += numeros[i];
    }

    return suma / numeros.length;
}


const fs = require("fs");

function escribirTextoEnArchivo(texto) {
    if (typeof texto !== "string") {
        throw new Error("El parámetro debe ser un string");
    }

    fs.writeFileSync("texto.txt", texto, "utf8");
    console.log("Archivo escrito correctamente");
}

const prueba1 = [0, 1, 4, 5];

console.log("Promedio:", calcularPromedio(prueba1));

escribirTextoEnArchivo("Archivo escrito desde Node.js");

console.log("Pasó la prueba, yei");