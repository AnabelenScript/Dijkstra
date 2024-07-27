import grafo from "./dependencies.js";

document.getElementById("addVertice").addEventListener("click", function() {
    let vertice = document.getElementById("numVertices").value;
    if (!vertice) {
        alert("Ingrese un nombre válido para la ubicación");
    } else {
        if (!grafo) {
            grafo = new Grafo();
        }
        grafo.agregarVertice(vertice);
        alert("Ubicación " + vertice + " agregado al grafo.");
    }
});

document.getElementById("addArista").addEventListener("click", function() {
    if (!grafo) {
        alert("Primero crea un grafo.");
        return;
    }
    let vertice1 = document.getElementById("vertice1").value.trim();
    let vertice2 = document.getElementById("vertice2").value.trim();
    let pesoArista = parseInt(document.getElementById("pesoArista").value);

    if (!vertice1 || !vertice2 || isNaN(pesoArista)) {
        alert("Ingrese valores válidos para las ubicaciones y la distancia entre ubicaciones");
    } else {
        const aristaAgregada = grafo.agregarArista(vertice1, vertice2, pesoArista);
        if (aristaAgregada) {
            alert("Arista agregada entre " + vertice1 + " y " + vertice2 + " con peso " + pesoArista);
        }
    }
});

document.getElementById("botonImprimir").addEventListener("click", function() {
    if (!grafo) {
        alert("Primero crea un grafo.");
        return;
    }
    let contenedorMatriz = document.getElementById("imprimirGrafo");
    let listaAdyacencia = grafo.obtenerListaAdyacencia();
    let salida = "";

    listaAdyacencia.forEach((lista, indice) => {
        salida += grafo.obtenerVerticePorIndice(indice) + " => ";
        lista.forEach(({ vertice, peso }) => {
            salida += `${vertice}(${peso}) `;
        });
        salida += "<br>";
    });

    contenedorMatriz.innerHTML = salida;
});

document.getElementById("iniciarDFS").addEventListener("click", function() {
    if (!grafo) {
        alert("Primero crea un grafo.");
        return;
    }
    let verticeInicio = document.getElementById("dfsInicio").value;
    if (!verticeInicio || !grafo.obtenerIndiceVertice(verticeInicio)) {
        alert("Ingrese un Ubicacion de inicio válido");
    } else {
        let visitCallback = (v1, v2) => console.log("Visitando la arista ${v1}-${v2}");
        let preVisitCallback = (v) => console.log("Visitando la Ubicacion ${v}");
        let postVisitCallback = (v) => console.log("Terminando la visita de la Ubicacion ${v}");

        let resultado = DFS(verticeInicio, visitCallback, preVisitCallback, postVisitCallback);
        let contenedorResultado = document.getElementById("resultadoDFS");
        if (resultado.todasAristasVisitadas) {
            contenedorResultado.innerHTML = `Se visitaron todas las Ubicaciones: ${resultado.verticesVisitados.join(", ")}`;
        } else {
            contenedorResultado.innerHTML = `No se visitaron todas las Ubicaciones. Ubicaciones visitados: ${resultado.verticesVisitados.join(", ")}`;
        }
    }
});

document.getElementById('iniciarDijkstra').addEventListener('click', () => {
    const verticeInicio = document.getElementById('rutaInicio').value.trim();
    const resultadoRuta = document.getElementById('resultadoRuta');

    if (!verticeInicio) {
        alert('Por favor, ingrese una ubicación válida.');
        return;
    }

    const distancias = grafo.dijkstra(verticeInicio);

    if (distancias.length > 0) {
        resultadoRuta.innerHTML = `Las distancias más cortas desde ${verticeInicio} son:<br>${distancias.map((distancia, indice) => `${grafo.obtenerVerticePorIndice(indice)}: ${distancia}`).join('<br>')}`;
    } else {
        resultadoRuta.innerHTML = 'No se encontraron rutas desde la ubicación especificada.';
    }
});
