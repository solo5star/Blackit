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