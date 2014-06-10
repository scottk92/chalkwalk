
// Create the 3 panels and stick them in an array
var namePanel = document.getElementById("name-panel");
var searchPanel = document.getElementById("search-game-panel");
var createPanel = document.getElementById("create-game-panel");
var panels = [namePanel, searchPanel, createPanel];

// Show the panel of the id given.  Hide the others.
function showPanel(panelId, nameBtnId, navBarId) {
  for (var i=0; i<panels.length; i++) {
    if (i == panelId) {
		panels[i].style.display = 'block';
		if (panelId == 1 || panelId == 2) {
			document.getElementById(nameBtnId).style.display = 'block';
			document.getElementById(navBarId).style.display = 'block';
		} else {
			document.getElementById(nameBtnId).style.display = "none";
			document.getElementById(navBarId).style.display = 'none';
		}
    } else {
		panels[i].style.display = 'none';
	}
}
}