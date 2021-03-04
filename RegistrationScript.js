/*
File: RegistrationScript.js
?: Scripting for Registration.html 
NOTE: If you want to restart testing enter this command into browser console for registration to work properly:
sessionStorage.clear()
^This will delete all key-value pairs which will make this work again."
If you haven't finalized, you can also click the clear button on the registration page :) 
*/

//candidate is selected class
//selectedQuarter is the selected quarter
//classAmt is classList.length
//classList is array of classes
let candidate = "NOT SELECTED";
let selectedQuarter = "NOT SELECTED";
let classAmt = 0;
let classList = [];


//When the window loads, add event listeners to keep track of what class is selected and if the user clicked on a currClassList element
window.onload = () => {
    if(sessionStorage.getItem("currClassList") !== null) {
        classList = sessionStorage.getItem("currClassList").replace("[", "").replace("]", "").replace('"', "").split(",");
        classAmt = classList.length;
    }

    const query = window.location.search;
    
    quarter = new URLSearchParams(query);
    if(quarter.get("quarter") === null) {
        alert("ERROR: Incorrect URL params");
        window.location.href = "../../../Index.html";
    }
    selectedQuarter = quarter.get("quarter");

    const quarterSpan = document.getElementById("selectedQuarter");
    const quarterText = document.createTextNode("SELECTED QUARTER: " + selectedQuarter);
    quarterSpan.appendChild(quarterText);

    //Keep track if a class has been selected
    const selection = document.getElementById("selectClass");

    selection.addEventListener("change", () => {
        candidate = selection.value;
    }, false);

    //Delete an element if it's clicked
    const classUL = document.getElementById("currClassList");
    
    classUL.addEventListener("click", (e) => {

        const tgt = e.target;

        //If the user has an empty class list, dont delete anything
        if(tgt.tagName !== "DIV") {
            return;
        }
        
        const deleteClass = tgt.innerHTML;
        tgt.remove();
        
        classAmt--;
        classList = classList.filter((ele) => ele !== deleteClass);
        
      });
      clearClasses();
}

//Adds a selected class to currClassList 
const addClass = () => {
    //Class list is too full
    if(classAmt > 2) {
        alert("Warning: 15 credits have already been met. Require approval from advisor.");
        return;
    }
    //No class has been selected
    else if(candidate === "NOT SELECTED") { 
        alert("Please select a class!");
        return; 
    }
    //Class has already been added
    else if(classList.includes(candidate)) {
        alert("Duplicate class submission!");
        return;
    }

    classAmt++;
    classList.push(candidate);
    sessionStorage.setItem('currClassList', JSON.stringify(classList));
    console.log(sessionStorage.getItem('currClassList'));
    generateCurrClassList();
}

//generateClassList() is used to generate the selected class list in Enrolled.html
const generateClassList = (quarter) => { 
    //If the user didn't pick a class, go to home page
    if(sessionStorage.getItem("finalClassList") === null) {
        alert("WARNING: NO CLASSES SUBMITTED. MAKE SURE TO SUBMIT BEFORE CHECKING.");
        window.location.href = "../../../Index.html";
        return;
    }

    //format query quarter to find which id we need to add the classes to
    quarter = quarter.replace(" ", "");
    quarter = quarter.toLowerCase();

    //Find corresponding span, block
    const block = document.getElementById(quarter);

    //create list and parse JSON string to JSON for the selectedClasses
    const ul =  document.createElement("ul");
    const selectedClasses = JSON.parse(sessionStorage.getItem('finalClassList'));
    
    //For each selected class, create a li and append to list
    selectedClasses.forEach((ele) => {
        const curr = document.createElement("li");
        const text = document.createTextNode(ele);
        curr.appendChild(text);
        ul.appendChild(curr);
    });

    //append list to block
    block.appendChild(ul);
}

//generateCurrClassList() is used by Registration.html to generate selected classes
const generateCurrClassList = () => { 
    
    //Get and clear currClassList
    const ul = document.getElementById("currClassList");
    while (ul.firstChild) { ul.removeChild(ul.firstChild); }
    
    //For all classes selected, add to currClassList
    classList.forEach((ele) => {
        const curr = document.createElement("li");
        const text = document.createTextNode(ele);

        const deleteButton = document.createElement("div");
        deleteButton.append(text);

        curr.appendChild(deleteButton);
        
        ul.appendChild(curr);
    });
    
   
}

//clearClasses() clears currClassList and removes currently selected list
const clearClasses = () => {
    sessionStorage.removeItem("currClassList"); 
    classAmt = 0; 
    classList=[];
    const ul = document.getElementById("currClassList");
    while (ul.firstChild) { ul.removeChild(ul.firstChild); }
}

//submitClasses() submits classes and sends selected quarter from currClassList to quarter/finalClassList
const submitClasses = () => {
    if (sessionStorage.getItem("currClassList") === null) { alert("Please select a class before submitting."); }
    else { 
        sessionStorage.setItem("quarter", selectedQuarter);
        sessionStorage.setItem("finalClassList", sessionStorage.getItem("currClassList")); 
        window.location.href = "../Enrolled/Enrolled.html";
    }
}

