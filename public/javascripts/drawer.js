// Constants
var EARTH_RADIUS = 6370;
var NUM_POINTS = 3;
var THRESHOLD = 0.01;

// Initialize last location
var lastLocation;
function initializeDrawing() {
  document.getElementById("paintbrush").onclick = toggleDraw;
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;  
    lastLocation = new google.maps.LatLng(latitude, longitude);
  });
}

var calibrate = 0;
var positionOptions = {
  maximumAge: 5000
};
var rawCoords = [];
var calibrateCoords = [];
var coordsDB = new Firebase('https://outdoorspictionary.firebaseIO.com/Games/' + localStorage.game + '/coords');

// Calibrates coordinates and then pushes them to the Firebase DB
function setLocation(position) {
  var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
  //if (hDist(pos, lastLocation) < THRESHOLD && hDist(pos, lastLocation) != 0) {
    rawCoords.push(position);
    calibrate++;
    if (calibrate % NUM_POINTS == 0) {
      var calibratedPos = calibratedLoc();
      calibrateCoords.push(calibratedPos);
      coordsDB.push({'name':localStorage.username, 'lat':calibratedPos.lat(), 'lng':calibratedPos.lng()});
    }
  //}
  lastLocation = pos;
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
var isDrawing = false;
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