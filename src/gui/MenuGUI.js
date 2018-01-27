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