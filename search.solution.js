/*
Exercise 1
For this exercise 1 and 2, you will be using a searching algorithm to search for an item in a dataset.
You will be testing the efficiency of the two searching algorithm, Linear search and Binary search.
You will also have UI (a simple textbox will do) through which you will be sending your input that you want to seach.
There is no server side to this program. All of this is done using React (or if you prefer, JQuery, whichever you are comfortable with).
Given the following dataset, find out how many tries did it take to search for a particular item in the dataset.
If the item is not in the dataset, proide a message and indicate how many searches did it take to do so.
89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44
21 88 27 68 15 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81
27 97 82 6 88 3 7 46 13 11 64 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98
46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5 76 62
Exercise 2
Use the dataset from the previous exercise and the same front end for this exercise.
Use array.sort to sort the dataset. Then implement Binary search to find a particular value in the dataset.
*/

//using React
//search.js component


import React from 'react';
import Output from './Output';

export default class Search extends React.Component {
	constructor() {
		super();
		this.arr = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24,
			53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14,
			33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62,
			93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67,
			16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27,
			97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31,
			26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43,
			9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39,
			42, 51, 54, 84, 34, 53, 78, 40, 14, 5];
		this.count = 0;
		this.state = {
			output: null
		};
	}

	linearSearch() {
		this.count = 0;
		const value = parseInt(this.textInput.value.trim(), 10);
		//console.log(value);
		this.textInput.value = '';
		for (let i = 0; i < this.arr.length; i++) {
			this.count++;
			if (this.arr[i] === value) {
				//console.log("found it");
				const output = `${value} found in position ${i} with ${this.count} tries`;
				this.setState({ output: output });
				this.count = 0;
				return i;
			}
		}
		const output = `${value} is not found`;
		this.setState({ output: output });
		return false;
	}

	binarySearch(arr, value, start = 0, end = arr.length) {
		this.count++;
		if (start > end) {
			return -1;
		}
		const index = Math.floor((start + end) / 2);
		//console.log(`index is ${index}`);
		const item = arr[index];
		//console.log(start, end);
		if (item === value) {
			const output = `${value} found with ${this.count} tries`;
			this.setState({ output: output });
			this.count = 0;
			return index;
		}
		else if (item < value) {
			return this.binarySearch(arr, value, index + 1, end);
		}
		else if (item > value) {
			return this.binarySearch(arr, value, start, index - 1);
		}
		this.count = 0;
	}

	doBinarySearch() {
		const value = parseInt(this.textInput.value.trim(), 10);
		console.log(`Looking for ${value}`);
		this.textInput.value = '';
		let newArr = this.arr.sort(function (a, b) { return a - b });
		this.binarySearch(newArr, value);
	}

	render() {

		return (
			<div className='userInput'>
				<input type="text" ref={(input) => { this.textInput = input }} />
				<button type='button' className='linear' onClick={() => this.linearSearch()}>Linear Search</button>
				<button type='button' className='binary' onClick={() => this.doBinarySearch()}>Binary Search</button>
				<Output info={this.state.output} />
			</div>
		);

	}

}

//Output.js component

import React from 'react';

export default class Output extends React.Component {
	render() {
		const info = this.props.info;
		return (
			<p>{info}</p>
		);
	}
}


//********************************************
//Tree Traversal

class BinarySearchTree {
	constructor(key = null, value = null, parent = null) {
		this.key = key;
		this.value = value;
		this.parent = parent;
		this.left = null;
		this.right = null;
	}

	insert(key, value) {
		if (this.key == null) {
			this.key = key;
			this.value = value;
		}
		else if (key < this.key) {
			if (this.left == null) {
				this.left = new BinarySearchTree(key, value, this);
			}
			else {
				this.left.insert(key, value);
			}
		}
		else {
			if (this.right == null) {
				this.right = new BinarySearchTree(key, value, this);
			}
			else {
				this.right.insert(key, value);
			}
		}
	}

	get(key) {
		if (this.key == key) {
			return this.value;
		}
		else if (key < this.key && this.left) {
			return this.left.get(key);
		}
		else if (key > this.key && this.right) {
			return this.right.get(key);
		}
		else {
			throw new Error('Key Error');
		}
	}

	remove(key) {
		if (this.key == key) {
			if (this.left && this.right) {
				const successor = this.right._findMin();
				this.key = successor.key;
				this.value = successor.value;
				successor.remove(successor.key);
			}
			else if (this.left) {
				this._replaceWith(this.left);
			}
			else if (this.right) {
				this._replaceWith(this.right);
			}
			else {
				this._replaceWith(null);
			}
		}
		else if (key < this.key && this.left) {
			this.left.remove(key);
		}
		else if (key > this.key && this.right) {
			this.right.remove(key);
		}
		else {
			throw new Error('Key Error');
		}
	}

	_replaceWith(node) {
		if (this.parent) {
			if (this == this.parent.left) {
				this.parent.left = node;
			}
			else if (this == this.parent.right) {
				this.parent.right = node;
			}

			if (node) {
				node.parent = this.parent;
			}
		}
		else {
			if (node) {
				this.key = node.key;
				this.value = node.value;
				this.left = node.left;
				this.right = node.right;
			}
			else {
				this.key = null;
				this.value = null;
				this.left = null;
				this.right = null;
			}
		}
	}

	_findMin() {
		if (!this.left) {
			return this;
		}
		return this.left._findMin();
	}

	//Exercise 5
	dsfInOrder() {
		if (this.left) {
			this.left.dsfInOrder();
		}
		// In-order
		console.log(this.key);
		if (this.right) {
			this.right.dsfInOrder();
		}
	}
	//Exercise 5
	dsfPreOrder() {
		// Pre-order
		console.log(this.key);

		if (this.left) {
			this.left.dsfPreOrder();
		}

		if (this.right) {
			this.right.dsfPreOrder();
		}
	}
	//Exercise 5
	dsfPostOrder() {
		if (this.left) {
			this.left.dsfPostOrder();
		}

		if (this.right) {
			this.right.dsfPostOrder();
		}
		// Post-order
		console.log(this.key);

	}

}

let bst = new BinarySearchTree();
bst.insert('E');
bst.insert('A');
bst.insert('S');
bst.insert('Y');
bst.insert('Q');
bst.insert('U');
bst.insert('E');
bst.insert('S');
bst.insert('T');
bst.insert('I');
bst.insert('O');
bst.insert('N');
//console.log(bst);

let bst2 = new BinarySearchTree();
bst2.insert(5);
bst2.insert(3);
bst2.insert(8);
bst2.insert(1);
bst2.insert(4);
bst2.insert(7);
bst2.insert(9);

/* //Exercise 5
let bst3 = new BinarySearchTree();
bst3.insert(25);
bst3.insert(15);
bst3.insert(50);
bst3.insert(10);
bst3.insert(4);
bst3.insert(6);
bst3.insert(7);
*/
////Exercise 5
//25 15 50 10 24 35 70 4 12 18 31 44 66 90 22
console.log(bst2);
console.log(`Preorder`);
bst2.dsfPreOrder();
console.log(`Inorder`);
bst2.dsfInOrder();
console.log(`PostOrder`);
bst2.dsfPostOrder();

/* Exercise 3
Imagine you are looking for a book in a library with a Dewey Decimal index.
How would you go about it? Can you express this process as a searching algorithm?
*/

//sample input
const library = [
	{ author: 'Cowlishaw, Mike', dewey: '005.133', title: 'The REXX Language' },
	{ author: 'Sams', dewey: '005.133', title: 'Teach Yourself C++ In 21 Days' },
	{ author: 'Stroustrup., Bjarne', dewey: '005.133', title: 'The C++ Programming Language' },
	{ author: 'Crockford, Douglas', dewey: '005.2762', title: 'JavaScript: The Good Parts' },
	{ author: 'Flanagan, David', dewey: '005.2762', title: 'JavaScript: The Definitive Guide' },
	{ author: 'Schmidt, Meinhard', dewey: '005.44684', title: 'Windows Vista for Dummies' },
	{ author: 'Zondervan', dewey: '220.52081', title: 'NIV Study Bible' },
	{ author: 'Humphries, Russell, Dr.', dewey: '231.7652', title: 'Starlight and Time' },
	{ author: 'Jane, Frederick Thomas', dewey: '623.82509051', title: 'Jane\'s Fighting Ships' },
	{ author: 'Norris, Chuck', dewey: '796.8092', title: 'The Official Chuck Norris Fact Book' }
];

function find_book(library, dewey, title) {
	var start = 0, end = library.length;
	while (start < end) {
		var middle = Math.floor((start + end) / 2);
		if (library[middle].dewey == dewey) {
			//Found the right code. Great! Did we find the book?
			if (library[middle].title == title)
				return library[middle];
			//Nope. Linearly search around for the book we want.
			for (var idx = middle + 1; library[idx].dewey == dewey; ++idx)
				if (library[idx].title == title)
					return library[idx];
			for (var idx = middle - 1; library[idx].dewey == dewey; --idx)
				if (library[idx].title == title)
					return library[idx];
			//Well, we found the right section, but the book isn't
			//here. Guess someone else has borrowed it. Sorry!
			return null;
		}
		if (library[middle].dewey < dewey)
			start = middle + 1;
		else
			end = middle - 1;
	}
	//We don't have anything of that Dewey code, so that book isn't
	//available. Sorry! Try another library.
	return null;
}


//Exercise 4: Implented in the above Binary tree class

/* Exercise 5
The share price for a company over a week's trading is as follows:
[128, 97, 121, 123, 98, 97, 105]. If you had to buy shares in the
company on one day, and sell the shares on one of the following days,
write an algorithm to work out what the maximum profit you could make would be.
*/

function best_profit(prices) {
	if (!prices.length) return 0;
	//Algorithm: Step through potential selling days. If the price
	//is lower than our current buying day, switch to a new buying
	//day. If the price diff between buying and selling days is
	//greater than our current best, it's our new best.
	var buy = prices[0], sell = prices[0], profit = 0;
	for (var i = 1; i < prices.length; ++i) {
		sell = prices[i];
		if (sell < buy) buy = sell;
		if (sell - buy > profit) profit = sell - buy;
	}
	return profit;
}

//Tests for best_profit
//1) The sample array
console.log(best_profit([128, 97, 121, 123, 98, 97, 105]));

function generate_prices(start, step, spread, length) {
	var ret = [];
	while (length--) {
		ret.push(start + Math.floor(Math.random() * spread - spread / 2));
		start += step;
	}
	return ret;
}
for (var i = 0; i < 10; ++i) {
	var prices = generate_prices(100, 2, 10, 10);
	console.log("Profit", best_profit(prices), "from", prices);
}
for (var i = 0; i < 10; ++i) {
	var prices = generate_prices(100, -2, 10, 10);
	console.log("Profit", best_profit(prices), "from", prices);
}


/* Exercise 6
Imagine that you wanted to find what the highest floor of a 100 story building
you could drop an egg was, without the egg breaking. But you only have two eggs.
Write an algorithm to work out which floors you should drop the eggs from to
find this out in the most efficient way.
Before you look at the solution - here is a good read: http://datagenetics.com/blog/july22012/index.html
*/

function egg_drop_practical(maxheight) {
	//Anyone who's worked with eggs knows that even a first-floor drop
	//will break an unprotected egg. So don't bother dropping them. Just
	//assume the answer is 0, and enjoy the eggs. :)
	console.log("Fry both eggs and eat them for lunch.");
	return 0;
}

function egg_drop_binary(maxheight) {
	//Okay, this one's for real. Attempt to drop eggs from different
	//heights, and see if they break. Depends on a function drop_egg(h)
	//that returns true if the egg broke, or false if it did not; this
	//function is not implemented here.
	//Optimized for the smallest number of attempts.
	var minheight = 0; ++maxheight;
	while (maxheight > minheight + 1) {
		var height = Math.floor((maxheight + minheight) / 2);
		if (drop_egg(height)) {
			//Oops, egg broke.
			maxheight = height;
		} else {
			//Whew, egg didn't break.
			minheight = height;
		}
	}
	return minheight;
}

function egg_drop_linear(maxheight) {
	//This time, optimize for the smallest number of _failures_. Again,
	//depends on drop_egg(h). Note that this ignores the risk of an egg
	//cracking without completely smashing - it pretends that a "safe"
	//drop lets you reuse the egg.
	for (var height = 1; height <= maxheight; ++height)
		if (drop_egg(height)) return height - 1;
	return maxheight;
}

function egg_drop_triangle(maxheight) {
	//Thirdly, optimizing for number of drops, relying on the fact that
	//we can afford to smash one egg and keep on dropping.
	//Algorithm from http://datagenetics.com/blog/july22012/index.html
	var jump = Math.floor(Math.sqrt(2 * maxheight));
	var floor = jump;
	while (floor <= maxheight && !drop_egg(floor)) {
		// Jump up one less floor each time (because we have done one
		// extra drop).
		if (jump > 1)--jump;
		floor += jump;
	}

	// When it breaks, go back to the highest known good floor
	floor -= jump;

	// Then work up one floor at a time
	while (++floor <= maxheight && !drop_egg(floor));
	return floor - 1;
}

//Tests for egg drop functions. We attempt both algorithms with a variety of
//egg strengths (defined by changing the real_max). The binary search will
//finish a lot more quickly than the linear one will, but it's likely to get
//a few splots along the way.....
var real_max;
function drop_egg(height) {
	console.log("[" + real_max + "] Dropping egg from " + height + "...",
		height > real_max ? "SPLOT" : "Safe");
	return height > real_max;
}
console.log("================"); real_max = 0;
console.log("Practical:", egg_drop_practical(100));
console.log("----------------");
console.log("Binary:", egg_drop_binary(100));
console.log("----------------");
console.log("Linear:", egg_drop_linear(100));
console.log("----------------");
console.log("Triang:", egg_drop_triangle(100));
console.log("================"); real_max = 17;
console.log("Binary:", egg_drop_binary(100));
console.log("----------------");
console.log("Linear:", egg_drop_linear(100));
console.log("----------------");
console.log("Triang:", egg_drop_triangle(100));
console.log("================"); real_max = 96;
console.log("Binary:", egg_drop_binary(100));
console.log("----------------");
console.log("Linear:", egg_drop_linear(100));
console.log("----------------");
console.log("Triang:", egg_drop_triangle(100));
console.log("================"); real_max = 200;
console.log("Binary:", egg_drop_binary(100));
console.log("----------------");
console.log("Linear:", egg_drop_linear(100));
console.log("----------------");
console.log("Triang:", egg_drop_triangle(100));
console.log("================");
