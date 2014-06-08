
 timerGame = undefined;
function Timer(userCoords, colorCoords) {
	if (typeof timerGame !== 'undefined') {console.log('oldtimer');return timerGame;}
	timerGame= new Counter('timer', 1000, function(){
			var image = createResultsPage(userCoords, colorCoords);
			fb.child('drawnImage').set(image.toDataURL());
			window.location = '/results';
        });
	}