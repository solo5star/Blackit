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