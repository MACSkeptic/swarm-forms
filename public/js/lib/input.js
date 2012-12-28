define(function () {
  
var keys = [];

  keys[8] = "backspace";
  keys[9] = "tab";
  keys[13] = "enter";
  keys[16] = "shift";
  keys[17] = "ctrl";
  keys[18] = "alt";
  keys[19] = "pause";
  keys[20] = "capslock";
  keys[27] = "esc";
  keys[32] = "space";
  keys[33] = "pageup";
  keys[34] = "pagedown";
  keys[35] = "end";
  keys[36] = "home";
  keys[37] = "left";
  keys[38] = "up";
  keys[39] = "right";
  keys[40] = "down";
  keys[45] = "insert";
  keys[46] = "delete";

  keys[91] = "leftwindowkey";
  keys[92] = "rightwindowkey";
  keys[93] = "selectkey";
  keys[106] = "multiply";
  keys[107] = "add";
  keys[109] = "subtract";
  keys[110] = "decimalpoint";
  keys[111] = "divide";

  keys[144] = "numlock";
  keys[145] = "scrollock";
  keys[186] = "semicolon";
  keys[187] = "equalsign";
  keys[188] = "comma";
  keys[189] = "dash";
  keys[190] = "period";
  keys[191] = "forwardslash";
  keys[192] = "graveaccent";
  keys[219] = "openbracket";
  keys[220] = "backslash";
  keys[221] = "closebracket";
  keys[222] = "singlequote";

  var numpadKeys = ["numpad1","numpad2","numpad3","numpad4","numpad5","numpad6","numpad7","numpad8","numpad9"];
  var functionKeys = ["f1","f2","f3","f4","f5","f6","f7","f8","f9"];
  var numberKeys = ["0","1","2","3","4","5","6","7","8","9"];
  var letterKeys = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]; 
  
  var keysPressed = {};

  function handleKeyUp(e) {
    event = (e) ? e : window.event;
    var keyName = keys[event.keyCode];
    keysPressed[keyName] = false;
  }

  function handleKeyDown(e) {
    event = (e) ? e : window.event ;
    var keyName = keys[event.keyCode];
    keysPressed[keyName] = true;
  }
  
  function registerEvents(){
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)  
  }
  
  function defineSpecialKeyNames(){
	var i = 0;
    for(i = 0; numberKeys[i]; i++){
	  keys[48+i] = numberKeys[i];
	}
    for(i = 0; letterKeys[i]; i++){
	  keys[65+i] = letterKeys[i];
	}
    for(i = 0; numpadKeys[i]; i++){ 
	  keys[96+i] = numpadKeys[i];
	}
    for(i = 0; functionKeys[i]; i++){
	  keys[112+i] = functionKeys[i];
	}	
  }  

  function initialize(){
    defineSpecialKeyNames();
    registerEvents();	
  }

  function keyPressed(key){
    return keysPressed[key];
  }

  function create() {
    var inputHandler = {};
	initialize();
    inputHandler.keyPressed = keyPressed;
    return inputHandler;
  }

  return create();
});
