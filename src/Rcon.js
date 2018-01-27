const Rcon = {
	TYPE_COMMAND: 2,
	TYPE_LOGIN: 3,

	socket: null,

	requestId: 92381, // random number

	init: function(){
		EventManager.onRconSend = function(listener){ return EventManager.register("onRconSend", listener) };
		EventManager.onRconReceive = function(listener){ return EventManager.register("onRconReceive", listener) };

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