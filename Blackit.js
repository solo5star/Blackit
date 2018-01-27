/**
 *  ____  _            _    _ _ 
 * | __ )| | __ _  ___| | _(_) |_ 
 * |  _ \| |/ _` |/ __| |/ / | __| 
 * | |_) | | (_| | (__|   <| | |_ 
 * |____/|_|\__,_|\___|_|\_\_|\__| 
 * 
 * A script which can evaluate on-the-fly for ModPE developer 
 * 
 * This code was generated at 2018-01-27 23:38:15
 */



/**
 * Original file: src\BlackitConfigure.js
 */
const BlackitConfigure = {
	Debug: {
		Enable: true,

		Level: 3
	},

	TraceEvent: {
		Enable: true,

		onTick: false,
		onNewLevel: true,
		onLeaveGame: true,
		onSelectLevel: true,
		onServerMessageReceive: true,
		onChat: true,
		onChatReceive: true,
		onStartDestroyBlock: true,
		onDestroyBlock: true,
		onUseItem : true,

		onRconSend: true,
		onRconReceive: true
	}
}



/**
 * Original file: src\Header.js
 */
const context					= com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

const ScriptManager				= net.zhuoweizhang.mcpelauncher.ScriptManager;

const Configuration				= android.content.res.Configuration;

const Sdcard					= android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

const Button					= android.widget.Button;
const PopupWindow				= android.widget.PopupWindow;
const TextView					= android.widget.TextView;
const EditText					= android.widget.EditText;
const ListView					= android.widget.ListView;
const ScrollView				= android.widget.ScrollView;
const LinearLayout				= android.widget.LinearLayout;
const RelativeLayout			= android.widget.RelativeLayout;

const View						= android.view.View;
const ViewGroup					= android.view.ViewGroup;
const Gravity					= android.view.Gravity;
const KeyEvent					= android.view.KeyEvent;
const MotionEvent				= android.view.MotionEvent;

const Html						= android.text.Html;
const InputType					= android.text.InputType;
const Spannable					= android.text.Spannable;
const SpannableStringBuilder	= android.text.SpannableStringBuilder;
const StyleSpan					= android.text.style.StyleSpan;
const ForegroundColorSpan		= android.text.style.ForegroundColorSpan;
const ScrollingMovementMethod	= android.text.method.ScrollingMovementMethod;

const Bitmap					= android.graphics.Bitmap;
const BitmapFactory				= android.graphics.BitmapFactory;
const Canvas					= android.graphics.Canvas;
const Color						= android.graphics.Color;
const Paint						= android.graphics.Paint;
const Typeface					= android.graphics.Typeface;
const Drawable					= android.graphics.drawable.Drawable;
const BitmapDrawable			= android.graphics.drawable.BitmapDrawable;
const ColorDrawable				= android.graphics.drawable.ColorDrawable;

const Thread					= java.lang.Thread;
const Runnable					= java.lang.Runnable;

const Variables 				= {}

const runOnThread				= func => new Thread(new Runnable({ run: function(){ try{ func() }catch(e){ Console.exception(e) } } })).start();
const runOnUiThread				= func => context.runOnUiThread(new Runnable({ run: function(){ try{ func() }catch(e){ Console.exception(e) } } }));

const cleanChatColor			= str => str.replace(/§[0-9a-fk-or]/g, "");
const dip2px					= dips => Math.ceil(dips * Screen.getDensity());
const isObject					= value => value !== null && (typeof value === 'function' || typeof value === 'object');

const dumpObjectFilter = function(obj){
	return obj instanceof ModPE
	|| obj instanceof java.lang.Object
	|| obj instanceof Entity
	|| obj instanceof Level
	|| obj instanceof Item
	|| obj instanceof Block
	|| obj instanceof Server;
}

const dumpObject = function(obj){
	var str = typeof(obj) + ": {";
	for(var key in obj){
		var value = obj[key];
		if(isObject(value)){
			if(dumpObjectFilter(obj)){
				str += key + ": " + typeof(value);
			}else{
				str += key + ": " + dumpObject(value);
			}
		}else{
			str += key + ": " + value;
			//str += key + ": " + typeof(value) + "(" + value + ")";
		}
		str += ", ";
	}
	return str.slice(0, -2) + "}";
}

const Screen = {
	getWidth: function(){
		return context.getWindowManager().getDefaultDisplay().getWidth();
	},

	getHeight: function(){
		return context.getWindowManager().getDefaultDisplay().getHeight();
	},

	getDensity: function(){
		return context.getResources().getDisplayMetrics().density;
	},

	getOrientation: function(){
		return context.getResources().getConfiguration().orientation;
	}
}

const ScreenLandscape = {
	getWidth: function(){
		return Screen.getOrientation() == Configuration.ORIENTATION_PORTRAIT ? Screen.getHeight() : Screen.getWidth();
	},

	getHeight: function(){
		return Screen.getOrientation() == Configuration.ORIENTATION_PORTRAIT ? Screen.getWidth() : Screen.getHeight();
	}
}



/**
 * Original file: src\Map.js
 */
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



/**
 * Original file: src\gui\GUI.js
 */
GUI = function(window){
	if(isObject(window)){
		this.window = GUIFactory.fromObject(window);
	}
}
GUI.prototype = {
	setWindow: function(window){
		var that = this;
		runOnUiThread(() => that._setWindow(window));
	},

	init: function(){
		var that = this;
		runOnUiThread(() => that._init());
	},

	deinit: function(){
		var that = this;
		runOnUiThread(() => that._deinit());
	},

	toggle: function(){
		var that = this;
		runOnUiThread(() => that._toggle());
	},

	show: function(){
		var that = this;
		runOnUiThread(() => that._show());
	},

	hide: function(){
		var that = this;
		runOnUiThread(() => that._hide());
	},


	_setWindow: function(window){
		this.window = GUIFactory.fromObject(window);
	},

	_deinit: function(){
		if(this.isShowing()){
			this.hide();
		}
		this.window = null;
	},

	_toggle: function(){
		this._isShowing() ? this._hide() : this._show();
	},

	_show: function(){

	},
	_hide: function(){
		this.window.dismiss();
	},

	_isShowing: function(){
		return this.window.isShowing();
	}
}



/**
 * Original file: src\EventManager.js
 */
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



/**
 * Original file: src\Console.js
 */
const Console = {
	lines: ""
		+ ChatColor.AQUA + 	"■□□■■■■■□□■■□□□□□□□□□□□□□■■□□□□□■■□□■■□□□□□■\n".replace(/■□/g, "■" + ChatColor.BLACK + "□").replace(/□■/g, "□" + ChatColor.AQUA + "■")
		+ ChatColor.BLACK + "□■□■■□□■■□■■□□■■■■□□■■■■□■■□■■□□□□□■■■■■□■□□\n".replace(/■□/g, "■" + ChatColor.BLACK + "□").replace(/□■/g, "□" + ChatColor.AQUA + "■")
		+ ChatColor.AQUA + 	"■■□■■■■■□□■■□■■□■■□■■□□□□■■■■□□□■■□□■■□□□□□■\n".replace(/■□/g, "■" + ChatColor.BLACK + "□").replace(/□■/g, "□" + ChatColor.AQUA + "■")
		+ ChatColor.BLACK + "□□■■■□□■■□■■□■■□■■□■■□□□□■■□■■□□■■□□■■□□□■■□\n".replace(/■□/g, "■" + ChatColor.BLACK + "□").replace(/□■/g, "□" + ChatColor.AQUA + "■")
		+ ChatColor.AQUA + 	"■□□■■■■■□□■■□□■■■■□□■■■■□■■□□■■□■■□□□■■■■■□■\n".replace(/■□/g, "■" + ChatColor.BLACK + "□").replace(/□■/g, "□" + ChatColor.AQUA + "■")
		+ "\n"
		+ ChatColor.GREEN + "Welcome to Blackit console. This contains a lot of feature.\n"
		+ ChatColor.GREEN + "Type \"help\" to see all command.\n"
		+ "",

	init: function(){
		EventManager.onConsoleEcho = function(listener){ EventManager.register("onConsoleEcho", listener) };
	},

	echo: function(rawMessage){
		this.lines += "\n" + rawMessage;

		EventManager.invoke("onConsoleEcho", {message: rawMessage});
	},

	toast: function(rawMessage){
		print(cleanChatColor(rawMessage));

		EventManager.invoke("onConsoleEcho", {message: rawMessage});
	},

	/**
	 * @internal
	 */
	log: function(func, color, logLevel, message){
		message.split(/(?:\r\n|\r|\n)/g).forEach(m => {
			var now = new Date();
			var timeFormat = ('0' + now.getHours()).slice(-2)
				+ ":" + ('0' + now.getMinutes()).slice(-2)
				+ ":" + ('0' + now.getSeconds()).slice(-2);
			func(ChatColor.AQUA + "[" + timeFormat + "]" + color + "[" + logLevel + "] " + m);
		});
	},

	info: function(message){
		this.log(this.echo, ChatColor.WHITE, "INFO", message);
	},

	notice: function(message){
		this.log(this.echo, ChatColor.GRAY, "NOTICE", message);
	},

	warn: function(message){
		this.log(this.echo, ChatColor.LIGHT_PURPLE, "WARN", message);
	},

	critical: function(message){
		this.log(this.echo, ChatColor.RED, "CRITICAL", message);
	},

	debug: function(message, debugLevel){
		if((debugLevel === undefined ? 1 : debugLevel) <= BlackitConfigure.Debug.Level){
			this.log(this.echo, ChatColor.GRAY, "DEBUG", message);
		}
	},

	trace: function(message){
		this.log(this.echo, ChatColor.GRAY, "TRACE", message);
	},

	error: function(message){
		this.log(this.echo, ChatColor.RED, "ERROR", message);
	},

	exception: function(e){
		this.log(this.echo, ChatColor.RED, "EXCEPTION", (e.message !== undefined ? e.message : e) + (e.lineNumber !== undefined ? " on line number " + e.lineNumber : ""));
	}
}

EventManager.onScriptInit(args => Console.init());



/**
 * Original file: src\CommandManager.js
 */
const CommandManager = {
	commands: new Map(),
	aliases: new Map(),

	register: function(command){
		if(command.name === undefined)			throw new "Command on CommandManager.register(command) should implements name property";
		if(command.description === undefined) 	command.description = "";
		if(command.usage === undefined) 		command.usage = command.name;
		if(command.aliases === undefined) 		command.aliases = [];
		if(command.execute === undefined) 		command.execute = function(args){  };

		var lowercase = command.name.toLowerCase();

		if(this.getCommand(lowercase) !== undefined){
			throw "Command name \"" + lowercase + "\" is already used.";
		}
		this.commands.put(lowercase, command);

		command.aliases.forEach(aliase => {
			aliase = aliase.toLowerCase();

			if((find = this.getCommand(aliase)) !== undefined){
				Console.warn("Command " + lowercase + "\'s alise \"" + aliase + "\" is already use at command " + find.name);
			}else{
				this.aliases.put(aliase, command);
			}
		});
	},

	unregister: function(command){
		if(typeof command === 'object'){
			command = command.name;
		}
		var result = this.getCommand(command);

		if(result === undefined){
			throw "Command " + command + " is not registered";
		}

		this.commands.forEach(check => check === result && this.commands.remove(check.name));
		this.aliases.forEach(check => check === result && this.aliases.remove(check.name));

		return result;
	},

	getCommand: function(name){
		name = name.toLowerCase();
		if(this.commands.containsKey(name)){
			return this.commands.get(name);
		}else if(this.aliases.containsKey(name)){
			return this.aliases.get(name);
		}
	},

	dispatch: function(text){
		var args = text.split(" ");

		// HACK: if array.shift() called, last element is filled his front element.
		// ["say", "hello", "world"].shift() ---> ["hello", "world", "world"]
		// TODO: Remove hack
		var commandName = args.slice(0, 1).shift().toLowerCase();
		args = args.slice(1);

		var command = undefined;
		if(this.commands.containsKey(commandName)){
			command = this.commands.get(commandName);
		}else if(this.aliases.containsKey(commandName)){
			command = this.aliases.get(commandName);
		}else{
			Console.error("Unknown command. Type \"help\" to see all command.");
			return;
		}

		try{
			var ret = command.execute(args);
			if(ret !== undefined){
				"Usage: " + Console.info(ret);
			}
		}catch(e){
			Console.exception(e);
		}
	},

	init: function(){
		this.register({
			name: "help",
			description: "Print all available commands.",
			aliases: ["?", "commands"],
			execute: function(args){
				Console.info(ChatColor.BOLD + ChatColor.GREEN + "Command list");
				CommandManager.commands.values().forEach(command => {
					Console.info(ChatColor.DARK_GREEN + ChatColor.BOLD + command.usage + ChatColor.RESET + " - " + command.description)
				});
			}
		});
		this.register({
			name: "version",
			description: "Print the version information of script.",
			aliases: ["ver", "about"],
			execute: function(args){
				Console.info(ChatColor.BOLD + ChatColor.GREEN + "Blackit version");
				Console.info(Blackit.version);
			}
		});
		this.register({
			name: "echo",
			description: "Print a message on console.",
			usage: "echo <message...>",
			aliases: ["say", "print"],
			execute: function(args){
				if(args.length === 0){
					return this.usage;
				}
				Console.info(args.join(" "));
			}
		});
		this.register({
			name: "eval",
			description: "Evaluate given code and print value if returned.",
			usage: "eval <code...>",
			aliases: ["evaluate"],
			execute: function(args){
				if(args.length === 0){
					return this.usage;
				}
				Console.info(ChatColor.BOLD + ChatColor.GREEN + "Eval result");

				var code = args.join(" ");
				Console.info("code: " + code);
				try{
					var V = Variables;
					var result = V.lastResult = eval(code);
					result !== undefined && Console.info("result: " + result);
				}catch(e){
					if(e instanceof SyntaxError){
						Console.error(e);
					}else{
						Console.error("Exception caught: " + e);
					}
				}
			}
		});
		this.register({
			name: "transferserver",
			description: "Transfer to given ip:port.",
			usage: "transferserver <ip[:port]>",
			execute: function(args){
				if(args.length === 0){
					return this.usage;
				}
				var address = (args[0] + ":19132").split(":");

				Server.joinServer(address[0], address[1]);
				Console.info("Transfer to " + address[0] + ":" + address[1]);
			}
		});
		this.register({
			name: "eventlist",
			description: "Print available events.",
			execute: function(args){
				Console.info(ChatColor.BOLD + ChatColor.GREEN + "Available event list: " + ChatColor.RESET + EventManager.getAllEvents().join(", "));
			}
		});
	}
}

EventManager.onScriptInit(args => CommandManager.init());



/**
 * Original file: src\gui\GUIManager.js
 */
const GUIManager = {
	guis: new Map(),

	deinit: function(){
		Console.info("Deinitialize GUIManager");

		for(name in this.guis){
			this.removeGUI(name);
		}
	},

	addGUI: function(name, gui){
		if(!(gui instanceof GUI)){
			throw "Gui object " + name + " should extends GUI";
		}

		this.guis.put(name, gui);

		gui.init();

		Console.info("GUI " + name + " added");
	},

	removeGUI: function(name){
		var gui = this.guis.remove(name);
		if(gui instanceof GUI){
			gui.deinit();
		}

		Console.info("GUI " + name + " removed");
	},

	getGUI: function(name){
		var gui = this.guis.get(name);
		if(!(gui instanceof GUI)){
			throw "Could't find gui " + name;
		}
		return gui;
	},

	colorize: function(plainText){
		var newTexts = [];

		plainText.split(/(?:\r\n|\r|\n)/g).forEach(text => {
			text = text.split("§");
			var newText = text.shift();
			var styleEndTags = "";
			var fontEndTags = "";

			text.forEach(token => {
				colorCode = token.substr(0, 1);
				// Should not contain any html tags
				token = Html.escapeHtml(token.substr(1));

				switch(colorCode){
					case "l": newText += "<strong>" + token; 	styleEndTags += "</strong>"; 	break;
					case "o": newText += "<i>" + token; 		styleEndTags += "</i>"; 		break;
					case "n": newText += "<u>" + token; 		styleEndTags += "</u>"; 		break;
					case "m": newText += "<strike>" + token; 	styleEndTags += "</strike>"; 	break;
					case "k": newText += token; 												break;

					case "0": newText += fontEndTags + "<font color=\"#000000\">" + token; fontEndTags = "</font>"; break;
					case "1": newText += fontEndTags + "<font color=\"#0000AA\">" + token; fontEndTags = "</font>"; break;
					case "2": newText += fontEndTags + "<font color=\"#00AA00\">" + token; fontEndTags = "</font>"; break;
					case "3": newText += fontEndTags + "<font color=\"#00AAAA\">" + token; fontEndTags = "</font>"; break;
					case "4": newText += fontEndTags + "<font color=\"#AA0000\">" + token; fontEndTags = "</font>"; break;
					case "5": newText += fontEndTags + "<font color=\"#AA00AA\">" + token; fontEndTags = "</font>"; break;
					case "6": newText += fontEndTags + "<font color=\"#FFAA00\">" + token; fontEndTags = "</font>"; break;
					case "7": newText += fontEndTags + "<font color=\"#AAAAAA\">" + token; fontEndTags = "</font>"; break;
					case "8": newText += fontEndTags + "<font color=\"#555555\">" + token; fontEndTags = "</font>"; break;
					case "9": newText += fontEndTags + "<font color=\"#5555FF\">" + token; fontEndTags = "</font>"; break;
					case "a": newText += fontEndTags + "<font color=\"#55FF55\">" + token; fontEndTags = "</font>"; break;
					case "b": newText += fontEndTags + "<font color=\"#55FFFF\">" + token; fontEndTags = "</font>"; break;
					case "c": newText += fontEndTags + "<font color=\"#FF5555\">" + token; fontEndTags = "</font>"; break;
					case "d": newText += fontEndTags + "<font color=\"#FF55FF\">" + token; fontEndTags = "</font>"; break;
					case "e": newText += fontEndTags + "<font color=\"#FFFF55\">" + token; fontEndTags = "</font>"; break;
					case "f": newText += fontEndTags + "<font color=\"#FFFFFF\">" + token; fontEndTags = "</font>"; break;

					case "r":
						newText += fontEndTags + styleEndTags + token;
						styleEndTags = "";
						fontEndTags = "";
						break;

					default:
						newText += "§" + colorCode + token;
						break;
				}
			});

			newText += fontEndTags + styleEndTags;

			newTexts.push(newText);
		});

		newTexts = newTexts.join("<br />");
		// fromHtml(String source) is deprecated method in API level 24.
		// reference: https://developer.android.com/reference/android/text/Html.html#fromHtml%28java.lang.String%29
		if(android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.N){
			return Html.fromHtml(newTexts);
		}
		return Html.fromHtml(newTexts, Html.FROM_HTML_MODE_LEGACY);
	}
}



/**
 * Original file: src\gui\GUIFactory.js
 */
const GUIFactory = {
	createObject: function(type, params){
		switch(type){
			case "PopupWindow": 	return this.initializeObject(new PopupWindow(context), params);
			case "LinearLayout": 	return this.initializeObject(new LinearLayout(context), params);
			case "RelativeLayout": 	return this.initializeObject(new RelativeLayout(context), params);
			case "Button": 			return this.initializeObject(new Button(context), params);
			case "TextView": 		return this.initializeObject(new TextView(context), params);
			case "EditText": 		return this.initializeObject(new EditText(context), params);
			case "ScrollView": 		return this.initializeObject(new ScrollView(context), params);
		}
		throw "GUIFactory: Unknown object type " + type;
	},

	fromObject: function(obj){
		if(!(obj instanceof java.lang.Object)){
			if(obj.type === undefined){
				throw "undefined type property";
			}
			return this.createObject(obj.type, obj);
		}
		return obj;
	},

	initializeObject: function(obj, params){
		if(params === undefined){
			params = {};
		}

		params.onObjectCreate !== undefined 			? params.onObjectCreate(obj) : undefined;

		if(obj instanceof View){
			params.layoutParams !== undefined 			? obj.setLayoutParams(params.layoutParams) : undefined;
			params.onKey !== undefined 					? obj.setOnKeyListener(new View.OnKeyListener({ onKey: params.onKey })) : undefined;
			params.onClick !== undefined				? obj.setOnClickListener(new View.OnClickListener({ onClick: params.onClick })) : undefined;
			params.onTouch !== undefined 				? obj.setOnTouchListener(new View.OnTouchListener({ onTouch: params.onTouch })) : undefined;
			params.onFocusChange !== undefined			? obj.setOnFocusChangeListener(new View.OnFocusChangeListener({ onFocusChange: params.onFocusChange })) : undefined;

			if(obj instanceof TextView){
				params.text !== undefined				? obj.setText(params.text) : undefined;
				params.textSize !== undefined			? obj.setTextSize(params.textSize) : undefined;
				params.textColor !== undefined 			? obj.setTextColor(params.textColor) : undefined;
				params.width !== undefined				? obj.setWidth(params.width) : undefined;
				params.height !== undefined				? obj.setHeight(params.height) : undefined;
				params.gravity !== undefined			? obj.setGravity(params.gravity) : undefined;
				params.hint !== undefined 				? obj.setHint(params.hint) : undefined;
				params.hintTextColor !== undefined 		? obj.setHint(params.hintTextColor) : undefined;
				params.inputType !== undefined 			? obj.setInputType(params.inputType) : undefined;
				params.lines !== undefined 				? obj.setTextLines(params.lines) : undefined;
				params.movementMethod !== undefined 	? obj.setMovementMethod(params.movementMethod) : undefined;

				if(obj instanceof Button){

				}else if(obj instanceof EditText){

				}
			}else if(obj instanceof ViewGroup){
				params.views !== undefined 				? params.views.forEach(view => obj.addView(GUIFactory.fromObject(view))) : undefined;

				if(obj instanceof LinearLayout){
					params.orientation !== undefined 	? obj.setOrientation(params.orientation) : undefined;
				}
			}
		}else if(obj instanceof PopupWindow){
			params.focusable !== undefined 				? obj.setFocusable(params.focusable) : obj.setFocusable(true);
			params.width !== undefined					? obj.setWidth(params.width) : undefined;
			params.height !== undefined					? obj.setHeight(params.height) : undefined;
			params.background !== undefined 			? obj.setBackgroundDrawable(new ColorDrawable(params.background)) : obj.setBackgroundDrawable(new ColorDrawable(Color.argb(127, 0, 0, 0)));
			params.backgroundDrawable !== undefined 	? obj.setBackgroundDrawable(params.backgroundDrawable) : undefined;
			params.onDismiss !== undefined				? obj.setOnDismissListener(new PopupWindow.OnDismissListener({ onDismiss: params.onDismiss })) : undefined;
			params.contentView !== undefined 			? obj.setContentView(GUIFactory.fromObject(params.contentView)) : undefined;
		}

		params.onObjectInitialize !== undefined 		? params.onObjectInitialize(obj) : undefined;

		return obj;
	}
}



/**
 * Original file: src\Rcon.js
 */
const Rcon = {
	TYPE_COMMAND: 2,
	TYPE_LOGIN: 3,

	socket: null,

	requestId: 92381, // random number

	init: function(){
		EventManager.onRconSend = function(listener){ EventManager.register("onRconSend", listener) };
		EventManager.onRconReceive = function(listener){ EventManager.register("onRconReceive", listener) };

		CommandManager.register({
			name: "rconnect",
			description: "Try to connect RCON.",
			usage: "rconnect <host[:port]> <password>",
			aliases: ["rcon"],
			execute: function(args){
				if(args.length < 2){
					return this.usage;
				}

				args[0] += ":19132";
				var host = args[0].split(":")[0];
				var port = args[0].split(":")[1];

				Rcon.connect(host, port, args[1]);
			}
		});
		CommandManager.register({
			name: "rdisconnect",
			description: "Disconnect from RCON.",
			aliases: ["rdisc"],
			execute: function(args){
				Rcon.disconnect();
			}
		});
		CommandManager.register({
			name: "rcommand",
			description: "Send command into server",
			usage: "rcommand <command...>",
			aliases: ["rcom"],
			execute: function(args){
				Rcon.sendCommand(args.join(" "));
			}
		});
		// TODO: Change info to rcon
		//Console.rcon = function(message){ this.log(this.echo, ChatColor.WHITE, "RCON", message) };
	},

	enable: function(){
		EventManager.onRconReceive(args => args.message.length !== 0 && Console.info(args.message));
	},

	connect: function(host, port, password){
		if(Rcon.socket !== null) throw "Could not try to connect RCON while connected or connecting";
		if(port < 1 || port > 65535) throw "Port is out of range";

		Console.info("Connect to RCON " + host + ":" + port + " ...");

		runOnThread(() => { 
			Rcon.socket = new java.net.Socket();

			Rcon.socket.connect(new java.net.InetSocketAddress(host, port), 10000);

			Console.info("Trying authenticate...");

			var receive = Rcon._send({type: Rcon.TYPE_LOGIN, message: password});

			if(receive.requestId == -1){
				Console.error("Password rejected by server");
				Rcon._disconnect();
				return;
			}

			Console.info("Success to connect.");
		});
	},

	disconnect: function(){
		runOnThread(() => Rcon._disconnect());
	},

	sendCommand: function(command){
		runOnThread(() => Rcon._send({type: Rcon.TYPE_COMMAND, message: command}));
	},

	_send: function(packet){
		packet.requestId = Rcon.requestId;

		EventManager.invoke("onRconSend", {packet: packet, message: packet.message});

		var receive = null;

		try{
			Rcon._write(packet);

			receive = Rcon._read();
		}catch(e){
			Rcon._disconnect();
			throw e;
		}

		EventManager.invoke("onRconReceive", {packet: packet, message: receive.message});

		return receive;
	},

	_write: function(packet){
		var out = Rcon.socket.getOutputStream();

		// encode message
		packet.payload = new java.lang.String(packet.message).getBytes();

		// requestId, type, payload, two null bytes
		var length = 4 + 4 + packet.payload.length + 2;

		// length, body length
		var buffer = java.nio.ByteBuffer.allocate(4 + length);
		buffer.order(java.nio.ByteOrder.LITTLE_ENDIAN);
		buffer.putInt(length);
		buffer.putInt(packet.requestId);
		buffer.putInt(packet.type);
		buffer.put(packet.payload);

		// Null bytes terminators
		buffer.put(0x00);
		buffer.put(0x00);

		out.write(buffer.array());
		out.flush();
	},

	_read: function(){
		var ins = Rcon.socket.getInputStream();

		var receive = null;

		var header = java.nio.ByteBuffer.allocate(4 * 3).array();

		ins.read(header, 0, 12);

		try{
			var buffer = java.nio.ByteBuffer.wrap(header);
			buffer.order(java.nio.ByteOrder.LITTLE_ENDIAN);

			var length = buffer.getInt();
			var requestId = buffer.getInt();
			var type = buffer.getInt();

			var payload = new java.nio.ByteBuffer.allocate(length - 4 - 4 - 2).array();

			var dis = new java.io.DataInputStream(ins);

			// Read the full payload
			dis.readFully(payload);

			// Read the null bytes
			dis.read(java.nio.ByteBuffer.allocate(2).array());

			receive = {requestId: requestId, type: type, payload: payload, message: new java.lang.String(payload)};
		}catch(e){
			throw e;
		}
		return receive;
	},

	_disconnect: function(){
		if(Rcon.socket === null){
			throw "RCON is not connected";
		}
		Rcon.socket.close();
		Rcon.socket = null;

		Console.info("RCON is disconnected.");
	}
}

EventManager.onScriptInit(args => Rcon.init());
EventManager.onScriptEnable(args => Rcon.enable());



/**
 * Original file: src\gui\ToggleButtonGUI.js
 */
const ToggleButtonGUI = new GUI();
ToggleButtonGUI._init = function(){
	this.setWindow({
		type: "PopupWindow",
		width: dip2px(50),
		height: dip2px(48),
		background: Color.TRANSPARENT,
		focusable: false,
		contentView: {
			type: "RelativeLayout",
			onTouch: function(view, motionEvent){
				switch(motionEvent.getAction()){
					case MotionEvent.ACTION_DOWN:
						this.originX = motionEvent.getX();
						this.originY = motionEvent.getY();
						break;
					case MotionEvent.ACTION_MOVE:
						var offsetX = motionEvent.getX() - (this.originX !== undefined ? this.originX : 0);
						var offsetY = motionEvent.getY() - (this.originY !== undefined ? this.originY : 0);
						MenuGUI.window.update(offsetX, offsetY, -1, -1, true);
						break;
				}
				return true;
			},
			views: [
				{
					type: "Button",
					text: "GUI",
					onClick: function(view){
						MenuGUI._toggle();
					}
				}
			]
		}
	});
}
ToggleButtonGUI._show = function(){
	this.window.showAtLocation(context.getWindow().getDecorView(), Gravity.LEFT | Gravity.BOTTOM, 0, 0);
}

EventManager.onScriptEnable(args => GUIManager.addGUI(ToggleButtonGUI));



/**
 * Original file: src\gui\MenuGUI.js
 */
const MenuGUI = new GUI();
MenuGUI._init = function(){
	this.setWindow({
		type: "PopupWindow",
		width: ScreenLandscape.getWidth() / 3,
		height: ScreenLandscape.getHeight(),
		contentView: {
			type: "ScrollView",
			views: [
				{
					type: "LinearLayout",
					orientation: 1,
					views: [
						{
							type: "TextView",
							text: "Blackit GUI",
							textSize: 25,
							textColor: Color.WHITE,
							gravity: Gravity.CENTER,
							layoutParams: new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
						},
						{
							type: "Button",
							text: "Console",
							layoutParams: new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT),
							onClick: function(v){
								ConsoleGUI._toggle();
							}
						}
					]
				}
			]
		}
	});
}
MenuGUI._show = function(){
	this.window.showAtLocation(context.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, 0, 0);
}

EventManager.onScriptEnable(args => GUIManager.addGUI("Menu", MenuGUI));



/**
 * Original file: src\gui\ConsoleGUI.js
 */
const ConsoleGUI = new GUI();
ConsoleGUI._init = function(){
	this.setWindow({
		type: "PopupWindow",
		width: ScreenLandscape.getWidth(),
		height: ScreenLandscape.getHeight(),
		contentView: {
			type: "LinearLayout",
			orientation: LinearLayout.VERTICAL,
			views: [
				{
					type: "TextView",
					text: "Blackit Console",
					textSize: 25,
					textColor: Color.WHITE,
					gravity: Gravity.CENTER
				},
				{
					type: "TextView",
					textSize: 12,
					textColor: Color.WHITE,
					gravity: Gravity.LEFT | Gravity.BOTTOM,
					layoutParams: new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1),
					movementMethod: new ScrollingMovementMethod(),
					onObjectCreate: function(obj){
						ConsoleGUI.lines = obj;

						ConsoleGUI._append(Console.lines);
					}
				},
				{
					type: "LinearLayout",
					orientation: LinearLayout.HORIZONTAL,
					layoutParams: new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT),
					views:[
						{
							type: "EditText",
							textColor: Color.WHITE,
							hint: "Enter command",
							inputType: InputType.TYPE_CLASS_TEXT,
							layoutParams: new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1),
							onKey: function(view, keyCode, event){
								if(event.getAction() == KeyEvent.ACTION_DOWN && keyCode == KeyEvent.KEYCODE_ENTER){
									ConsoleGUI._enter();
									return true;
								}
								return false;
							},
							onObjectCreate: function(obj){
								ConsoleGUI.inputText = obj;
							}
						},
						{
							type: "Button",
							text: "Enter",
							onClick: function(v){
								ConsoleGUI._enter();
							}
						}
					]
				}
			]
		}
	});

	EventManager.onConsoleEcho(args => ConsoleGUI.append(args.message));
}
ConsoleGUI._show = function(){
	this.window.showAtLocation(context.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, 0, 0);
}
ConsoleGUI._enter = function(){
	var message = this.inputText.getText().toString();
	if(message.length !== 0){
		this._append(ChatColor.GRAY + ">  " + message);
		CommandManager.dispatch(message);
		this.inputText.setText("");
	}
}
ConsoleGUI.append = function(message){
	runOnUiThread(() => ConsoleGUI._append(message));
}
ConsoleGUI._append = function(message){
	this.lines.append(GUIManager.colorize("\n" + message));
}

EventManager.onScriptEnable(args => GUIManager.addGUI(ConsoleGUI));



/**
 * Original file: src\Blackit.js
 */
const Blackit = {
	version: "1.0.0",

	currentTick: 0,

	isConnecting: false,
	isConnected: false,
	isInGame: false,

	init: function(){
		EventManager.onTick(() => Blackit.currentTick++ );
		EventManager.onNewLevel(() => Blackit.isInGame = true );

		new Thread({ run: function(){
			while(true){
				Thread.sleep(50);
				if(ScriptManager.isRemote){
					if(!Blackit.isInGame){
						if(Blackit.currentTick != 0){
							Blackit.isInGame = true;
							Blackit.isConnecting = false;
							Blackit.isConnected = true;
							ScriptManager.setLevelFakeCallback(true, false);
							Console.info("Client successfuly connected to server.");
						}else if(!Blackit.isConnecting){
							Blackit.isConnecting = true;
							Console.info("Client tried to connect server...");
						}
					}
				}else if(Blackit.isConnecting){
					Blackit.isConnecting = false;
					Console.info("Client failed to connect server.");
				}else if(Blackit.isConnected && Blackit.isInGame){
					Blackit.isConnected = false;
					Blackit.isInGame = false;
					Console.info("Client was disconnected from server.");
				}
			}
		}}).start();
	}
}

Blackit.init();



Console.info("Initialize Blackit...");

EventManager.invoke("onScriptInit");

EventManager.invoke("onScriptEnable");

Console.info("Blackit enabled.");
