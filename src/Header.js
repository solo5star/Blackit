const context					= com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

const ScriptManager				= net.zhuoweizhang.mcpelauncher.ScriptManager;

const Configuration				= android.content.res.Configuration;

const Sdcard					= android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

const Button					= android.widget.Button;
const PopupWindow				= android.widget.PopupWindow;
const TextView					= android.widget.TextView;
const EditText					= android.widget.EditText;
const ListView					= android.widget.ListView;
const ScrollView				= android.widget.ScrollView;
const LinearLayout				= android.widget.LinearLayout;
const RelativeLayout			= android.widget.RelativeLayout;

const View						= android.view.View;
const ViewGroup					= android.view.ViewGroup;
const Gravity					= android.view.Gravity;
const KeyEvent					= android.view.KeyEvent;
const MotionEvent				= android.view.MotionEvent;

const Html						= android.text.Html;
const InputType					= android.text.InputType;
const Spannable					= android.text.Spannable;
const SpannableStringBuilder	= android.text.SpannableStringBuilder;
const StyleSpan					= android.text.style.StyleSpan;
const ForegroundColorSpan		= android.text.style.ForegroundColorSpan;
const ScrollingMovementMethod	= android.text.method.ScrollingMovementMethod;

const Bitmap					= android.graphics.Bitmap;
const BitmapFactory				= android.graphics.BitmapFactory;
const Canvas					= android.graphics.Canvas;
const Color						= android.graphics.Color;
const Paint						= android.graphics.Paint;
const Typeface					= android.graphics.Typeface;
const Drawable					= android.graphics.drawable.Drawable;
const BitmapDrawable			= android.graphics.drawable.BitmapDrawable;
const ColorDrawable				= android.graphics.drawable.ColorDrawable;

const Thread					= java.lang.Thread;
const Runnable					= java.lang.Runnable;

const Variables 				= {}

const runOnThread				= func => new Thread(new Runnable({ run: function(){ try{ func() }catch(e){ Console.exception(e) } } })).start();
const runOnUiThread				= func => context.runOnUiThread(new Runnable({ run: function(){ try{ func() }catch(e){ Console.exception(e) } } }));

const cleanChatColor			= str => str.replace(/§[0-9a-fk-or]/g, "");
const dip2px					= dips => Math.ceil(dips * Screen.getDensity());
const isObject					= value => value !== null && (typeof value === 'function' || typeof value === 'object');

const dumpObjectFilter = function(obj){
	return obj instanceof ModPE
	|| obj instanceof java.lang.Object
	|| obj instanceof Entity
	|| obj instanceof Level
	|| obj instanceof Item
	|| obj instanceof Block
	|| obj instanceof Server;
}

const dumpObject = function(obj){
	var str = typeof(obj) + ": {";
	for(var key in obj){
		var value = obj[key];
		if(isObject(value)){
			if(dumpObjectFilter(obj)){
				str += key + ": " + typeof(value);
			}else{
				str += key + ": " + dumpObject(value);
			}
		}else{
			str += key + ": " + value;
			//str += key + ": " + typeof(value) + "(" + value + ")";
		}
		str += ", ";
	}
	return str.slice(0, -2) + "}";
}

const Screen = {
	getWidth: function(){
		return context.getWindowManager().getDefaultDisplay().getWidth();
	},

	getHeight: function(){
		return context.getWindowManager().getDefaultDisplay().getHeight();
	},

	getDensity: function(){
		return context.getResources().getDisplayMetrics().density;
	},

	getOrientation: function(){
		return context.getResources().getConfiguration().orientation;
	}
}

const ScreenLandscape = {
	getWidth: function(){
		return Screen.getOrientation() == Configuration.ORIENTATION_PORTRAIT ? Screen.getHeight() : Screen.getWidth();
	},

	getHeight: function(){
		return Screen.getOrientation() == Configuration.ORIENTATION_PORTRAIT ? Screen.getWidth() : Screen.getHeight();
	}
}