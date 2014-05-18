/*
 * StartButton
 * A class to control the start button on the waiting room page.  The master of the
 * game selects this to transition from the waiting room to gameplay. 
 */
function StartButton(buttonId, roleCounter, userRoleMap) {
	this.button = document.getElementById(buttonId);
	this.roleCounter = roleCounter;
	this.userRoleMap = userRoleMap;
}
/*
 * revealButton()
 * Reveals a Start button on the waiting room page.  When the Start button is pressed,
 * generate a random image object and push that to Firebase.  
 */
StartButton.prototype.implementButton = function (gameName) {
	var startButton = this;
	this.button.style.display = 'block';
	this.button.addEventListener("click", function(){
		if (startButton.roleCounter.Drawer < 1 || startButton.roleCounter.Guesser < 1) {
			alert("You must have at least 1 Drawer and 1 Guesser!");
			return;
		}
		startButton.closeGame(gameName);
		var fb = new Firebase('https://outdoorspictionary.firebaseIO.com/Games/' + gameName);
		var randomImage = getRandomImage();
		fb.child('start').push(randomImage);
	});
}

/*
 * closeGame(gameName)
 * Sends a PUT request to MongoDB to change the active status of a game to false.
 */
StartButton.prototype.closeGame= function (gameName) {
	var request = new XMLHttpRequest();
	request.open('PUT', '/closegame/' + gameName, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			console.log("Game was made inactive!");
		} else {
			console.log("error");
		}
	};
	request.onerror = function() {
		console.log("Request faild to send");
	};
	request.send();
}

/*
 * initialize()
 * Checks MongoDB to see if the user is the master of the game room.  If he or she is, then call
 * revealButton.
 */
StartButton.prototype.initialize = function(username, gameName) {
	var startButton = this;
	var request = new XMLHttpRequest();
	request.open('GET', '/gamefinder/' + gameName, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			data_array = JSON.parse(request.responseText);
			if (data_array.length > 0) {
				var master = data_array[0].master;
				if (username == master) {
					startButton.implementButton(gameName);
				}
			} else {	
				console.log("error.  game not found");
			}
		} else {
			console.log("error");
		}
	};
	request.onerror = function() {
		console.log("Request faild to send");
	};
	request.send();
}