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