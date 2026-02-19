console.log("hola desde node!");

//Esto nos permite entrar al DOM con node.js
const filesystem = require('fs');

//Escribir archivo
filesystem.writeFileSync('hola.txt', 'Hola desde node');

const arreglo = [5000, 60, 90, 100, 10, 20, 10000, 0, 120, 2000, 340, 1000, 50];

//Sort Asincronico, cuando pasen 5000 milisegundos se imprime el 5000 y etc.
for (let item of arreglo) {
    setTimeout(() => {
        console.log(item);
    }, item);
}

// CREAR SERVIDOR WEB

const http = require('http');

const server = http.createServer((request, response) => {
    console.log(request.url);
    response.setHeader('Content-Type', 'text/html');
    response.write("");
    response.end();
});

server.listen(3000);