var colorLibrary = [
	'#CB0D1B', // red
	'#D1026C', // pink
	'#F2D43F', // yellow
	'#61C155', // green
	'#048091', // green-blue
	'#492D61' // navy
];

function ColorBox(containerId) {
	this.container = document.getElementById(containerId);
}

/*
 * turnOffColorOptions(onColorBox)
 * Turn off all the color options except for the one passed in.
 */
function turnOffColorOptions(onColorBox) {
	var colorBoxes = document.getElementsByClassName("color-box");
	Array.prototype.filter.call(colorBoxes, function(colorBox){
    colorBox.style.opacity = 0.5;
  });
  onColorBox.style.opacity = 1.0;
}

/*
 * showOptions(show)
 * Toggle the display of the color options (guessers don't need colors).
 */
ColorBox.prototype.showOptions = function (show) {
	//if (show) this.container.style.display = 'block';
	//else this.container.style.display = 'none';
}

function turnOnRandomColor() {
	var i = Math.floor(Math.random()*colorLibrary.length);
	var colorBoxes = document.getElementsByClassName("color-box");
	colorBoxes[i].click();
}

ColorBox.prototype.createColorOptions = function () {
	for (var i=0; i<colorLibrary.length; i++) {
		var colorBox = document.createElement("div");
		colorBox.id = colorLibrary[i];
		colorBox.className = "color-box";
		colorBox.style.backgroundColor = colorLibrary[i];
		colorBox.addEventListener("click", function(){
			localStorage.color = this.id;
			turnOffColorOptions(this);
		});
		this.container.appendChild(colorBox);
	}
	turnOnRandomColor();
}