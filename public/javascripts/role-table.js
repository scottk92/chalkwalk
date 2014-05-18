/*
 * RoleTable
 * A class to control the table displaying all the users and the roles
 * they select for themselves.
 */
function RoleTable(tbodyId, gameName) {
	this.tbody = document.getElementById(tbodyId);
	this.gameName = gameName;
	this.createHeaderRows();
}

/*
 * createHeaderRows()
 * Initializes the role table by creating the header rows.
 */
RoleTable.prototype.createHeaderRows = function() {
	var headRow = document.createElement("tr");
	var nameHeader = document.createElement("th");
	nameHeader.innerHTML = "Name";
	var roleHeader = document.createElement("th");
	roleHeader.innerHTML = "Role";
	headRow.appendChild(nameHeader);
	headRow.appendChild(roleHeader);
	this.tbody.appendChild(headRow);
}

/*
 * addUserToTable(name, userRoleMap)
 * Adds a new user to the role table and saves their DOM td
 * element in the userRoleMap
 */
RoleTable.prototype.addUserToTable = function(name, userRoleMap) {
	var row = document.createElement("tr");
	var nameData = document.createElement("td");
	nameData.innerHTML = name;
	row.appendChild(nameData);

	var roleData = document.createElement("td");
	roleData.innerHTML = "Drawer";
	row.appendChild(roleData);
	this.tbody.appendChild(row);
	userRoleMap[name] = roleData;
}