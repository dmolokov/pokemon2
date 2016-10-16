'use strict'
module.exports = class Pokemon {
	constructor(name, level){
		this.name = name;
		this.level = level;
	}
	
	show() {
		console.log(`Имя: ${this.name}, уровень: ${this.level}`);
	}
	
	format() {
		return(`${this.name}|${this.level}\r\n`);
	}
};
