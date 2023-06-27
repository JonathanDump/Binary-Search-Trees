class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    arr = [...new Set(arr.sort((a, b) => a - b))];
    const root = this.sortedArrayToBST(arr, 0, arr.length - 1);
    return root;
  }

  sortedArrayToBST(arr, start, end) {
    if (start > end) {
      return null;
    }

    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = this.sortedArrayToBST(arr, start, mid - 1);
    node.right = this.sortedArrayToBST(arr, mid + 1, end);
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
  minValue(node) {
    let min = node.data;
    while (node.left != null) {
      min = node.left.data;
      node = node.left;
    }
    return min;
  }

  deleteNode(data, root = this.root) {
    if (root == null) {
      return root;
    }

    if (data < root.data) {
      root.left = this.deleteNode(data, root.left);
    } else if (data > root.data) {
      root.right = this.deleteNode(data, root.right);
    } else {
      if (root.left == null) {
        return root.right;
      }
      if (root.right == null) {
        return root.left;
      }

      root.data = this.minValue(root.right);
      root.right = this.deleteNode(root.data, root.right);
    }
    return root;
  }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(array);
const root = tree.root;
tree.insert(24);
console.log(tree.root);
tree.deleteNode(23);
tree.prettyPrint(root);
