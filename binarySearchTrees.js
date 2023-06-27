class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.inorderList = [];
  }
}

class Tree {
  constructor(arr) {
    this.values = this.sortArray(arr);
    this.root = this.buildTree(arr);
  }

  sortArray(arr) {
    return [...new Set(arr.sort((a, b) => a - b))];
  }

  buildTree(arr) {
    arr = this.sortArray(arr);
    const root = this.sortedArrayToBST(arr, 0, arr.length - 1);
    return root;
  }

  sortedArrayToBST(arr, start, end) {
    if (start > end) {
      return null;
    }

    let mid = parseInt((start + end) / 2, 10);
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

  find(data, root = this.root) {
    if (data == root.data || root == null) {
      return root;
    }
    if (data < root.data) {
      return this.find(data, root.left);
    } else if (data > root.data) {
      return this.find(data, root.right);
    }
  }

  levelOrder(func) {
    if (!func) {
      return this.values;
    }
    if (this.root == null) {
      return;
    }
    const q = [];
    q.push(this.root);

    while (q.length > 0) {
      let curr = q[0];
      func(curr);
      if (curr.left) {
        q.push(curr.left);
      }
      if (curr.right) {
        q.push(curr.right);
      }
      q.shift();
    }
  }

  getListInorder() {
    this.inorderList = [];
    return this.inorder();
  }

  inorder(func = this.toArray, root = this.root) {
    if (!func) {
      return this.values;
    }
    if (root == null) {
      return;
    }

    this.inorder(func, root.left);
    func(this.inorderList, root.data);
    this.inorder(func, root.right);

    return this.inorderList;
  }

  preorder(func, root = this.root) {
    if (!func) {
      return this.values;
    }
    if (root == null) {
      return;
    }
    func(root);
    this.preorder(func, root.left);
    this.preorder(func, root.right);
  }

  postorder(func, root = this.root) {
    if (!func) {
      return this.values;
    }
    if (root == null) {
      return;
    }

    this.postorder(func, root.left);
    this.postorder(func, root.right);
    func(root);
  }

  height(node) {
    if (node === null) {
      return 0;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root) {
    if (root.data == node.data) {
      return 0;
    }
    if (root.data > node.data) {
      this.depth(root.left) + 1;
    }
    if (root.data < node.data) {
      this.depth(root.right) + 1;
    }
  }

  toArray(arr, value) {
    arr.push(value);
  }

  isBalanced() {
    const allNodes = this.getListInorder();
    for (let i = 0; i < allNodes.length; i++) {
      const node = this.find(allNodes[i]);
      const leftSubtree = this.height(node.left);
      const rightSubtree = this.height(node.right);
      if (Math.abs(leftSubtree - rightSubtree) > 1) return false;
    }
    return true;
  }

  rebalance() {
    if (!this.rebalance()) {
      this.root = this.buildTree(this.getListInorder());
    }
    return;
  }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(array);
const root = tree.root;
tree.insert(24);
console.log(tree.root);
tree.deleteNode(23);
console.log(tree.find(23));
tree.prettyPrint(root);
tree.levelOrder(log);
console.log(tree.isBalanced());
