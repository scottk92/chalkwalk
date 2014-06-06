var fb = new Firebase('https://outdoorspictionary.firebaseIO.com/Games/' + localStorage.game + '/' + localStorage.round);

/*
 * Implements the end game functionality.
 */
function initializeEndGame(timer) {
	// Pause game
	document.getElementById("show-modal-btn").addEventListener("click", function(){
	  timer.pause();
	});

	// Continue game
	document.getElementById("continue-game-btn").addEventListener("click", function(){
	  timer.countdown()
	});

	// End game
	document.getElementById("end-game-btn").addEventListener("click", function(){
	  fb.child('end').push({username:localStorage.username});
	  timer.stop()
	});

	// Restart game
	document.getElementById("restart-game-btn").addEventListener("click", function(){
		restartGame();
	});

	// Listen for when another player ends the game
  fb.child('end').on('child_added', function(snapshot) {
    var username = snapshot.val().username;
    if (localStorage.username != username) {	
    	alert(username + " ended the game!");
    	timer.stop();
    }
    // In case the user who stopped the game refreshes the page
    if (!timer.isStopped()) {
    	timer.stop();
    }
  });
}
/*
 * Reopens a game so users can search for it on the index page
 */
function reopenGame() {
	var request = new XMLHttpRequest();
	request.open('PUT', '/opengame/' + localStorage.game, true);
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
 * Restart the game and advance to the next round.
 */
function restartGame() {
	// Reopen the game for people to join
	reopenGame();

	// Clear all the necessary fields
	localStorage.numDrawers = 0;
	localStorage.removeItem('imageFile');
	localStorage.removeItem('imageName');
	localStorage.removeItem('waiting');

	// Increment the round counter
	var nextRound = parseInt(localStorage.round) + 1;
	localStorage.round = nextRound;

	// Go back to the waiting room
	window.location = '/waiting_room';
}