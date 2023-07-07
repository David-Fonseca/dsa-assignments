import Node from "./node";

class Tree{
    constructor(array){
        this.sortedArray=Array.from(new Set(array))
        this.root = this.buildTree(sortedArray, 0, this.sortedArrayrray.length-1);
    }
    buildTree(arr, start, end){
        if(start>end){
            return null;
        }
        
        let mid = parseInt((start + end)/2);
        let node = new Node(arr[mid]);
        node.left = this.buildTree(arrSorted, start, mid-1);
        node.right = this.buildTree(arrSorted, mid+1, end);

        return node;
    }
    insert(value){
        let currentNode = this.root;

        while (currentNode !== null && currentNode.value !== value){
            if(currentNode.value < value){
                if(currentNode.right == null){
                    currentNode.right = new Node(value);
                    return;
                }
                currentNode = currentNode.right;
            }
            else if(currentNode.value > value ){
                if(currentNode.left == null){
                    currentNode.left = new Node(value);
                    return;
                }
                currentNode = currentNode.left;
            }
        }
    }
    delete(node, value){
        if(node === null){
            return null;
        }

        if(value < node.value){
            node.left = this.delete(node.left, value);
            return node;
        }
        else if(value > node.value){
            node.right = this.delete(node.right, value);
            return node;
        }
        else{
            //we are in matching node
            if(node.left === null){
                return node.right;
            }
            else if(node.right === null){
                return node.left;
            }

            //find min from right subtree
            let currentNode = node.right;
            while(currentNode.left !== null){
                currentNode = currentNode.left;
            }
            node.value = currentNode.value;
            node.right = this.delete(node.right,value)
        }
        return node;
    }
    find(value){
        let currentNode = this.root;

        while(currentNode != null){
            if(currentNode.value === value){
                return currentNode;
            }
            else if(value > currentNode.value){
                currentNode = currentNode.right;
            }
            else{
                currentNode = currentNode.left;
            }
        }
        return currentNode;
    }
    levelOrder(fn){
        if(typeof fn !== "function"){
            return this.levelOrderValues();
        }

        const queue = [];
        const values = [];

        if(this.root !== null){
            queue.push(this.root);
        }
        while(queue.length>0){
            const node = queue.shift()

            values.push(node.value);
            if(node.left !==null){
                queue.push(node.left);
            }
            if(node.right !==null){
                queue.push(node.right)
            }
        }
        values.forEach((value)=>{fn(value)});
    }
    levelOrderValues(){
        const values = [];
        this.levelOrder(value => {values.push(value)})
        return values;
    }

    preOrder(fn){
        if(typeof fn !== 'function'){
            const values = [];
            this.preOrder(value=>{
                values.push(value);
            })
            return values;
        }
        const stack = [];
        let values = [];

        if(this.root !== null){
            stack.push(this.root);
        }
        while(stack.length>0){
            const node = stack.pop()

            values.push(node.value);
            if(node.right !==null){
                queue.push(node.right)
            }
            if(node.left !==null){
                queue.push(node.left);
            }

        }
        values.forEach((value)=>{fn(value)});
    }
    postOrder(fn){
        if(typeof fn !== 'function'){
            const values = [];
            this.postOrder(value=>{
                values.push(value);
            })
            return values;
        }
        const stack = [];
        let values = [];

        if(this.root !== null){
            stack.push(this.root);
        }
        while(stack.length>0){
            const node = stack.pop()
            
            if(node.right !==null){
                queue.push(node.right)
            }
            if(node.left !==null){
                queue.push(node.left);
            }


            if(node.left !== null){
                values.push(node.left.value)
            }
            if(node.right !== null){
                values.push(node.right.value)
            }
            values.push(node.value);

        }
        values = Array.from(new Set(values))
        values.forEach((value)=>{fn(value)});
    }

    inOrder(fn){
        if(typeof fn !== 'function'){
            const values = [];
            this.inOrder(value=>{
                values.push(value);
            })
            return values;
        }
        const stack = [];
        let values = [];

        if(this.root !== null){
            stack.push(this.root);
        }
        while(stack.length>0){
            const node = stack.pop()
            
            if(node.right !==null){
                stack.push(node.right)
            }
            if(node.left !==null){
                stack.push(node.left);
            }


            if(node.left !== null){
                values.push(node.left.value)
            }
            values.push(node.value);
            if(node.right !== null){
                values.push(node.right.value)
            }
            

        }
        values = Array.from(new Set(values))
        values.forEach((value)=>{fn(value)});
    }
    height(node){
        if (node === null){
            return -1;
        }
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        return Math.max(leftHeight,rightHeight) + 1;
    }
    depth(node,root=this.root, depth = 0){
        if(node === null || root === null){
            return;
        }
        if (node===root){
            return depth;
        }
        if(node.value<root.value){
            return this.depth(node, root.left, depth+1);
        }
        if(node.value>root.value){
            return this.depth(node, root.right, depth+1);
        }
    }
    isBalanced(){
        const root = this.root;
        const lH = this.height(root.left);
        const rH = this.height(root.right);
        return Math.abs(lH-rH)<2 ? true : false;
    }
    rebalance(){
        const newValues =  this.inOrder();
        this.buildTree(newValues,0,newValues.length-1)
    }

}