
var timer =new Counter('timer', 1000, function(){console.log(userCoords);console.log(colorCoords);
		    var image = createResultsPage(userCoords, colorCoords);
			fb.child('drawnImage').set(image.toDataURL());
			window.location = '/results';
        });
	