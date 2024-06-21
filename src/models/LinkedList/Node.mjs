export default class Node{
    #key
    #weight
    #next

    constructor(key, weight){
        this.#key= key;  
        this.#weight=weight;
        this.#next=null;
    }
    getKey(){
        return this.#key
    }
    getWeight(){
        return this.#weight
    }
}
