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

EventManager.onScriptEnable(args => { GUIManager.addGUI("ToggleButton", ToggleButtonGUI); ToggleButtonGUI.show(); });