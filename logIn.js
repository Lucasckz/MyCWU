
var inputName = "name";
var inputEmail = "Email";

function setStuff() {
	inputName = document.getElementById("userName").value;
	alert(inputName);
	inputEmail = document.getElementById("Email").value;
	alert(inputName);
	getStuff();
}
function getStuff() {
	document.write(inputName);
}