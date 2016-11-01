"use strict"

const hs = require('./hiddenseek');

if(process.argv.length < 3) {
	console.log('Использование команд');
	console.log('node index hide ./field ./pokemons.json');
	console.log('node index seek ./field');
	process.exit(0);
}

if(process.argv[2] == 'hide') {
	const fs = require('fs');
	const Pokemon = require('./pokemon');
	const PokemonList = require('./pokemonlist');
	const pokemons = require(process.argv[4]);
	const objects = pokemons.map( obj => new Pokemon(obj.name, obj.level) );
	const list_of_pokemons = new PokemonList(...objects);
	
	//Спрятать покемонов и распечатать
	console.log('\nСпрятать покемонов и распечатать');
	let accepted_list = hs.hide(process.argv[3], list_of_pokemons);
	accepted_list.show();
}

if(process.argv[2] == 'seek') {
	//Найти покемонов
	console.log('\nНайти покемонов');
	hs.seek(process.argv[3]);
}