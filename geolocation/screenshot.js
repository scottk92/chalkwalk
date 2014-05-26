var largestDimension = Math.min(screen.availWidth, screen.availHeight);
// Draw points
function drawPoints(points) {
  var drawing = document.createElement('canvas');
  drawing.width = largestDimension;
  drawing.height = largestDimension;
  var outer, inner;
  outer = document.createElement('div');
  outer.setAttribute('id', 'outer');
  outer.style.width = '100%';
  outer.style.height = '100%';
  inner = document.createElement('div');
  inner.style.display = "inline-block";
  inner.style.textAlign = "center";
  inner.setAttribute('id', 'inner');
  outer.appendChild(inner);
  inner.appendChild(drawing);
  document.body.appendChild(outer);
  var drawingImage = new Transform('outer', 'inner');
  drawingImage.startListening();
  var context = drawing.getContext('2d');console.log(drawing.width + " " + drawing.height);
  context.fillStyle = "#00FF00";context.fillRect(0,0,drawing.width, drawing.height);for (var i = 0; i < points.length - 1; i++) {
    //console.log('drawing ' + points[i].x + " " + points[i].y);
    context.moveTo(points[i].x, points[i].y);
    context.lineTo(points[i+1].x, points[i+1].y);
  }
  context.strokeStyle = 'red';
  context.stroke();
}

function globeToPoint(points) {
  return points.map(function(point) {
    //console.log(map.getProjection().fromLatLngToPoint(point));
    return map.getProjection().fromLatLngToPoint(point);
  });
}

function recalibrate(points) {  
  var minX = minCoord('x', points);
  var minY = minCoord('y', points);
  console.log(minX + " " + minY);
  var shiftedPoints = points.map(function(point) { 
console.log(point.x + " " + point.y);
    return {x: point.x-minX, y:point.y-minY};
  });
  //console.log(shiftedPoints[0]);
  var maxX = maxCoord('x', shiftedPoints);
  var maxY = maxCoord('y', shiftedPoints);
  var max = Math.max(maxX, maxY);
console.log(max + " " + largestDimension);
  //console.log(maxX + " " + maxY);
  return shiftedPoints.map(function(point) {
  console.log(point.x/max*largestDimension + " " + point.y/max*largestDimension);
    return {x: point.x/max*largestDimension, y: point.y/max*largestDimension};
  });
    
}
function minCoord(axis, array) {
  if (axis === "x") {
    var min = array[0].x;for (var i = 0; i < array.length; i++) {
      min = min < array[i].x ? min : array[i].x;
    }/*return array.reduce(function(lastValue, currentValue, index, array) {
      alert(currentValue.x);
      return currentValue.x< lastValue.x? currentValue.x: lastValue.x;
    });*/
  } else if (axis === "y") {
    var min = array[0].y;
    for (var i = 0; i < array.length; i++) {
      min = min < array[i].y ? min : array[i].y;
    }/*return array.reduce(function(lastValue, currentValue, index, array) {
      return currentValue.y< lastValue.y? currentValue.y: lastValue.y;
    });*/
  }
  return min;
}
function maxCoord(axis, array) {
  if (axis === "x") {
    var max = array[0].x;for (var i = 0; i < array.length; i++) {
      max = max > array[i].x ? max : array[i].x;
    }/*return array.reduce(function(lastValue, currentValue, index, array) {
      alert(currentValue.x);
      return currentValue.x< lastValue.x? currentValue.x: lastValue.x;
    });*/
  } else if (axis === "y") {
    var max = array[0].y;
    for (var i = 0; i < array.length; i++) {
      max = max > array[i].y ? max : array[i].y;
    }/*return array.reduce(function(lastValue, currentValue, index, array) {
      return currentValue.y< lastValue.y? currentValue.y: lastValue.y;
    });*/
  }
  return max;
}
