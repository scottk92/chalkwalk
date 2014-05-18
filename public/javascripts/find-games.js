/*
 * GameFinder
 * A class to control searching for games and displaying
 * the results.
 */
function GameFinder(tableId, tbodyId, inputId, errorMsgId) {
	this.table = document.getElementById(tableId);
	this.tbody = document.getElementById(tbodyId);
	this.input = document.getElementById(inputId);
	this.errorMsg = document.getElementById(errorMsgId);
}

/*
 * displayErrorMsg(msg)
 * Displays an error message.
 */
GameFinder.prototype.displayErrorMsg = function(msg) {
	this.errorMsg.innerHTML = msg;
	this.errorMsg.style.display = 'block';
	this.table.style.display = 'none';
}

/*
 * search()
 * Sends a GET request to MongoDB to get data about a game room using the query
 * in the game name input.  Upon success, display the search results.
 */
GameFinder.prototype.search = function() {
	var gamefinder = this;
	var nameQuery = this.input.value;
	if (nameQuery == "") {
		this.displayErrorMsg("Game name can't be blank.");
		return;
	}
	var request = new XMLHttpRequest();
	request.open('GET', '/gamefinder/' + nameQuery, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			data_array = JSON.parse(request.responseText);
			if (data_array.length == 0 || !data_array[0].active) {
				gamefinder.displayErrorMsg("There are no games with that name.");
			} else {
				gamefinder.displaySearchResults(data_array[0]);
			}
		} else {
			console.log("error");
		}
	};
	request.onerror = function() {
		console.log("Request faild to send");
	};
	request.send();
}

/*
 * displaySearchResults(data)
 * Populates the search results table with the data returned
 * the search method.
 */
GameFinder.prototype.displaySearchResults = function(data) {
	var gamefinder = this;
	this.errorMsg.style.display = 'none';
	this.table.style.display = 'table';
	this.createHeaderRow();

	// Game Name
	var row = document.createElement("tr");
	var nameTd = document.createElement("td");
	nameTd.innerHTML = data.name;
	row.appendChild(nameTd);

	// Join Button
	var buttonTd = document.createElement("td");
	var button = document.createElement("button");
	button.innerHTML = "Join";
	button.type = "button";
	button.className = "btn btn-primary";
	button.addEventListener("click", function(){
		gamefinder.joinGame(data.name, localStorage.username);
	});
	buttonTd.appendChild(button);
	row.appendChild(buttonTd);
	gamefinder.tbody.appendChild(row);
}

/*
 * joinGame(gameName, username)
 * Sends a PUT request to MongoDB to place a user inside a game.  Transitions
 * to the waiting room page.
 */
GameFinder.prototype.joinGame = function(gameName, username) {
	if (username == "" || username == undefined) {
		this.displayErrorMsg("Please log in before joining a room.");
		return;
	}
	request = new XMLHttpRequest();
	request.open('PUT', '/join/' + gameName + "/" + username, true);
	request.onload = function() {
	  if (request.status >= 200 && request.status < 400){
			localStorage.game = gameName;
			window.location = '/waiting_room';
	  } else {
	    console.log("Error");
	  }
	};
	request.onerror = function() {
		console.log("Request failed to send.");
	};
	request.send();
}

/*
 * createHeaderRow()
 * Initializes the search results table by creating the header rows.
 */
GameFinder.prototype.createHeaderRow = function() {
	this.tbody.innerHTML = '';
	var headRow = document.createElement("tr");
	var header1 = document.createElement("th");
	header1.innerHTML = "Game Name";
	var header2 = document.createElement("th");
	header2.innerHTML = "Join";
	headRow.appendChild(header1);
	headRow.appendChild(header2);
	this.tbody.appendChild(headRow);
}