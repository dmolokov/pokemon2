"use strict"
const fs = require('fs');
const Pokemon = require('./pokemon');
const PokemonList = require('./pokemonlist');
const hs = require('./hiddenseek');

const pokemons = JSON.parse(fs.readFileSync('./pokemons.json', "utf8"));
const objects = pokemons.map( obj => new Pokemon(obj.name, obj.level) );
const list_of_pokemons = new PokemonList(...objects);

//Спрятать покемонов и распечатать
console.log('\nСпрятать покемонов и распечатать');
let accepted_list = hs.hide('./field/01/', list_of_pokemons);
accepted_list.show();
accepted_list = hs.hide('./field/02/', list_of_pokemons);
accepted_list.show();

//Найти покемонов
console.log('\nНайти покемонов');
hs.seek('./field/01/');
hs.seek('./field/02/');
hs.seek('./field/03/');