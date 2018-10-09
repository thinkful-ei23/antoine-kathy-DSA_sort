
class HashMap {
	constructor(initialSize = 8) {
		this.length = 0;
		this._slots = [];
		this._capacity = initialSize;
		this._deleted = 0;
	}


	get(key) {
		const index = this._findSlot(key);
		if (this._slots[index] === undefined) { return null; }

		return this._slots[index].value;
	}


	set(key, value) {
		const loadRatio = (this.length + this._deleted + 1) / this._capacity;
		if (loadRatio > HashMap.MAX_LOAD_RATIO) {
			this._resize(this._capacity * HashMap.SIZE_RATIO);
		}

		const index = this._findSlot(key);
		this._slots[index] = {
			key,
			value,
			deleted: false
		};
		this.length++;
	}


	remove(key) {
		const index = this._findSlot(key);
		const slot = this._slots[index];
		if (slot === undefined) {
			throw new Error('Key error');
		}
		slot.deleted = true;
		this.length--;
		this._deleted++;
		//adds a deleted marker into the slot. will be ignored on repopulation
	}


	_resize(size) {
		const oldSlots = this._slots;
		this._capacity = size;
		// Reset the length - it will get rebuilt as you add the items back
		this.length = 0;
		this._deleted = 0;
		this._slots = [];


		//repopulate newly cleared slots with what was stored in oldSlots
		for (const slot of oldSlots) {
			if (slot !== undefined && !slot.deleted) {
				this.set(slot.key, slot.value);
			}
		}
	}


	_findSlot(key) {
		const hash = HashMap._hashString(key);
		const start = hash % this._capacity;//fits within capacity

		for (let i = start; i < start + this._capacity; i++) {
			const index = i % this._capacity;
			const slot = this._slots[index];

			//empty slot OR slot with matching key
			if (slot === undefined || (slot.key == key && !slot.deleted)) {
				return index;
			}
		}
	}


	static _hashString(string) {//static method: called on the class itself, not instantiations of the class
		let hash = 5381;
		for (let i = 0; i < string.length; i++) {
			hash = (hash << 5) + hash + string.charCodeAt(i);
			hash = hash & hash;
		}
		return hash >>> 0;
	}
}
HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;



let lotr = new HashMap();

lotr.set('Hobbit', 'Bilbo');

lotr.set('Hobbit', 'Frodo');

lotr.set('Wizard', 'Gandalf');

lotr.set('Human', 'Aragon');

lotr.set('Elf', 'Legolas');

lotr.set('Maiar', 'Necromancer');

lotr.set('Maiar', 'Sauron');

lotr.set('RingBearer', 'Gollum');

lotr.set('LadyOfLight', 'Galadriel');

lotr.set('HalfElf', 'Arwen');

lotr.set('Ent', 'TreeBeard');

//console.log(JSON.stringify(lotr, null, 2));
console.log(lotr);

console.log('Get() test, returns Sauron: ' + lotr.get('Maiar'));

function palindrome(str) {
	str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''); //chars only
	const hashmap = new HashMap(); //Key: char, Value: count of occurences in string

	for (let i = 0; i < str.length; i++) {
		if (hashmap.get(str[i]) === null) { //if there's no entry for char, make one
			hashmap.set(str[i], 1);
		} else {
			let count = hashmap.get(str[i]) + 1;
			hashmap.set(str[i], count);
		}
	}


	let oddCounter = 0;
	for (let i = 0; i < str.length; i++) {

		if (hashmap.get(str[i]) % 2 === 1) {
			oddCounter++;
		}
	}


	if ((oddCounter === 1 && str.length % 2 === 1) || (oddCounter === 0 && str.length % 2 === 0)) {
		return true;
	} else {
		return false;
	}



}

console.log('Apple: ' + palindrome('apple'));
console.log('Odd Test: ' + palindrome('abbcbab'));
console.log('Even Test: ' + palindrome('babcac'));

function removeDuplicates(arr) {
	let unique_array = []
	for (let i = 0; i < arr.length; i++) {
		if (unique_array.indexOf(arr[i]) == -1) {
			unique_array.push(arr[i])
		}
	}
	return unique_array
}

function anagram(arr) {
	let hash = new HashMap();
	let result = [];
	let terms = [];
	//anagram check
	arr.forEach(word => {
		let check = word.split('').sort().join('');

		let prevEntry = hash.get(check) || [];
		hash.set(check, [...prevEntry, word]);
		terms.push(check);
	});
	terms = removeDuplicates(terms);
	console.log(hash);
	console.log(terms);
	terms.forEach(words => {
		result.push(hash.get(words));
	});
	return result;
}


console.log(anagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));