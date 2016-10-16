'use strict'
const Pokemon = require('./pokemon');
module.exports = class PokemonList extends Array {
	
	constructor(...pokemons_array) {
		super();
		this.push(...pokemons_array);
	}
	
	show() {
		console.log('Количество покемонов: ' + this.length);
		this.forEach((item) => item.show());
	}
	
	add(name, level) {
		this.push(new Pokemon(name, level));
	}
	
	valueOf() {
		return (this.map((item) => item.level));
	}
	
	max() {
		let max_level = Math.max.apply(null, this.valueOf());
		return (
		this.find((pokemon) => {
			return pokemon.level == max_level;
		})); 
	}
};





