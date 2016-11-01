'use strict'
var fs = require('fs');
const random = require('./random');
const Pokemon = require('./pokemon');
const PokemonList = require('./pokemonlist');                      

const hide = (path, pokemonlist) => {
	let directories = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
	let list_to_return = new PokemonList();
	let rand_number_pokemons = random(1, (pokemonlist.length < 3) ? pokemonlist.length : 3);
	for(var i = 0; i < rand_number_pokemons; i++) {
		let temp_pokemon = pokemonlist.splice(random(0, pokemonlist.length - 1), 1)[0];
		list_to_return.push(temp_pokemon);
		let full_path = path + '/' + directories.splice(random(0, directories.length - 1), 1)[0];
		if (!fs.existsSync(full_path)){
			fs.mkdirSync(full_path);
		}
		fs.writeFile(full_path + "/pokemon.txt", temp_pokemon.format(), ( err ) => {
			if( err ) {
					return console.log( err );
				}
		});
	}
	
	return list_to_return;
};

function checkAccess(file) {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.R_OK, err => {
            if (err) return reject(err);
            resolve(file);
        });
    });
};

function getFileContent(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, { encoding: 'utf-8'}, (err, text) => {
            if (err) return reject(err);
            resolve(text);
        });
    });
};

function showFile(file) {
    return checkAccess(file)
        .then(getFileContent);
};

const seek = (path) => {
	let directories = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
	directories.forEach(item => {
		if (fs.existsSync(path + '/' + item)) {
			showFile(path + '/' + item + '/pokemon.txt')
			.then(processFile)
			.catch(err => console.log('С файлом что-то не так'));
		}
	});
};

function convert_to_array_of_objects(content) {
	let rv = []
	let objects = content.split("\r\n");
	objects.forEach((a) => {
		if(a != '') {
			let parts = a.split('|');
			rv.push({"name": parts[0], "level": parts[1]});
		}
	});
	
	return rv;
};

function processFile(content) {
	const pokemons = convert_to_array_of_objects(content);
	const objects = pokemons.map( obj => new Pokemon(obj.name, obj.level) );
	const list_of_pokemons = new PokemonList(...objects);
	list_of_pokemons.show();
};

module.exports = { hide, seek };
 