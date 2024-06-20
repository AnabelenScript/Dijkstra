import Node from "./Node.mjs";

class LinkedList{
    #head
    #count

    constructor(){
        this.#head=null
        this.#count=0
    }

    addNode(key, weight){
        let node = new Node(key, weight)
        if(this.#head==null)
            this.#head=node
        else{
            let current = this.#head
            while(current.next!= null)
                current=current.next
            current.next=node
        }
    }
}

export default LinkedList;