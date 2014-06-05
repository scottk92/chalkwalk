var createResultsPage = function(coordHash, colorHash) {
	//create canvas
	var image = createDrawing();
	
	var nameList = Object.keys(coordHash);console.log(nameList);
	var newCoordHash = {};
	for (var i = 0; i < nameList.length; i++) {
		newCoordHash[nameList[i]] = [];
	for (var j = 0; j < coordHash[nameList[i]].length; j++) {
		var newArray = [];
	for (var h = 0; h < coordHash[nameList[i]][j].length; h++) {console.log(coordHash[nameList[i]][j][h]);
			var projectedCoord = (canvasMap.getProjection()).fromLatLngToPoint(
			new google.maps.LatLng(coordHash[nameList[i]][j][h].lat(), coordHash[nameList[i]][j][h].lng()));console.log(projectedCoord);
				newArray.push(projectedCoord);
		}if (newArray.length != 0)
		newCoordHash[nameList[i]].push(newArray);
	}

}  
	var minX = totalMin('x', newCoordHash);
	var minY = totalMin('y', newCoordHash);
	for (name in newCoordHash) {
		for (i = 0; i < newCoordHash[name].length; i++) {
			newCoordHash[name][i] = recalibrateShift(newCoordHash[name][i], minX, minY);
		}
	}
	var max = Math.max(totalMax('x', newCoordHash), totalMax('y', newCoordHash));

	console.log(max);
	for ( i = 0; i < nameList.length; i++) {
		var player = nameList[i];
		var color = colorHash[player];
		var lines = newCoordHash[player];
		for (var numLines = 0; numLines < lines.length; numLines++) {
			var line = lines[numLines];
			drawPoints(color, image, line, max);
		}
	}return image;
}

function totalMin(axis, coordHash) {
	
	var min = 50000000;
	for (name in coordHash) {console.log(name);
		for (var i = 0; i < coordHash[name].length; i++) {
			if (min > minCoord(axis, coordHash[name][i]))
				min = minCoord(axis, coordHash[name][i]);
		}
	}
	return min;
}

function totalMax(axis, coordHash) {
	
	var max = 0;
	for (name in coordHash) {
		for (var i = 0; i < coordHash[name].length; i++) {
			if (max < maxCoord(axis, coordHash[name][i]))
				max = maxCoord(axis, coordHash[name][i]);
		}
	}
	return max;
}



function minCoord(axis, array) {
  if (axis === "x") {
    var min = array[0].x;for (var i = 0; i < array.length; i++) {
      min = min < array[i].x ? min : array[i].x;
    }
  } else if (axis === "y") {
    var min = array[0].y;
    for (var i = 0; i < array.length; i++) {
      min = min < array[i].y ? min : array[i].y;
    }
  }
  return min;
}

function maxCoord(axis, array) {
  if (axis === "x") {
    var max = array[0].x;for (var i = 0; i < array.length; i++) {
      max = max > array[i].x ? max : array[i].x;
    }
  } else if (axis === "y") {
    var max = array[0].y;
    for (var i = 0; i < array.length; i++) {
      max = max > array[i].y ? max : array[i].y;
    }
  }
  return max;
}
