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
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
test.insert(12)
test.delete(1)
test.delete(4)
test.delete(67)
test.prettyPrint(test.root)
test.find(6345)

