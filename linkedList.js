import Node from "./node";

class linkedList{
    constructor(head = null){
        this.head=head;
        this.size=0
    }
    append(value){
        if(!this.head){
            this.head = new Node(value);
        }
        else{
            let current = this.head;
            while (current.nextNode != null){
                current = current.nextNode;
            }
            current.nextNode = new Node(value);
        }
        this.size++;
    }
    prepend(value){
        if(!this.head){
            this.head = new Node(value);
        }
        else{
            let newHead = new Node(value);
            newHead.nextNode = this.head;
            this.head=newHead;
        }
        this.size++;
    }
    length(){
        return this.size;
    }
    getHead(){
        return this.head;
    }
    tail(){
        let current = this.head;
        while(current.nextNode!=null){
            current = current.nextNode;
        }
        return current
    }
    at(index){
        if(index>=this.size){
            return null;
        }
        else{
            let current = this.head;
            while(index!=0){
                current = current.nextNode;
                index--;
            }
            return current;
        }
    }
    pop(){
        let beforeLastNode = this.head;
        while(beforeLastNode.nextNode.nextNode != null){
            beforeLastNode = beforeLastNode.nextNode;
        }
        beforeLastNode.nextNode=null;
        this.size--;
    }
    contains(value){
        let current=this.head;
        while(current.nextNode!=null){
            if (current.value===value){
                return true;
            }
            current = current.nextNode;
        }
        return false;
    }
    find(value){
        let index = 0;
        let current = this.head;
        while(index<this.size){
            if(current.value === value){
                return index;
            }
            index++;
            current = current.nextNode;
        }
        return null;
    }
    toString(){
        let result = '';
        let current = this.head;

        while(current.nextNode!=null){
            result += `( ${current.value} ) -> `;
            current = current.nextNode;
        }

        result += 'null';
        return result;
    }
    insertAt(value, index){
        if(index==0){
            this.prepend(value);
        }
        let i = 0;
        let current = this.head;
        while(i<index-1){
            current = current.nextNode;
            i++;
        }
        let newNode = new Node(value);
        newNode.nextNode = current.nextNode;
        current.nextNode = newNode;
        this.size++;
    }
    removeAt(index){
        if(index==0){
            this.head = this.head.nextNode;
        }
        let i = 0;
        let current = this.head;
        while(i<index-1){
            current = current.nextNode;
            i++;
        }
        current.nextNode = current.nextNode.nextNode;
        this.size--;
    }
}