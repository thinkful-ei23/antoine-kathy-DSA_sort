//The last question is done here first - implementing a hasmap using seperate chaining so we can use the hashmap in solving the other problems

//==================================================================
//Write a hash map implementation which uses separate chaining.

class HashMap {
	constructor(initialCapacity = 8) {
		this.length = 0;
		this.hashTable = [];
		this._capacity = initialCapacity;
		this._deleted = 0;
	}
	_findSlot(key) {
		const hash = HashMap._hashString(key);
		const index = hash % this._capacity;
		let slot = this.hashTable[index];
		if (!slot) {
			return this.hashTable[index] = { key };
		}
		if (slot.key == key)
			return slot;
		while (slot.next) {
			slot = slot.next;
			if (slot.key == key)
				return slot;
		}
		return slot.next = { key };
	}

	static _hashString(string) {
		let hash = 5381;
		for (let i = 0; i < string.length; i++) {
			//Bitwise left shift with 5 0s - this would be similar to
			//hash*31, 31 being the decent prime number
			//but bit shifting is a faster way to do this
			//tradeoff is understandability
			hash = (hash << 5) + hash + string.charCodeAt(i);
			//converting hash to a 32 bit integer
			hash = hash & hash;
		}
		//making sure has is unsigned - meaning non-negtive number
		return hash >>> 0;
	}
	_resize(size) {
		const oldSlots = this.hashTable;
		this._capacity = size;
		// Reset the length - it will get rebuilt as you add the items back
		this.length = 0;
		this._deleted = 0;
		this.hashTable = [];

		for (let i = 0; i < oldSlots.length; i++)
			for (let slot = oldSlots[i]; slot; slot = slot.next) {
				if (!slot.deleted)
					//copy to a new array
					this.insert(slot.key, slot.value);
			}

	}

	insert(key, value) {
		const loadRatio = (this.length + this._deleted + 1) / this._capacity;
		if (loadRatio > HashMap.MAX_LOAD_RATIO) {
			this._resize(this._capacity * HashMap.SIZE_RATIO);
		}
		const index = this._findSlot(key);
		if (index.deleted !== false)
			this.length++;
		index.value = value;
		index.deleted = false;
	}

	remove(key) {
		const loadRatio = (this.length + this._deleted + 1) / this._capacity;
		if (loadRatio > HashMap.MAX_LOAD_RATIO) {
			this._resize(this._capacity * HashMap.SIZE_RATIO);
		}
		const slot = this._findSlot(key);
		if (slot.deleted)
			throw new Error('Key error');
		slot.deleted = true;
		this.length--;
		this._deleted++;
	}

	get(key) {
		const slot = this._findSlot(key);
		if (slot.deleted)
			throw new Error('Key error');
		return slot.value;
	}
	//Enumerate all valid keys in the map and save them to an array
	//this way you don't have to access the HashMap members
	keys() {
		const ret = [];
		for (let i = 0; i < this.hashTable.length; ++i)
			for (let slot = this.hashTable[i]; slot; slot = slot.next)
				if (!slot.deleted)
					ret.push(slot.key);
		return ret;
	}
}

//------------------------------------------
function displayHashMapKeys(hTable) {
	const arr = hTable.keys();
	for (let i = 0; i < arr.length; i++) {
		console.log(`Bucket ${i} : ${arr[i]}`);
	}
}

//function to show implementation of hashmap
function main() {
	let hTable = new HashMap();
	let names = [{ Hobbit: "Bilbo" }, { Hobbit2: "Frodo" }, { Wizard: "Gandolf" }, { Human: "Aragon" },
	{ Elf: "Legolas" }, { Maiar: "The Necromancer" }, { Maiar2: "Sauron" }, { RingBearer: "Gollum" },
	{ LadyOfLight: "Galadriel" }, { HalfElven: "Arwen" }, { ShepherdOfTheTrees: "Treebeard" }];

	for (var i = 0; i < names.length; ++i) {
		for (let keys in names[i]) {
			hTable.insert(keys, names[i][keys]);
		}
	}
	hTable.insert("Instructor", "Tauhida");
	hTable.remove('Instructor')
	hTable.insert("Instructor2", "Chris");
	hTable.insert("TA", "Joshua");
	//console.log(hTable);
	displayHashMapKeys(hTable);

}
main();

/**********************************************
Write an algorithm to check whether any permutation of a string is a
palindrome (a string which reads the same forwards and backwards).
There are many ways to solve this problem.
YOu can create a containKey method, OR
You can use try/catch
*/
function coantainsKey(hTable, key) {
	for (let i = 0; i < hTable.hashTable.length; i++) {
		if (hTable.get(key)) {
			return true;
		}
	}
	return false;
}

function PermutationString(string) {
	let oddChar = false;
	let hm = new HashMap();
	for (let i = 0; i < string.length; i++) {
		if (coantainsKey(hm, string[i])) {
			let value = hm.get(string[i])
			hm.insert(string[i], (value + 1))
		}
		else {
			hm.insert(string[i], 1);
		}
	}
	for (let i = 0; i < hm.hashTable.length; i++) {
		for (let keys in hm.hashTable[i]) {
			if (hm.hashTable[i][keys] & 1) {
				if (oddChar) {
					return false;
				}
				oddChar = true;
			}
		}
	}

	displayHashMapKeys(hm);
	return true;;
}

// YOu can also use JS Map() class
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/

function isItPalindrome(string) {
	let oddChar = false;
	let hm = new Map(); //JS built in HashMap
	let value;
	for (let i = 0; i < string.length; i++) {
		if (hm.has(string[i])) {
			let value = hm.get(string[i]);
			hm.set(string[i], (value + 1));
		}
		else {
			hm.set(string[i], 1);
		}
	}
	const iterator = hm.values(); //just getting the values
	if (Math.floor(iterator.next().value) % 2 !== 0) {
		oddChar = true;
	}
	if (oddChar) return false;
	return true;
}

//here is another version
const palindromic = (word) => {
	const unpaired = new Map();
	for (let character of word) {
		if (unpaired.has(character)) {
			unpaired.delete(character);
		} else {
			unpaired.set(character, true);
		}
	}
	return unpaired.size <= 1;
}

function mainPalindromString() {
	//console.log(PermutationString('madam'));
	console.log(PermutationString('cllic'));
	//console.log(PermutationString('aaxxis'));
	//console.log(PermutationString('caabl'));
}

mainPalindromString();
//*******************************************************************
//Write an algorithm to group a list of words into anagrams.

function _sortword(word) {
	//Helper function: sort a word into some form of canonical order.
	//The exact order is insignificant and need not be lexicographical,
	//as long as it is utterly consistent: any two anagrams of the same
	//letter sequence must return the same string.
	return word.split('').sort().join('')
}
function group_into_anagrams(words) {
	let anagrams = new HashMap(), ret = [];
	for (let word of words) {
		let key = _sortword(word); //east
		if (anagrams.get(key)) {
			anagrams.get(key).push(word);
		}
		else {
			ret.push(anagrams.insert(key, [word]));
		}
	}
	return ret;
}

//You can use Map() class

const sort = (word) => word.split('').sort().join('');

const anagrams = (words) => {
	const groups = new Map();
	words.forEach(word => {
		const sorted = sort(word);
		const group = groups.get(sorted) || [];
		groups.set(sorted, [...group, word]);
	})
	return Array.from(groups.values());
};

console.log(anagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
/* should output:
[ [ 'east', 'teas', 'eats' ],
[ 'cars', 'arcs' ],
[ 'acre', 'race' ] ]
*/