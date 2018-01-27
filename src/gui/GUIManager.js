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