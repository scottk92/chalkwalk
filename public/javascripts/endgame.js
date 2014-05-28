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
 * Restart the game and advance to the next round.
 */
function restartGame() {
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