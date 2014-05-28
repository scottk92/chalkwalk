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
	var fb = new Firebase('https://outdoorspictionary.firebaseIO.com/Games/' + localStorage.game);
	document.getElementById("end-game-btn").addEventListener("click", function(){
	  fb.child('end').push({username:localStorage.username});
	  timer.stop()
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