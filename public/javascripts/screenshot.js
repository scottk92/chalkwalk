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
function drawPoints(color, drawing, points, minX, minY, max) {
  var context = drawing.getContext('2d');
  context.beginPath();
  var projectedPoints = recalibrate((points), minX, minY, max);
  for (var i = 0; i < projectedPoints.length - 1; i++) {
    context.moveTo(projectedPoints[i].x, projectedPoints[i].y);
    console.log(projectedPoints[i].x, projectedPoints[i].y);
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

function recalibrate(points, minX, minY, max) {  

  var shiftedPoints = points.map(function(point) {
    return {x: point.x-minX, y:point.y-minY};
  });
  return shiftedPoints.map(function(point) {
    return {x: point.x/max*largestDimension, y: point.y/max*largestDimension};
  });   
}