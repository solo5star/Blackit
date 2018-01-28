const EventManager = {
	eventIdCounter: 0,
	eventIds: new Map(),
	eventListeners: new Map(),

	invoke: function(eventName, args){
		if(BlackitConfigure.TraceEvent.Enable === true && BlackitConfigure.TraceEvent[eventName] === true){
			Console.trace(eventName + (args === undefined ? "" : ": " + dumpObject(args)));
		}

		var listeners = this.eventListeners.get(eventName);
		if(listeners !== undefined){
			listeners.forEach(listener => listener(args !== undefined ? args : {}));
		}
	},

	register: function(eventName, listener){
		if(!this.eventListeners.containsKey(eventName)){
			this.eventListeners.put(eventName, new Array());
		}
		var index = this.eventListeners.get(eventName).push(listener) - 1;

		var eventId = this.eventIdCounter++;

		this.eventIds.put(eventId, [eventName, index]);

		return eventId;
	},

	unregister: function(eventId){
		if(eventId > this.eventIdCounter){
			throw "IdentifierId" + eventId + " is not registered";
		}
		if(!this.eventIds.containsKey(eventId)){
			throw "IdentifierId " + eventId + " is already unregistered";
		}
		var loc = this.eventIds.remove(eventId);

		return this.eventListeners.get(loc.shift()).splice(loc.shift(), 1).pop();
	},

	getAllEvents: function(){
		var events = [];
		var skip = 7;
		for(var property in this){
			if(--skip < 0){
				events.push(property);
			}
		}
		return events;
	}
}

function modTick(){ EventManager.invoke("onTick") }
function newLevel(){ EventManager.invoke("onNewLevel") }
function leaveGame(){ EventManager.invoke("onLeaveGame") }
function selectLevelHook(){ EventManager.invoke("onSelectLevelHook") }
function serverMessageReceiveHook(str){ EventManager.invoke("onServerMessageReceive", {message: str}) }
function chatHook(text){ EventManager.invoke("onChat", {message: text}) }
function chatReceiveHook(str, sender){ EventManager.invoke("onChatReceive", {message: str, sender: sender}) }
function startDestroyBlock(x, y, z, side){ EventManager.invoke("onStartDestroyBlock", {x: x, y: y, z: z, side: side}) }
function destroyBlock(x, y, z, side){ EventManager.invoke("onDestroyBlock", {x: x, y: y, z: z, side: side}) }
function useItem(x, y, z, itemId, blockId, side, itemDamage, blockDamage){ EventManager.invoke("onUseItem", {x: x, y: y, z: z, itemId: itemId, blockId: blockId, side: side, itemDamage: itemDamage, blockDamage: blockDamage}) }

EventManager.onTick 					= function(listener){ return EventManager.register("onTick", listener) }
EventManager.onNewLevel 				= function(listener){ return EventManager.register("onNewLevel", listener) }
EventManager.onLeaveGame 				= function(listener){ return EventManager.register("onLeaveGame", listener) }
EventManager.onSelectLevel 				= function(listener){ return EventManager.register("onSelectLevel", listener) }
EventManager.onServerMessageReceive 	= function(listener){ return EventManager.register("onServerMessageReceive", listener) }
EventManager.onChat 					= function(listener){ return EventManager.register("onChat", listener) }
EventManager.onChatReceive 				= function(listener){ return EventManager.register("onChatReceive", listener) }
EventManager.onStartDestroyBlock 		= function(listener){ return EventManager.register("onStartDestroyBlock", listener) }
EventManager.onDestroyBlock 			= function(listener){ return EventManager.register("onDestroyBlock", listener) }
EventManager.onUseItem 					= function(listener){ return EventManager.register("onUseItem", listener) }

EventManager.onScriptInit 				= function(listener){ return EventManager.register("onScriptInit", listener) }
EventManager.onScriptEnable 			= function(listener){ return EventManager.register("onScriptEnable", listener) }