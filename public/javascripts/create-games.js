/*
 * GameCreator
 * A class that controls creating new games.
 */
function GameCreator(inputId, errorMsgId) {
	this.input = document.getElementById(inputId);
	this.errorMsg = document.getElementById(errorMsgId);
}

/*
 * displayErrorMsg(msg)
 * Displays an error message.
 */
GameCreator.prototype.displayErrorMsg = function(msg) {
	this.errorMsg.innerHTML = msg;
	this.errorMsg.style.display = 'block';
}

/*
 * create()
 * Sends a GET request to check that a game with the same name
 * does not already exist.  If there isn't already a game with
 * the same name, create the game.
 */
GameCreator.prototype.create = function() {
	var gameName = this.input.value;
	var gamecreator = this;
	if (gameName == "") {
		this.displayErrorMsg("Game name can't be blank.");
		return;
	} else {
		var request = new XMLHttpRequest();
		request.open('GET', '/gamefinder/' + gameName, true);
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				data_array = JSON.parse(request.responseText);
				if (data_array.length == 0) {
					gamecreator.errorMsg.style.display = 'none';
					gamecreator.addGametoDB(gameName, localStorage.username);
				} else {
					gamecreator.displayErrorMsg("A game with that name already exists");
					return;
				}
			} else {
				console.log("Error");
			}
		}
		request.onerror = function() {
			console.log("Request faild to send");
		};
		request.send();
	}
}

/*
 * addGametoDB(gameName, username)
 * Sends a POST request to the MongoDB to create a new game 
 * with the user as the master of that game.  Transition to
 * the waiting room. 
 */
GameCreator.prototype.addGametoDB = function(gameName, username) {
	request = new XMLHttpRequest();
	request.open('POST', '/create/' + gameName + "/" + username, true);
	request.onload = function() {
	  if (request.status >= 200 && request.status < 400){
	    localStorage.game = gameName;
	    window.location = '/waiting_room';
	  } else {
	    console.log("error");
	  }
	};
	request.onerror = function() {
		console.log("Request failed to send.");
	};
	request.send();
}


