function initializeResultsPage(drawing) {
	var inner = document.getElementById('inner');
	var originalImage = document.getElementById('originalImage');
	originalImage.src = localStorage.imageFile;
	inner.appendChild(drawing);
	var drawingImage = new Transform('outer', 'inner');
	drawingImage.startListening();
	changeOpacity("opacrange", "inner");
}
