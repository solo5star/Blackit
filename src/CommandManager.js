const CommandManager = {
	commands: new Map(),
	aliases: new Map(),

	register: function(command){
		if(command.name === undefined)			throw new "Command on CommandManager.register() should implements name property";
		if(command.description === undefined) 	command.description = "";
		if(command.usage === undefined) 		command.usage = command.name;
		if(command.aliases === undefined) 		command.aliases = [];
		if(command.execute === undefined) 		command.execute = function(args){  };

		commandName = command.name.toLowerCase();

		if(this.getCommand(commandName) !== undefined){
			throw "Command name \"" + commandName + "\" is already used.";
		}
		this.commands.put(commandName, command);

		command.aliases.forEach(aliase => {
			aliase = aliase.toLowerCase();

			if(this.getCommand(aliase) !== undefined){
				Console.warn("Command " + commandName + "\'s alise \"" + aliase + "\" is already used.");
			}else{
				this.aliases.put(aliase, command);
			}
		});
	},

	getCommand: function(commandName){
		commandName = commandName.toLowerCase();
		if(this.commands.containsKey(commandName)){
			return this.commands.get(commandName);
		}else if(this.aliases.containsKey(commandName)){
			return this.aliases.get(commandName);
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
			Console.critical("Uncaught exception in command " + command.name + ": " + e);
		}
	},

	init: function(){
		this.register({
			name: "help",
			description: "Print all available commands.",
			aliases: ["?", "commands"],
			execute: function(args){
				Console.info("§l§aCommand list");
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
				Console.info("§l§aBlackit version");
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
				Console.info("§l§aEval result");

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