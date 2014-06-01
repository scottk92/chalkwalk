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
function drawPoints(color, drawing, points, max) {
  var context = drawing.getContext('2d');context.lineWidth = 5;
  context.beginPath();
  var projectedPoints = recalibrateScale((points), max);
  console.log(projectedPoints);
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

function recalibrateShift(points, minX, minY) {  
  return  points.map(function(point) {
    return {x: point.x-minX, y:point.y-minY};
  });
}

function recalibrateScale(points, max) {
	return points.map(function(point) {
		return {x:point.x/max*largestDimension, y:point.y/max*largestDimension};
	});
}