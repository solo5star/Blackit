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