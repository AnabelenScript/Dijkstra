class Grafo {
    constructor() {
        this.vertices = [];
        this.listaAdyacencia = [];
    }

    agregarVertice(nombre) {
        if (this.vertices.includes(nombre)) {
            alert(`El vértice ${nombre} ya existe.`);
            return false;
        }
        this.vertices.push(nombre);
        this.listaAdyacencia.push([]);
        return true;
    }

    agregarArista(vertice1, vertice2, peso) {
        let indice1 = this.vertices.indexOf(vertice1);
        let indice2 = this.vertices.indexOf(vertice2);
        
        if (indice1 === -1 || indice2 === -1) {
            alert("Uno o ambos vértices no existen");
            return false;
        }
        
        this.listaAdyacencia[indice1].push({ vertice: vertice2, peso });
        this.listaAdyacencia[indice2].push({ vertice: vertice1, peso });
        return true;
    }


    obtenerIndiceVertice(vertice) {
        return this.vertices.indexOf(vertice);
    }

    obtenerVerticePorIndice(indice) {
        return this.vertices[indice];
    }

    obtenerListaAdyacencia() {
        return this.listaAdyacencia;
    }

    dfs(verticeInicio) {
        let visitados = new Set();
        let resultado = [];
        let indiceInicio = this.obtenerIndiceVertice(verticeInicio);

        const recorrer = (indice) => {
            if (visitados.has(indice)) return;
            visitados.add(indice);
            resultado.push(this.obtenerVerticePorIndice(indice));
            for (let { vertice } of this.listaAdyacencia[indice]) {
                recorrer(this.obtenerIndiceVertice(vertice));
            }
        };

        recorrer(indiceInicio);
        return resultado;
    }

    bfs(verticeInicio) {
        let visitados = new Set();
        let resultado = [];
        let cola = [this.obtenerIndiceVertice(verticeInicio)];

        while (cola.length) {
            let indice = cola.shift();
            if (visitados.has(indice)) continue;
            visitados.add(indice);
            resultado.push(this.obtenerVerticePorIndice(indice));
            for (let { vertice } of this.listaAdyacencia[indice]) {
                cola.push(this.obtenerIndiceVertice(vertice));
            }
        }
        return resultado;
    }

    dijkstra(verticeInicio, verticeFinal) {
        let distancias = {};
        let previos = {};
        let cola = new Set(this.vertices);
        for (let vertice of this.vertices) {
            distancias[vertice] = Infinity;
            previos[vertice] = null;
        }
        distancias[verticeInicio] = 0;

        while (cola.size > 0) {
            let verticeActual = null;
            for (let vertice of cola) {
                if (verticeActual === null || distancias[vertice] < distancias[verticeActual]) {
                    verticeActual = vertice;
                }
            }
            if (verticeActual === verticeFinal) {
                break;
            }

            cola.delete(verticeActual);

            let indiceActual = this.obtenerIndiceVertice(verticeActual);
            for (let { vertice, peso } of this.listaAdyacencia[indiceActual]) {
                let alt = distancias[verticeActual] + peso;
                if (alt < distancias[vertice]) {
                    distancias[vertice] = alt;
                    previos[vertice] = verticeActual;
                }
            }
        }
        let camino = [];
        let u = verticeFinal;
        while (previos[u] !== null) {
            camino.unshift(u);
            u = previos[u];
        }
        if (u === verticeInicio) {
            camino.unshift(u);
        }
        return camino.length === 1 && camino[0] !== verticeInicio ? [] : camino;
    }
    
   
}

export default Grafo;
