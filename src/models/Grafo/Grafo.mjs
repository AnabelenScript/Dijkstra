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

    dijkstra(verticeInicio) {
        const INF = 100000;
        let l = []; 
        let v = []; 
        let lp = [];
        let d = []; 
        let dp = []; 

        for (let i = 0; i < this.vertices.length; i++) {
            v[i] = i;
            lp[i] = v[i];
            d[i] = INF;
            dp[i] = INF;
        }

        let v1 = this.obtenerIndiceVertice(verticeInicio);
        d[v1] = 0;
        dp[v1] = 0; 

        while (l.length != v.length) {
            let min = INF;
            let minIndex = -1;

            for (let i = 0; i < v.length; i++) {
                if (lp[i] !== null && dp[i] < min) {
                    min = dp[i];
                    minIndex = i;
                }
            }
            if (minIndex === -1) break; 
            l.push(minIndex); 
            lp[minIndex] = null;
            for (let i = 0; i < v.length; i++) {
                if (lp[i] !== null) {
                    let alt = dp[minIndex] + this.listaAdyacencia[minIndex].find(({ vertice }) => vertice === this.obtenerVerticePorIndice(i))?.peso || INF;
                    if (alt < dp[i]) {
                        dp[i] = alt;
                    }
                }
            }
            for (let i = 0; i < v.length; i++) {
                if (d[i] === INF && dp[i] !== INF && dp[i] >= 0) {
                    d[i] = dp[i];
                }
            }
        }
        return d;
    }
}

export default Grafo;
