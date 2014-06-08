// Constants
var EARTH_RADIUS = 6370;
var NUM_POINTS = 3;
var THRESHOLD = 0.05;
var DRAWING_TIMEOUT = 2000;
var VIBRATION_DURATION = 1000;

var calibrate = 0;
var isDrawing = false;
var positionOptions = {
  maximumAge: 0,
  enableHighAccuracy: true,
  timeout: 10000
};
var rawCoords = [];
var calibrateCoords = [];
var coordsDB = new Firebase('https://outdoorspictionary.firebaseIO.com/Games/' + localStorage.game + '/' + localStorage.round + '/coords');
var drawingOffTimer;


var totalCoords = 0;
// Initialize vibration
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

// Calibrates coordinates and then pushes them to the Firebase DB
function setLocation(position) {
	totalCoords++;
	if (isDrawing) { // Only push coordinates if isDrawing is turned on
		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
			
		// Debugging...
		var listItem = document.createElement("li");
		listItem.innerHTML = position.coords.latitude + ", " + position.coords.longitude;
		document.getElementById("debug-coordinates").appendChild(listItem);
		rawCoords.push(position);
		alert('coord ' + totalCoords + ' : ' + pos.lat() + " " + pos.lng());
		if (totalCoords > 6 && isClose(pos)) {
			if (localStorage.callibrate == "true") {
				// Weighted average algorithm to refine the coordinates
		
				calibrate++;
				if (calibrate % NUM_POINTS == 0) {
					var calibratedPos = calibratedLoc();
					calibrateCoords.push(calibratedPos);
					alert('push');coordsDB.push({name:localStorage.username, stopped:false, lat:calibratedPos.lat(), lng:calibratedPos.lng(), color:localStorage.color});
				}
			} else {
				// Don't bother callibrating it
				alert('push');coordsDB.push({name:localStorage.username, stopped:false, lat:pos.lat(), lng:pos.lng(), color:localStorage.color});
			}
		}
	}
}
	
function isClose(position) {
	var numFar = 0;alert('isclose?' + rawCoords.length);
	for (var i = 0; i < Math.min(5, rawCoords.length-1); i++) {
	alert('pppp');
		alert(rawCoords[rawCoords.length - 2- i].position.longitude);
		var pos = new google.maps.LatLng(rawCoords[rawCoords.length - 2 - i].position.latitude,
			rawCoords[rawCoords.length - 2 - i].position.longitude);
		alert(hDist(position, pos));
			if (hDist(position, pos) >= THRESHOLD) {
			numFar++;
		}
	}alert(numFar);
	return (numFar <= 1);
}

// Uses weighted average algorithm to calibrate location
function calibratedLoc() {
  var cLatitude = 0;
  var cLongitude = 0;
  var total = 0;
  var len = rawCoords.length;
  for (var i = 0; i < NUM_POINTS; i++) {
    total += rawCoords[len-1-i].coords.accuracy;
  }
  for (var i = 0; i < NUM_POINTS; i++) {
    cLatitude += (1-rawCoords[len-i-1].coords.accuracy/total)*rawCoords[len-1-i].coords.latitude;
    cLongitude += (1-rawCoords[len-i-1].coords.accuracy/total)*rawCoords[len-1-i].coords.longitude;
  }
  cLatitude = cLatitude / (NUM_POINTS - 1);
  cLongitude = cLongitude / (NUM_POINTS - 1);
  return new google.maps.LatLng(cLatitude, cLongitude);
}

// Returns the distance between pos1 and pos2
function hDist(pos1, pos2) {
  function sinSq(a,b) {
    return Math.pow(Math.sin((b-a)/2), 2);
  }
  var lat1 = pos1.lat()*Math.PI/180;
  var lng1 = pos1.lng()*Math.PI/180;
  var lat2 = pos2.lat()*Math.PI/180;
  var lng2 = pos2.lng()*Math.PI/180;
  return 2*EARTH_RADIUS*Math.asin(Math.sqrt(sinSq(lat1, lat2) + Math.cos(lat1)*Math.cos(lat2)*sinSq(lng1, lng2)));
}

// Turns drawing on and off.
var watch;
function toggleDraw(on) {
  if (on) {
    // Turn ON drawing
    isDrawing = true;
    calibrate = 0;
    if (watch == undefined) {
      console.log("creating new watch");
      watch = navigator.geolocation.watchPosition(setLocation, error, positionOptions);
    }
    document.getElementById("drawing-on").style.display = 'block';
    document.getElementById("drawing-off").style.display = 'none';
  } else {
    // Turn OFF drawing
    isDrawing = false;
    coordsDB.push({'name':localStorage.username, 'stopped':true});
    document.getElementById("drawing-on").style.display = 'none';
    document.getElementById("drawing-off").style.display = 'block';

    // Vibrate to alert user that drawing stoppped
    if (navigator.vibrate) navigator.vibrate(VIBRATION_DURATION);
  }
}

function error(error) {
  alert(error);
}

// Control wheel interaction
function initializeDrawing() {
  Draggable.create("#knob", {type:"rotation", throwProps:false,
    onDragStart:function(){
      // Dragging causes drawing to turn on
      toggleDraw(true);
      if (drawingOffTimer != undefined) window.clearTimeout(drawingOffTimer);
    }, 
    onDragEnd:function(){
      // Not dragging for 7 seconds causes drawing to turn off
      drawingOffTimer = window.setTimeout(function(){toggleDraw(false)}, DRAWING_TIMEOUT);
    }
  });
}