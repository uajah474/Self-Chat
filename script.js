var user, who, start, warning, Reset, todo, help, txt; 

start = false; trap(".mgs").value = ""; who = "You"; 

warning = "Changing Friend will clear your entire conversation <br> Continue your chat to CANCEL or Click \"OK\" to proceed";

/* Note: trap() is not a built-in function, it is a user defined function */

function swish() { 

        // function to verify a Reasonable UserName for the conversation;
		
    if(!trap('input',0).value.match(/^(?:[A-Z])(?:[A-Z0-9_-]{2,})$/i) && start != undefined) {
		
		// Display Guidelines for setting names;
		
		trap('.heada').style.display = "none"; trap('#swish').innerHTML = "Retry";
		trap('.msg').innerHTML = 
		"<li>UserName Cannot start with space or number</li> <li> Username Cannot contain spacial characters</li> <li> Username must be at least 3 characters </li> <li> Username Can contain underscore or hypen</li>";
		trap('.msg').style.textAlign = "left";
	    return start = undefined;
		
	} else if(start == undefined) {
		
		// Take user back to input field;
		
		trap('.heada').display = "block"; trap('.msg').innerHTML = "Please Enter a Friend UserName";
		trap('.msg').style.textAlign = "center"; trap('#swish').innerHTML = "Done!"
		trap('.heada').style.display = "block"; trap('input',0).value = ""; trap('input',0).focus();
		return start = false;
		
	} else { 
	
	    // Begin or Continue conversation;
	
	    start = true; trap('input',0).readOnly = true; trap(".mgs").focus(); 
		
	};
	
	if(user == undefined) { 
	
	    // function to switch turns between users
		
	    user = "defined"; trap('.msg').innerHTML =  "You are typing..."; 
		who = trap('input',0).value; trap('#swish').innerHTML = "<< switch"; trap(".heada").style.display = "block";
		
	} else { 
	
	    user = undefined; trap('.msg').innerHTML = trap('input',0).value + " is typing..."; 
		who = "You"; trap('#swish').innerHTML = "switch >>"; trap(".heada").style.display = "block";
		
	};
	
	trap(".mgs").focus(); // 
	
}

trap('#swish').addEventListener("click", _reset);
trap('input',0).addEventListener("click", warn);

function warn() {
	
	// if user is wants to change friend's userName. Gets warning;
	
	if(start && trap('input',0).readOnly) {
		todo = warning;
		trap('.heada').style.display = "none"; trap('#swish').innerHTML = "OK";
		trap('.msg').innerHTML = todo;
		trap(".heada").style.display = "none";
		trap('input',0).readOnly = false;
		return Reset = true;
		
	}
	
}

function _reset() {
	
	// reset all inputs and block back to default if user clicks OK after the warning;
	
	if(Reset && trap('.msg').innerHTML == todo) {
		trap('.msg').innerHTML = "Enter a new Friend UserName";
		start = false; trap(".mgs").value = ""; who = "You";
		trap(".heada").style.display = "block";
		trap('#swish').innerHTML = "Done!"; trap('.chatbox').innerHTML = "";
		help = document.createElement('div');
		help.setAttribute("class", "help");
		txt = document.createTextNode("begin your conversation");
		help.appendChild(txt);
		trap('.chatbox').appendChild(help);
		trap('input',0).value = "";
		trap('input',0).focus();
		Reset = undefined;
		
	} else {
		
		swish(); // continue conversation;
		
	};
	
}
		

trap('input',0).onkeydown = function(e) { 
    if(e.keyCode == 13 || e.which == 13) { // user pressed enter key;
	    swish(); 
	}; 
};

function send() {
	
	// function to send the text to the chatbox;
	
    var div, span, attr, chat_txt, userName, time, date;
	
	if(trap('.mgs').value.match(/^(?:\s+)$/g) || trap('.mgs').value == "") { 
	
	    // if user inputs nothing;
	
	    trap(".mgs").focus(); 
	    return; 
	};
	
	div = []; // an empty div array
	attr = ['yourbox', 'you', 'yourname', 'time']; // an array of classes for user
	attf = ["friendbox", "other", "frnd_name", "time"]; //an array of classes for friend
	
	if(user !== undefined) {
		
		// if it is user's turn;
		
	    for(var x = 0; x <= 3; x++) {
			
			// create new blocks to display user input;
			
		    div[x] = document.createElement('div');
	        div[x].setAttribute("class", attf[x]);
		};
		
	    span = document.createElement("span");
	    span.setAttribute("id", "yourname");
		
	} else {
		
		// if it is friend's turn;
		
		for(var x = 0; x <= 3; x++) {
			
			//create new blocks to display friends input;
			
		    div[x] = document.createElement('div');
	        div[x].setAttribute("class", attr[x]);
		};
		
		span = document.createElement("span");
	    span.setAttribute("id", "frnd_name");
		
	}
	
	// Create the Elements that should be displayed  on the blocks;
	
	date = new Date(); hour = date.getHours(); min = date.getMinutes(); 
	date = hour + ":" + min; 
    chat_txt = document.createTextNode(trap(".mgs").value); 
	userName = document.createTextNode(who); 
    time = document.createTextNode(date); 
	
	// Join them as Nodes
	
	span.appendChild(userName);
	div[0].appendChild(div[2]); div[0].appendChild(div[1]);
	div[2].appendChild(span); div[1].appendChild(chat_txt);
	div[1].appendChild(div[3]); div[3].appendChild(time);
	trap(".chatbox").appendChild(div[0]);
	
	trap(".chatbox").scrollTop = trap(".chatbox").scrollHeight; // scroll to the recurring conversation;
	trap(".mgs").value = ""; trap(".mgs").focus();
	
}
	

trap(".mgs").onkeydown = function(x) {
	if(x.keyCode == 13 || x.which == 13) {
		
		// user clicked enter;
		
	    if(trap('.mgs').value.match(/^(?:\s+)$/g) || trap('.mgs').value == "") { 
		    trap(".mgs").value = ""; 
		};
		
        if(start) { swish(); };		
	    send(); trap(".mgs").focus(); 
		return _reset = undefined; 
		
	}; 
	
};

trap(".send").onclick = function() { if(start) { swish(); }; send(); return _reset = undefined; };
