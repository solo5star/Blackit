function EventHandler(listeners){
	this.listeners = listeners;

	this.register();
}
EventHandler.prototype = {
	identifierIds: [],

	register: function(){
		if(this.listeners === undefined){
			throw "Attempted to register without listeners";
		}
		var events = EventManager.getAllEvents();

		var listeners = this.listeners;

		for(var event in this.listeners){
			if(events.indexOf(event) != -1){
				this.identifierIds.push(EventManager[event](args => listeners[event](args)));
			}
		}
	},

	unregister: function(){
		this.identifierIds.forEach(id => EventManager.unregister(id));
	}
}