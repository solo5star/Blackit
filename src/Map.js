Map = function(){
	this.map = new Array();
}

Map.prototype = {
	put: function(key, value){
		this.map[key] = value;
	},

	get: function(key){
		return this.map[key];
	},

	containsKey: function(key){
		return key in this.map;
	},

	getAll: function(){
		return this.map;
	},

	clear: function(){
		this.map = new Array();
	},

	isEmpty: function(){
		return (this.map.size() === 0);
	},

	remove: function(key){
		var temp = this.map[key];
		delete this.map[key];
		return temp;
	},

	keys: function(){
		var keys = new Array();
		for(i in this.map){
			keys.push(i);
		}
		return keys;
	},

	values: function(){
		var values = new Array();
		for(var prop in this.map){
			values.push(this.map[prop]);
		}
		return values;
	},

	size: function(){
		return this.map.length;
	}
}