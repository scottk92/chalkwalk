var createResultsPage = function(coordHash, colorHash) {
	//create canvas
	var image = createDrawing();
	
	var nameList = Object.keys(coordHash);console.log(nameList);
	for (var i = 0; i < nameList.length; i++) {
		for (var j = 0; j < coordHash[nameList[i]].length; ++j) {
			coordHash[nameList[i]][j] = globeToPoint(coordHash[nameList[i]][j]);console.log(coordHash[nameList[i]][j]);
			}
	}
	var minX = totalMin('x', coordHash);
	var minY = totalMin('y', coordHash);console.log(coordHash);
	var max = Math.max(totalMax('x', coordHash), totalMax('y', coordHash));
	for ( i = 0; i < nameList.length; i++) {console.log(minX, minY,max);
	
		var player = nameList[i];
		var color = colorHash[player];
		var lines = coordHash[player];
		for (var numLines = 0; numLines < lines.length; numLines++) {
			var line = lines[numLines];
			drawPoints(color, image, line, minX, minY, max);
		}
	}
  return image;
}

function totalMin(axis, coordHash) {
	
	var min = 50000000;
	for (name in coordHash) {
		for (line in coordHash[name]) {console.log(line);
			if (min > minCoord(axis, line))
				min = minCoord(axis, line);
		}
	}console.log(coordHash);
	return min;
}

function totalMax(axis, coordHash) {
	
	var max = 0;
	for (name in coordHash) {
		for (line in coordHash[name]) {
			if (max < maxCoord(axis, line))
				max = maxCoord(axis, line);
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
