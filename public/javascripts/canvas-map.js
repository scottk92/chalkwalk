var canvasMap;
var lastRecordedCoords = {};

// Load the map and set up event listener for drawing on the map
function initializeCanvasMap(fb, mapId) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var styles = [
      {
        stylers: [
          { lightness: 100 },
          { visibility: "off" }
        ]
      }
    ];
    var mapOptions = {
      zoom: 18,
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
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
    var data = snapshot.val();
    var user = data.name;
    var newCoords = new google.maps.LatLng(data.lat, data.lng);
    if (lastRecordedCoords[user] == undefined) {
      lastRecordedCoords[user] = newCoords;
    } else {
      console.log("line drawn!");
      var oldCoords = lastRecordedCoords[user];
      lastRecordedCoords[user] = newCoords;
      drawLine(oldCoords, newCoords);
    }
  });
}

// Draws a red line on the map between p1 and p2
function drawLine(pos1, pos2) {
  var line = new google.maps.Polyline({
    path: [pos1, pos2],
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: canvasMap
  });
}

function stopDrawing(fb) {
  fb.child('coords').off('child_added');
}