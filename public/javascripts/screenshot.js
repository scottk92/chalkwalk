var largestDimension;

// Creates drawing and associated containers, and adds to body
function createDrawing() {
  var drawing = document.createElement('canvas');
  largestDimension  = Math.min(screen.availWidth, screen.availHeight);
  drawing.width = largestDimension;
  drawing.height = largestDimension;
  return drawing;
}

/* 
   color: color to draw path
   drawing: object representing drawing (from createDrawing)
   points: array of points to draw (in lat-lng)
*/
function drawPoints(color, drawing, points) {
  var context = drawing.getContext('2d');
  context.beginPath();
  var projectedPoints = recalibrate(globeToPoint(points));
  for (var i = 0; i < projectedPoints.length - 1; i++) {
    context.moveTo(projectedPoints[i].x, projectedPoints[i].y);
    context.lineTo(projectedPoints[i+1].x, projectedPoints[i+1].y);
  }
  context.strokeStyle = color;
  context.stroke();
}

function globeToPoint(points) {
  return points.map(function(point) {
    return canvasMap.getProjection().fromLatLngToPoint(point);
  });
}

function recalibrate(points) {  
  var minX = minCoord('x', points);
  var minY = minCoord('y', points);
  var shiftedPoints = points.map(function(point) {
    return {x: point.x-minX, y:point.y-minY};
  });
  var maxX = maxCoord('x', shiftedPoints);
  var maxY = maxCoord('y', shiftedPoints);
  var max = Math.max(maxX, maxY);
  return shiftedPoints.map(function(point) {
    return {x: point.x/max*largestDimension, y: point.y/max*largestDimension};
  });   
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
