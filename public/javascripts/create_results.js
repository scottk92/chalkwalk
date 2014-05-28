

var createResultsPage = function(coordHash, colorHash) {
	//create canvas
	var image = createDrawing();
	
//iterate through hash : get key: color: array of arrays
	var nameList = Object.keys(coordHash);
	for (var i = 0; i < nameList.length; i++) {
		var player = nameList[i];
		var color = colorHash[player];
		var lines = coordHash[player];
		for (var numLines = 0; numLines < lines.length; numLines++) {
			var line = lines[numLines];
			drawPoints(color, image, line);
		}
	}
  return image;
}
