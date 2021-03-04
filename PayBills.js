/*
File: PayBills.js
?: Scripting for PayBills.html. Includes producing a table of charges, producing total due, and "paying" dues. 
*/

//flag represents whether the table is rendered. 
let flag = false;
//Represents if user has payed
let payed = false;

//Fake charges and items. 
const charges = ['1300.34', '10.00', '10.00', '10.00', 
                '56.00', '3.00', '7.50', '102.96', '25.00', '117.00'];
const items = ["Tuition", "Class 1 Fee", "Class 2 Fee", "Class 3 Fee", 
               "Athletic Program Fee", "Central Transit Fee", 
                "Math & Writing Tutoring Fee", "Med & Counseling Clinic Fee","MultiModal Fee",
                "Recreation Center Fee"];


//produceDetails() generates table of dues. Also removes the table if it's already up.
const produceDetails = () => {
    //If we payed we don't have dues, so don't generate the table
    if(payed) return;
    
    //If the table is up, remove the table and set flag
    if(flag) { 
        let presentTable = document.getElementById("generatedTable");
        presentTable.remove();
        flag = false;
        return;
    }
    
    //This is the main parent div where we put everything.
    const payBillsInformation = document.getElementById("payBillsInformation");

    //Create a table id="generatedTable" (creative name I know)
    const table = document.createElement("table");
    table.id = "generatedTable";

    //Create the title of table by creating its tr (id="titleTableRow") and td
    const trTitle = document.createElement("tr");
    trTitle.id = "titleTableRow";
    const tdTitle = document.createElement("td");
    const titleText = document.createTextNode("Winter 2021 Fee Details");

    //Append to table. Note we give an attr colspan="3" to titleTableRow
    tdTitle.appendChild(titleText);
    tdTitle.setAttribute("colspan", "3");
    trTitle.appendChild(tdTitle);
    table.appendChild(trTitle);

    //Create more headings, to explain what the table actually means!
    //id="headingTableRow"
    const trHeading = document.createElement("tr");
    trHeading.id = "headingTableRow";
    const chargeTextH = document.createTextNode("Charges");
    const tdChargeTextH = document.createElement("td");
    tdChargeTextH.appendChild(chargeTextH);
    const feeTextH = document.createTextNode("Fees");
    const tdFeeTextH = document.createElement("td");

    //Append to table
    tdFeeTextH.appendChild(feeTextH)
    trHeading.appendChild(tdChargeTextH);
    trHeading.appendChild(tdFeeTextH);
    table.appendChild(trHeading);

    //Set table to data by creating tr for each charge and due
    //i indexes items
    let i = 0;
    charges.forEach((charge) => {
        const tr = document.createElement("tr");
        const tdCharge = document.createElement("td");
        const tdReason = document.createElement("td");

        const chargeText = document.createTextNode("$" + charge.toString());
        const reasonText = document.createTextNode(items[i]);

        
        tdCharge.appendChild(chargeText);
        tdReason.appendChild(reasonText);

        tr.appendChild(tdReason);
        tr.appendChild(tdCharge);
        

        table.appendChild(tr);
        i++;
    });

    //Append table to page and set flag to true
    payBillsInformation.appendChild(table);
    flag = true;
};

//produceTotalDue() calculates how much the user owes and sets Current Dues
const produceTotalDue = () => {

    //add up total (if payed then total should be zero)
    const totalDueh1 = document.getElementById("totalDue");
    let total = 0;

    if(!payed) {
        charges.forEach(charge => {
            total += parseFloat(charge);
        });
    }
    
    //Append/create new text node
    const totalText = document.createTextNode("$" + total.toString());
    totalText.id = "totalText";
    totalDueh1.appendChild(totalText);
    
};

//payDues() does as it says, it mimicks the process of paying what's owed
const payDues = () => {
    //Stop if already payed
    if(payed) return;
    
    //If the table is open when the user pays, close the table
    if(flag) {
        const presentdTable = document.getElementById("generatedTable");
        presentdTable.remove();
        flag = false;
    }

    //We have payed, so set payed to true. Then, waste time to act like processing is occurring
    payed = true;
    wasteTime();
    
};

//wasteTime() also does as it says: it wastes time to give the asthetic appearance of processing 
const wasteTime = () => {
    //Create an element to represent the website loading (id="loadingPage")
    const loadingPage = document.createElement("div");
    const p = document.createElement("p");
    const loadText = document.createTextNode("Processing...");
    p.appendChild(loadText);
    loadingPage.appendChild(p);
    loadingPage.id = "loadingPage";

    //Hide the current page
    const page = document.getElementById("payBillsPage");
    page.appendChild(loadingPage);
    const payBillsInformation = document.getElementById("payBillsInformation");
    payBillsInformation.style.visibility = "hidden";
    
    //After 3 seconds, alert user that the process was a success.
    //Then, remove the loading page and unhide the payBillsInformation
    //We then call produceTotalDue() to get $0  
    setTimeout(()=>{
        alert("Payment was successful! Check your student email for receipt.");
        loadingPage.remove();
        payBillsInformation.style.visibility = "visible";
        const totalDueh1 = document.getElementById("totalDue");
        totalDueh1.innerHTML = "";
        produceTotalDue();
    }, 3000);
      
};