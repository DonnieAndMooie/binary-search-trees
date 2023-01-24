class Node{
    constructor(value, left, right){
        this.value = value
        this.left = left
        this.right = right
    }
}

class Tree{
    constructor(array){
        this.array = array
        this.root = this.buildTree(this.sortArray(array))
    }

    buildTree(array){
        if (array.length === 0){
            return null
        }
        const mid = Math.floor(array.length/2)
        const rootValue = array[mid]
        const leftArray = array.slice(0, mid)
        const rightArray = array.slice(mid+1)
        const leftNode = this.buildTree(leftArray)
        const rightNode = this.buildTree(rightArray)
        const root = new Node(rootValue, leftNode, rightNode)
        return root
        
    }

    sortArray(array){
        array.sort(function(a, b){return a-b})
        for (let i=0; i < array.length -1; i++){
            let value = array[i]
            if (array.indexOf(value) !== i){
                array.splice(i, 1)
            }
        }
        return array
    }

    prettyPrint(node, prefix = '', isLeft = true){
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }

      insert(value){
        if (this.array.includes(value)){
            console.log(value + " is already in the tree!")
            return
        }
        this.array.push(value)
        const newNode = new Node(value, null, null)
        let root = this.root
        while(root){
            if (newNode.value > root.value){
                if (root.right){
                    root = root.right
                }
                else{
                    root.right = newNode
                    return
                }   
          }
            else{
                if (root.left){
                    root = root.left
                }
                else{
                    root.left = newNode
                    return
                }
          }
        }
    }

    delete(value){
        if (!this.array.includes(value)){
            console.log(value + " isn't in the tree so can't be deleted!")
            return
        }
        
        let root = this.root
        let parentNode

        let index = this.array.indexOf(value)
        this.array.splice(index, 1)

        while(root.value !== value){
            if (value > root.value){
                parentNode = root
                root = root.right
            }
            else{
                parentNode = root
                root = root.left
            }
        }
        if (root.left === null && root.right === null){
            if (parentNode.left === root){
                parentNode.left = null
            }
            else{
                parentNode.right = null
            }
            return
        }
        if ((root.left && !root.right) || (root.right && !root.left)){
            if (root.left){
                if(root.left.value < parentNode.value){
                    parentNode.left = root.left
                    return
                }
                else{
                    parentNode.right = root.left
                    return
                }
                

            }
            else{
                if(root.right.value < parentNode.value){
                    parentNode.left = root.right
                    return
                }
                else{
                    parentNode.right = root.right
                    return
                }
                
            }
        }
        else{
            let currentNode = root.right
            let currentNodeParent = root
            while (currentNode.left){
                currentNodeParent = currentNode
                currentNode = currentNode.left
            }
            if (currentNodeParent === root){
                if (currentNode.value > parentNode.value){
                    parentNode.right = currentNode
                }
                else{
                    parentNode.left = currentNode
                }
                currentNode.left = root.left
            }
            else{
                currentNodeParent.left = currentNode.right
                currentNode.right = root.right
                currentNode.left = root.left
                if (currentNode.value > parentNode.value){
                    parentNode.right = currentNode
                }
                else{
                    parentNode.left = currentNode
                }
            }
            

        }
    }

    find(value){
        let currentNode = this.root
        while (currentNode){
            if (currentNode.value === value){
                console.log(currentNode)
                return currentNode
            }
            else if (value > currentNode.value)(
                currentNode = currentNode.right
            )
            else{
                currentNode = currentNode.left
            }
        }

        console.log(value + " is not in the tree!")
        return
        
    }

    levelOrder(func=null){
        let queue = []
        let traversal = []
        queue.push(this.root)
        while(queue[0]){
            let currentNode = queue[0]
            traversal.push(currentNode.value)
            queue.shift()
            if (currentNode.left){
                queue.push(currentNode.left)
            }
            if (currentNode.right){
                queue.push(currentNode.right)
            }
            
        }

        if (func){
            traversal.forEach(func)
        }
        else{
            console.log(traversal)
            return traversal
        }
    }

    inorder(func=null){
        let root = this.root
        const traversal =this.#inorderTraversal(root)
        if (func){
            traversal.forEach(func)
        }
        else{
            console.log(traversal)
            return traversal
        }
    }

    #inorderTraversal(root, array=[]){
       if (root.left){
        this.#inorderTraversal(root.left, array)
       }
       array.push(root.value)
       if (root.right){
        this.#inorderTraversal(root.right, array)
       }
       return array
    }

    preorder(func=null){
        let root = this.root
        const traversal =this.#preorderTraversal(root)
        if (func){
            traversal.forEach(func)
        }
        else{
            console.log(traversal)
            return traversal
        }
    }

    #preorderTraversal(root, array=[]){
        array.push(root.value)
        if (root.left){
         this.#preorderTraversal(root.left, array)
        }
        if (root.right){
         this.#preorderTraversal(root.right, array)
        }
        return array
    }

    postorder(func=null){
        let root = this.root
        const traversal =this.#postorderTraversal(root)
        if (func){
            traversal.forEach(func)
        }
        else{
            console.log(traversal)
            return traversal
        }
    }

    #postorderTraversal(root, array=[]){
        if (root.left){
         this.#postorderTraversal(root.left, array)
        }
        if (root.right){
         this.#postorderTraversal(root.right, array)
        }
        array.push(root.value)
        return array
    }

    height(node){
        if (node === null){
            return -1
        }
        let leftHeight = this.height(node.left)
        let rightHeight = this.height(node.right)
        return (leftHeight > rightHeight ? leftHeight+1 : rightHeight + 1)
    }

    depth(node){
        let root = this.root
        if (root.value === node.value){
            console.log("Depth is 0")
            return 0
        }
        else{
            let depth = 0
            while(root.value !== node.value && root.value !== null){
                if (node.value > root.value){
                    root = root.right
                    depth++
                }
                else{
                    root = root.left
                    depth++
                }
            }
            if (root.value === null){
                console.log(root.value + " is not in the tree!")
            }
            else{
                console.log("Depth is " + depth)
                return depth
            }
        }
    }

    isBalanced(){
        let root = this.root
        let leftHeight = this.height(root.left)
        let rightHeight = this.height(root.right)
        if (leftHeight - rightHeight === -1 ||
            leftHeight - rightHeight === 0 ||
            leftHeight - rightHeight === 1){
                console.log("Tree is balanced!")
                return true
        }
        else{
            console.log("Tree is unbalanced!")
            return false
        }
    }
    
    rebalance(){
        let array = this.inorder()
        this.root = this.buildTree(array)
    }
}


function randomArray(num){
    let counter = 0 
    let array = []
    while(counter <= num){
        let x = Math.floor((Math.random()*100)+1)
        array.push(x)
        counter++
    }
    return array
}
//Simple Driver Script
let array = randomArray(20)
const tree = new Tree(array)
tree.prettyPrint(tree.root)
tree.isBalanced()
tree.levelOrder()
tree.preorder()
tree.postorder()
tree.inorder()
tree.insert(565)
tree.insert(693)
tree.insert(974)
tree.insert(432)
tree.insert(777)
tree.prettyPrint(tree.root)
tree.isBalanced()
tree.rebalance()
tree.prettyPrint(tree.root)
tree.isBalanced()
tree.levelOrder()
tree.preorder()
tree.postorder()
tree.inorder()
