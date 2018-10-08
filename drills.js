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

	// console.log(JSON.stringify(lor, null, 2));
	// console.log(lor.get('Maiar'));
	let info = lor.get('Maiar');
	console.log(info);
}
lor();




