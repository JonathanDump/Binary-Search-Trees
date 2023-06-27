class Node {
  constructor(data) {
    this.data = data || null;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }
  buildTree(arr, start, end) {
    arr = [...new Set(arr.sort((a, b) => a - b))];
    if (start > end) {
      return null;
    }

    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteNode(data, root = this.root) {
    if (root === null) {
      return null;
    }

    if (data < root.data) {
      root.left = this.deleteNode(data, root.left);
      return root.left;
    } else if (data > root.data) {
      root.right = this.deleteNode(data, root.right);
      return root.right;
    }
    console.log(root);
    root = null;
    // if (root.left === null) {
    //   let temp = root.right;
    //   root = null;
    //   return temp;
    // } else if (root.right === null) {
    //   let temp = root.left;
    //   root = null;
    //   return temp;
    // }
  }

  // deleteNode(k, root = this.root) {
  //   // Base case
  //   if (root === null) {
  //     return root;
  //   }

  //   // Recursive calls for ancestors of
  //   // node to be deleted
  //   if (root.data > k) {
  //     root.left = this.deleteNode(root.left, k);
  //     return root;
  //   } else if (root.data < k) {
  //     root.right = this.deleteNode(root.right, k);
  //     return root;
  //   }

  //   // We reach here when root is the node
  //   // to be deleted.

  //   // If one of the children is empty
  //   if (root.left === null) {
  //     let temp = root.right;
  //     //   root = null;
  //     return temp;
  //   } else if (root.right === null) {
  //     let temp = root.left;
  //     //   root = null;
  //     return temp;
  //   }

  //   // If both children exist
  //   else {
  //     let succParent = root;

  //     // Find successor
  //     let succ = root.right;
  //     while (succ.left !== null) {
  //       succParent = succ;
  //       succ = succ.left;
  //     }

  //     // Delete successor.  Since successor
  //     // is always left child of its parent
  //     // we can safely make successor's right
  //     // right child as left of its parent.
  //     // If there is no succ, then assign
  //     // succ.right to succParent.right
  //     if (succParent !== root) {
  //       succParent.left = succ.right;
  //     } else {
  //       succParent.right = succ.right;
  //     }

  //     // Copy Successor Data to root
  //     root.data = succ.data;

  //     // Delete Successor and return root
  //     //   succ = null;
  //     return root;
  //   }
  // }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(array);
const root = tree.root;
tree.insert(24);
console.log(tree.root);
tree.deleteNode(23);
tree.prettyPrint(root);
