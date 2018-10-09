'use strict'

class HashMap {
	constructor(initialCapacity = 8) {
		this.length = 0;
		this._slots = [];
		this._capacity = initialCapacity;
		this._deleted = 0;
	}

	get(key) {
		const index = this._findSlot(key);
		if (this._slots[index] === undefined) {
			// throw new Error('Key error');
			return null;
		}
		return this._slots[index].value;
	}

	set(key, value) { // = insert
		const loadRatio = (this.length + this._deleted + 1) / this._capacity;  //error type message - if loadRatio is larger, resize hashmap
		if (loadRatio > HashMap.MAX_LOAD_RATIO) {
			this._resize(this._capacity * HashMap.SIZE_RATIO);
		}

		const index = this._findSlot(key);  // index =
		this._slots[index] = {
			key,
			value,
			deleted: false
		};
		this.length++;  //more for reference and speed than creating an index
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
	}

	_findSlot(key) { // = lookup
		const hash = HashMap._hashString(key);  // storing hashString
		const start = hash % this._capacity;  // storing start (hash % capacity)

		for (let i = start; i < start + this._capacity; i++) {// loop thru hashmap
			const index = i % this._capacity;  // figure out index and store index from 1 % capacity
			const slot = this._slots[index];  // store slot from slot[index]
			if (slot === undefined || slot.key == key) { //stopping at the key or empty slot
				return index;
			}
		}
	}
	_resize(size) {
		const oldSlots = this._slots; // storing data of slots to oldSlots
		this._capacity = size;  // store initialCapacity as size
		// Reset the length - it will get rebuilt as you add the items back
		this.length = 0;
		this._deleted = 0;
		this._slots = [];

		for (const slot of oldSlots) { // new for loop - slots = i of OldSlots
			if (slot !== undefined) {  // slot has data
				this.set(slot.key, slot.value);  // insert the key and value
			}
		}
	}
	static _hashString(string) {
		let hash = 5381; //prime number to start with
		for (let i = 0; i < string.length; i++) {  //for loop for each
			hash = (hash << 5) + hash + string.charCodeAt(i); //charCodeAt = ASCII numerals
			hash = hash & hash;
		}
		return hash >>> 0;
	}
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

module.exports = HashMap