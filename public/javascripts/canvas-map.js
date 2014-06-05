var canvasMap;
var userCoords = {};
var colorCoords = {};
var center;

// Load the map and set up event listener for drawing on the map
function initializeCanvasMap(fb, mapId) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var styles = [
      {
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" }
        ]
      }
    ];
    center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      zoom: 18,
      center: center,
      disableDefaultUI: true,
    };
    canvasMap = new google.maps.Map(document.getElementById(mapId), mapOptions);
    canvasMap.setOptions({styles: styles});
    recordCoordinates(fb);
  });
}

// Everytime coordinates are added, draw a line.
function recordCoordinates(fb) {
  fb.child('coords').on('child_added', function(snapshot) {
    var data = snapshot.val();console.log(data);
    var user = data.name;
    if (!data.stopped) {
      
	  var newCoords = new google.maps.LatLng(data.lat, data.lng);
      if (userCoords[user] == undefined) {
        // First coordinate that the user pushed
        userCoords[user] = [];
        userCoords[user].push([newCoords]);
      } else {
        var activeLine = userCoords[user][userCoords[user].length-1];
        if (activeLine.length >= 1) { // guard against strange cases
          // Line drawn
          drawLine(activeLine[activeLine.length-1], newCoords, data.color);
          console.log("Line drawn!");
        }
        // Add to the current line
        activeLine.push(newCoords);
      }
    } else if (userCoords[user] != undefined) {
      // User pressed the stop button, so create a new empty array
      userCoords[user].push([]);
    }
	if (!(user in colorCoords)) {
		colorCoords[user] = data.color;
	}
  });
}

// Draws a red line on the map between p1 and p2
function drawLine(pos1, pos2, color) {
  if (color == undefined) color = "#000000";
  var line = new google.maps.Polyline({
    path: [pos1, pos2],
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: canvasMap
  });
}

// Stop tracking
function stopDrawing(fb) {
  fb.child('coords').off('child_added');
}

// Recenters the map
function recenter() {
  canvasMap.setCenter(center);
}

