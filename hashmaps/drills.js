'use strict'

const HashMap = require('./hashmap.js');


function lor(key, value) {
	let lor = new HashMap();

	lor.set("Hobbit", "Bilbo");
	lor.set("Hobbit", "Frodo");
	lor.set("Wizard", "Gandolf");
	lor.set("Human", "Aragon");
	lor.set("Elf", "Legolas");
	lor.set("Maiar", "The Necromancer");
	lor.set("Maiar", "Sauron");
	lor.set("RingBearer", "Gollum");
	lor.set("LadyOfLight", "Galadriel");
	lor.set("HalfElven", "Arwen");
	lor.set("Ent", "Treebeard");

	// console.log(JSON.stringify(lor, null, 2)); // easier to read with null and 2 added
	// console.log(JSON.stringify(lor));

	// console.log(lor.get('Maiar')); //works
	// let info = lor.get('Maiar'); //works
	// console.log(info);  					//works
}
lor();


function palindrome(str) {
	let hashmap = new HashMap();
	str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

	let keys = [];

	for (let i = 0; i < str.length; i++) {
		if (hashmap.get(str[i]) === null) { //error message if not found
			hashmap.set(str[i], 1);  //make a slot with value of 1

			keys.push(str[i]); //making array of the char of str

		} else {
			let count = hashmap.get(str[i]) + 1;// count = hash +1
			hashmap.set(str[i], count);
		}
	}


	let oddCounter = 0;
	for (let i = 0; i < keys.length; i++) {
		console.log(keys.length, 'level')

		// console.log(i, 'madam')

		if (hashmap.get(keys[i]) % 2 === 1) {
			// console.log(keys[i], 'hannah');
			oddCounter++;
		}

	} console.log(oddCounter, '1991')
	if ((oddCounter === 1 && str.length % 2 === 1) || (oddCounter === 0 && str.length % 2 === 0)) {
		return true;
	} else {
		return false;
	}
}
console.log(palindrome('racecar'));  //true
console.log(palindrome('aabbccdd')); //true
console.log(palindrome('abbcbab')); //true
console.log(palindrome('asdfghj')); //false
console.log(palindrome('aaaaabbbbcccc')); //true X
console.log(palindrome('111223344')); //true X
console.log(palindrome('north')); //false


//sort letters in each word
//compare