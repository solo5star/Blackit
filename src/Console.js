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