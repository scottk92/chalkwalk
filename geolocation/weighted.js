// Constants
var RADIUS = 1;

// Initialize the map
var calibrateCoords = [];
var dispCoords, map, lastLocation, watch;
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
    dispCoords = document.getElementById('coords');
    //dispCoords.innerHTML = "<p>" + latitude + "," + longitude + "</p>";
  });
  document.getElementById('done').onclick = function() {
    document.body.innerHTML = "";
    calibrateCoords.push(new google.maps.LatLng(37.424961, -122.169810));
    calibrateCoords.push(new google.maps.LatLng(37.425238, -122.170024));
    calibrateCoords.push(new google.maps.LatLng(37.425025, -122.170115));
    drawPoints(recalibrate(globeToPoint(calibrateCoords)));
  }
});




var calibrate = 0;
var isDrawing = false;
var positionOptions = {
  maximumAge: 5000
};
var PTS = 3;
var len = 0;
var googleCoords = [];
//localStorage.clear();
var numData = localStorage['numData'];
var THRESHOLD = 0.01;
for (var i = 0; i < parseInt(numData); ++i) {
  console.log(i);

  var storedCoordinates = JSON.parse(localStorage.getItem(i.toString()) || "null");
  if (storedCoordinates == null) continue;
  for (var j = 0; j < storedCoordinates.length; j++) {
    console.log((storedCoordinates[j]).k + "," + (storedCoordinates[j]).A);
  }
}
if (isNaN(parseInt(numData))) {
  localStorage['numData'] = 0;
  numData = 0;
}
localStorage['numData'] = parseInt(localStorage['numData']) + 1;
function setLocation(position) {
  var loc = document.getElementById('location');
  /*https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation
  https://developers.google.com/maps/documentation/javascript/examples/marker-simple*/

  var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
  
  if (hDist(pos, lastLocation) < THRESHOLD/* && hDist(pos, lastLocation) != 0*/) {
    googleCoords.push(position);
    len++;
    calibrate = (calibrate + 1);
    var options = {
      zoom: 18,
      center: pos
    };
    var p = document.createElement('p');
    p.innerText = position.coords.latitude + "," + position.coords.longitude;
    dispCoords.appendChild(p);
    if ((calibrate % PTS) == 0) {
      var cLatitude = 0;
      var cLongitude = 0;
      var total = 0;
      for (var i = 0; i < PTS; i++) {
        total += googleCoords[len-1-i].coords.accuracy;
      }
      for (var i = 0; i < PTS; i++) {
        cLatitude += (1-googleCoords[len-i-1].coords.accuracy/total)*googleCoords[len-1-i].coords.latitude;
        cLongitude += (1-googleCoords[len-i-1].coords.accuracy/total)*googleCoords[len-1-i].coords.longitude;
      }
      cLatitude = cLatitude / (PTS - 1);
      cLongitude = cLongitude / (PTS - 1);
      var cLocation = new google.maps.LatLng(cLatitude, cLongitude);

      var marker = new google.maps.Circle({
        clickable: false,
        center: cLocation,
        map: map,
        radius: RADIUS,
        strokeColor: "#FF0000",
        fillColor: "#FF0000"
      });
  
      calibrateCoords.push(cLocation);
      var storeLocations = JSON.parse(localStorage[numData.toString()] || "null");
      if (storeLocations == null) {storeLocations = [cLocation];}
      storeLocations.push(cLocation);
      localStorage[numData.toString()] = JSON.stringify(storeLocations);
      if (calibrateCoords.length > 0 && calibrate != PTS) {
          var lineCoords = [calibrateCoords[calibrateCoords.length-2], calibrateCoords[calibrateCoords.length-1]];
          var line = new google.maps.Polyline({
            path: lineCoords,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map
          });
      }
    }
  }
  lastLocation = pos;
}

function hDist(pos1, pos2) {
  function sinSq(a,b) {
    return Math.pow(Math.sin((b-a)/2), 2);
  }
  var EARTH_RADIUS = 6370;
  var lat1 = pos1.lat()*Math.PI/180;
  var lng1 = pos1.lng()*Math.PI/180;
  var lat2 = pos2.lat()*Math.PI/180;
  var lng2 = pos2.lng()*Math.PI/180;

  return 2*EARTH_RADIUS*Math.asin(Math.sqrt(sinSq(lat1, lat2) + Math.cos(lat1)*Math.cos(lat2)*sinSq(lng1, lng2)));
}

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
