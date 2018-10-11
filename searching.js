'use strict'

//linear search  best: O(1)  worst: O(n)  average: O(n)
function indexOf(array, value) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] == value) {
			return i;
		}
	}
	return -1;
};

//binary search  best: O(1)  worst: O(log(n)  average: O(log(n)
function binarySearch(array, value, start, end) {
	var start = start === undefined ? 0 : start;
	var end = end === undefined ? array.length : end;

	if (start > end) {
		return -1;
	}

	const index = Math.floor((start + end) / 2);
	const item = array[index];

	console.log(start, end);
	if (item == value) {
		return index;
	}
	else if (item < value) {
		return binarySearch(array, value, index + 1, end);
	}
	else if (item > value) {
		return binarySearch(array, value, start, index - 1);
	}
};

// depth first search DFS  O(n)
//set up a basic binary tree structure:
class BinaryTree {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

dfs(values = []) {
	if (this.left) {
		values = this.left.dfs(values);
	}
	values.push(this.value);

	if (this.right) {
		values = this.right.dfs(values);
	}
	return values;
}

/*
You'll notice that in the algorithm the left branch is visited, then the node itself is handled, then the right branch is visited. This is known as an in-order search. If the node is handled before the branches then this is known as pre-ordering. And if the node is handled after the branches then this is known as post-ordering. Each ordering will give you the node values in a different order.
*/


//breadth first search  O(n)
// need to use a queue FIFO array
bfs(values = []) {
	const queue = [this];

	while (queue.length) {
		const node = queue.shift();
		values.push(node.value);
		if (node.left) {
			queue.push(node.left);
		}
		if (node.right) {
			queue.push(node.right);
		}
	}

	return values;
}

//use enqueue instead of shift / push
enqueue(data) {
	//create a node with the data that you want to add to the queue
	const node = new _Node(data);

	//if the queue is empty,
	//make the node the first node on the queue
	if (this.first === null) {
		this.first = node;
	}
	//if there is something on the queue already
	//then take the node that is currently at the end of the queue
	//and link it to the new node
	if (this.last) {
		node.next = this.last;
		this.last.prev = node;
	}
	//make the new node the last item on the queue
	this.last = node;
}

//use dequeue instead of pop

dequeue() {
	//if the queue is empty, there is nothing to return
	if (this.first === null) {
		return;
	}
	//make the first item on the queue to be the
	//the item that is next on the line
	// the item after the current first item

	const node = this.first;
	this.first = node.prev;

	//if this is the last item in the queue
	if (node === this.last) {
		this.last = null;
	}

	return node.value;
}