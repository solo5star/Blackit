function EventHandler(listeners){
	this.listeners = listeners;

	this.register();
}
EventHandler.prototype = {
	eventIds: [],

	register: function(){
		if(this.listeners === undefined){
			throw "Attempted to register without listeners";
		}
		var events = EventManager.getAllEvents();

		var listeners = this.listeners;

		for(var event in this.listeners){
			if(events.indexOf(event) != -1){
				this.eventIds.push(EventManager[event](args => listeners[event](args)));
			}
		}
	},

	unregister: function(){
		if(this.eventIds.length == 0){
			throw "Not registered any listeners";
		}
		this.eventIds.forEach(id => EventManager.unregister(id));
	}
}