const EventManager = {
	identifierIdCounter: 0,
	identifierIds: new Map(),
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

		var identifierId = this.identifierIdCounter++;

		this.identifierIds.push(identifierId, [eventName, index]);

		return identifierId;
	},

	unregister: function(identifierId){
		if(identifierId > this.identifierIdCounter){
			throw "IdentifierId" + identifierId + " is not registered";
		}
		if(!this.identifierIds.containsKey(identifierId)){
			throw "IdentifierId " + identifierId + " is already unregistered";
		}
		var loc = this.identifierIds.get(identifierId);

		return this.eventListeners.get(loc.shift()).remove(loc.shift());
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

EventManager.onTick 					= function(listener){ EventManager.register("onTick", listener) }
EventManager.onNewLevel 				= function(listener){ EventManager.register("onNewLevel", listener) }
EventManager.onLeaveGame 				= function(listener){ EventManager.register("onLeaveGame", listener) }
EventManager.onSelectLevel 				= function(listener){ EventManager.register("onSelectLevel", listener) }
EventManager.onServerMessageReceive 	= function(listener){ EventManager.register("onServerMessageReceive", listener) }
EventManager.onChat 					= function(listener){ EventManager.register("onChat", listener) }
EventManager.onChatReceive 				= function(listener){ EventManager.register("onChatReceive", listener) }
EventManager.onStartDestroyBlock 		= function(listener){ EventManager.register("onStartDestroyBlock", listener) }
EventManager.onDestroyBlock 			= function(listener){ EventManager.register("onDestroyBlock", listener) }
EventManager.onUseItem 					= function(listener){ EventManager.register("onUseItem", listener) }

EventManager.onScriptInit 				= function(listener){ EventManager.register("onScriptInit", listener) }
EventManager.onScriptEnable 			= function(listener){ EventManager.register("onScriptEnable", listener) }