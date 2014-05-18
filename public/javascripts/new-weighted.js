// Constants
var DEBUG_ON = false;
var EARTH_RADIUS = 6370;
var NUM_POINTS = 3;
var THRESHOLD = 0.01;

// Displays position on a div on the map for debugging purposes
var dispCoords;
function debug(lat, long) {
  if (!DEBUG_ON) return;
  if (dispCoords == undefined) {
    dispCoords = document.getElementById('coords');
  }
  dispCoords.innerHTML = latitude + "," + longitude;
}

// Initialize the map
var map, lastLocation;
google.maps.event.addDomListener(window, 'load', function initialize() {
  var latitude, longitude;
  document.getElementById("paintbrush").onclick = toggleDraw;
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;  
    lastLocation = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
      zoom: 18,
      center: lastLocation
    };
    map = new google.maps.Map(document.getElementById('location'), mapOptions);
    debug(latitude, longitude);
  });
});

var calibrate = 0;
var positionOptions = {
  maximumAge: 5000
};
var googleCoords = [];
var calibrateCoords = [];
// Controls refining accuracy and drawing on the map.
function setLocation(position) {
  var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
  if (hDist(pos, lastLocation) < THRESHOLD && hDist(pos, lastLocation) != 0) {
    googleCoords.push(position);
    calibrate += 1;
    var options = {
      zoom: 18,
      center: pos
    };
    debug(position.coords.latitude, position.coords.longitude)
    if (calibrate % NUM_POINTS == 0) {
      calibrateCoords.push(calibratedLoc());
      if (calibrateCoords.length > 0 && calibrate != NUM_POINTS) {
        drawLine(calibrateCoords[calibrateCoords.length-2], calibrateCoords[calibrateCoords.length-1]);
      }
    }
  }
  lastLocation = pos;
}

// Uses weighted average algorithm to calibrate location
function calibratedLoc() {
  var cLatitude = 0;
  var cLongitude = 0;
  var total = 0;
  var len = googleCoords.length;
  for (var i = 0; i < NUM_POINTS; i++) {
    total += googleCoords[len-1-i].coords.accuracy;
  }
  for (var i = 0; i < NUM_POINTS; i++) {
    cLatitude += (1-googleCoords[len-i-1].coords.accuracy/total)*googleCoords[len-1-i].coords.latitude;
    cLongitude += (1-googleCoords[len-i-1].coords.accuracy/total)*googleCoords[len-1-i].coords.longitude;
  }
  cLatitude = cLatitude / (NUM_POINTS - 1);
  cLongitude = cLongitude / (NUM_POINTS - 1);
  return new google.maps.LatLng(cLatitude, cLongitude);
}

// Draws a red line on the map between p1 and p2
function drawLine(pos1, pos2) {
  var line = new google.maps.Polyline({
    path: [pos1, pos2],
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: map
  });
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

var watch;
var isDrawing = false;
// Turns drawing on and off.
function toggleDraw() {
  if (isDrawing) {
    document.getElementById("paintbrush").style.opacity = "1";
    isDrawing = false;
    navigator.geolocation.clearWatch(watch);
  } else {
    document.getElementById("paintbrush").style.opacity = "0.5";
    isDrawing = true;
    calibrate = 0;
    watch = navigator.geolocation.watchPosition(setLocation, error, positionOptions);
  }
}

function error() {alert('error');}