
// Create the 3 panels and stick them in an array
var namePanel = document.getElementById("name-panel");
var searchPanel = document.getElementById("search-game-panel");
var createPanel = document.getElementById("create-game-panel");
var panels = [namePanel, searchPanel, createPanel];

// Show the panel of the id given.  Hide the others.
function showPanel(panelId) {
	alert("yo");
  for (var i=0; i<panels.length; i++) {
  	
    if (i == panelId) {
		panels[i].style.display = 'block';
		/*if (panelId == 1 || panelId == 2) {
			document.getElementById("nameBtn").style.display = 'block';
		}*/
    } else {
		panels[i].style.display = 'none';
		//document.getElementById("nameBtn").style.display = 'none';
	}
}
}