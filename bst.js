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
        this.prettyPrint(this.root)
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
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])