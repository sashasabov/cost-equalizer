
const btnAddEntry = document.getElementById("addEntry");
const btnCalculate = document.getElementById("CalculateBtn");
const btnStartOver = document.getElementById("StartOverBtn");
const listOfEntries = document.getElementById("listOfEntries");
const listOfResults = document.getElementById("listOfResults");
const totalSpentElement = document.getElementById("total");
const equalAmountElement = document.getElementById("equalAmount");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
let total = 0;
let arrOfEntries = [];

// Adding event listener for AddEntry button
btnAddEntry.addEventListener("click", () => {
    
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (!name || isNaN(amount) || amount < 0) {
        alert("Please enter a valid name and amount.");
        return;
    }
    
    const person = { name, amount };
    const entry = document.createElement('li');
    entry.id = person.name;
// Check if there was no entry with the same name
    if(arrOfEntries.some(e => e.name == name) == true){
    const entryToUpdate = arrOfEntries.find(entry => entry.name == name)
    entryToUpdate.amount += person.amount;
    document.getElementById(name).innerHTML = `${person.name} spent $${entryToUpdate.amount.toFixed(2)}`;
    }
    else {
        entry.innerHTML = `${person.name} spent $${person.amount.toFixed(2)}`;
        listOfEntries.appendChild(entry);
        arrOfEntries.push(person);
        if(arrOfEntries.length > 0){
            document.getElementById("tally").style.display = "inline-block";
        }
        if(arrOfEntries.length > 1){
            document.getElementById("CalculateBtn").style.display = "inline-block";
        }
    }
    // edit/save button code here
    
    total = arrOfEntries.reduce((sum, entry) => sum + entry.amount, 0);
    totalSpentElement.innerHTML = `$${total.toFixed(2)}`;
    const equalAmount = (total / arrOfEntries.length).toFixed(2);
    equalAmountElement.innerHTML = `$${equalAmount}`;

    nameInput.value = "";
    amountInput.value = "";

    recalcEntries = [...arrOfEntries];

});


function creditorsMore(array1, array2){

    array1.forEach((creditor) => {
        let amountOwed = Math.abs(creditor.balance);
        const debtorGreater = array2.find((debtor) => debtor.balance >= amountOwed);
        const debtorLess = array2.find((debtor) => debtor.balance < amountOwed);

        if (debtorGreater) {
            debtorGreater.balance -= amountOwed;
            creditor.balance = 0; 
            const result = document.createElement("li");
            result.innerHTML = `${debtorGreater.name} owes $${amountOwed.toFixed(2)} to ${creditor.name}`;
            listOfResults.appendChild(result);
        }   
        else if (debtorLess){                
            creditor.balance += debtorLess.balance;
            const result = document.createElement("li");
            result.innerHTML = `${debtorLess.name} owes $${debtorLess.balance.toFixed(2)} to ${creditor.name}`;
            listOfResults.appendChild(result);
            debtorLess.balance = 0;
        }
    })
}

function debtorsMore(array1, array2){

    array1.forEach((debtor) => {
        let amountToReturn = debtor.balance;
        const creditorGreater = array2.find((creditor) => Math.abs(creditor.balance) >= amountToReturn);
        const creditorLess = array2.find((creditor) => Math.abs(creditor.balance) < amountToReturn);
                    
        if (creditorGreater) {
            creditorGreater.balance += amountToReturn;
            debtor.balance = 0; 
            const result = document.createElement("li");
            result.innerHTML = `${debtor.name} owes $${amountToReturn.toFixed(2)} to ${creditorGreater.name}`;
            listOfResults.appendChild(result);
        }   
        else if (creditorLess) {                
            debtor.balance += creditorLess.balance;
            const result = document.createElement("li");
            result.innerHTML = `${debtor.name} owes $${Math.abs(creditorLess.balance).toFixed(2)} to ${creditorLess.name}`;
            listOfResults.appendChild(result);
            creditorLess.balance = 0;
        }        
    }) 
}

// Adding event listener for Calculate button
btnCalculate.addEventListener("click", () => {

    document.getElementById("CalculateBtn").style.display = "none";
    document.getElementById("StartOverBtn").style.display = "inline-block";
    document.getElementById("name").style.display = "none";
    document.getElementById("amount").style.display = "none";
    document.getElementById("addEntry").style.display = "none";
    document.querySelector("label").style.display = "none";
    // document.getElementById("editBtn").style.display = "none";
    // let node = document.getElementById("editBtn");
    // if (node.parentNode){node.parentNode.removeChild(node)}
    const equalAmount = (total / arrOfEntries.length).toFixed(2);
    arrOfEntries.forEach((entry) => {
    entry.balance = parseFloat((equalAmount - entry.amount).toFixed(2));
    });
    const creditors = arrOfEntries.filter((entry) => entry.balance < 0);
    const debtors = arrOfEntries.filter((entry) => entry.balance >= 0);
       
    if (creditors.length >= debtors.length){
        creditorsMore(creditors, debtors);   
    }

    else if (creditors.length < debtors.length){  
        debtorsMore(debtors, creditors)
    }

// Filtering out array entries with non-zero balance
    arrOfEntries = arrOfEntries.filter((entry) => entry.balance > 0.01 || entry.balance < -0.01);
    arrOfEntries.sort((a,b) => (a.balance - b.balance))

    if (arrOfEntries.length == 2){
        arrOfEntries[0].balance += arrOfEntries[1].balance;
        const result = document.createElement("li");
        result.innerHTML = `${arrOfEntries[1].name} owes $${arrOfEntries[1].balance.toFixed(2)} to ${arrOfEntries[0].name}`;
        listOfResults.appendChild(result);
    }    
})

btnStartOver.addEventListener("click", () => {

    while(listOfEntries.firstChild) listOfEntries.removeChild(listOfEntries.firstChild);
    const ul = document.getElementById("tally");
    ul.style.display = "none";
    while(listOfResults.firstChild) listOfResults.removeChild(listOfResults.firstChild);

    document.getElementById("name").style.display = "inline-block";
    document.getElementById("amount").style.display = "inline-block";
    document.getElementById("addEntry").style.display = "inline-block";
    document.querySelector("label").style.display = "inline-block";

    document.getElementById("StartOverBtn").style.display = "none";
    arrOfEntries = [];
    total = 0;
})



//create editBtn
    // const editBtn = document.createElement("button");
    // editBtn.innerText = "Edit";
    // editBtn.id = "editBtn";
    // // editBtn.id = "update" + name;
    // entry.appendChild(editBtn);

    // // Add click event to editBtn
    // editBtn.addEventListener("click", () => {

    //     btnStartOver.style.display = "none";
    //     btnCalculate.style.display = "inline-block";

    //     entry.replaceChildren();
    //     const inputName = document.createElement('input');
    //     inputName.id = name;
    //     inputName.type = "text";
    //     inputName.value = name;
    //     const inputAmount = document.createElement("input");
    //     inputAmount.value = person.amount;
    //     inputAmount.id = name;
    //     inputAmount.type = "number";

    //     // create saveBtn
    //     const saveBtn = document.createElement("button");
    //     saveBtn.innerText = "Save";
    //     saveBtn.id = "save" + name;
        
    //     entry.appendChild(inputName);
    //     entry.appendChild(inputAmount);
    //     entry.appendChild(saveBtn);

    //     // Add click event to saveBtn
    //     saveBtn.addEventListener("click", () => {
            
    //         let objIndex = arrOfEntries.findIndex((entry) => entry.name == name && entry.amount == amount);
    //         const updatedName = inputName.value.trim();
    //         const updatedAmount = parseFloat(inputAmount.value.trim());

    //     if (!updatedName || isNaN(updatedAmount) || updatedAmount < 0) {
    //         alert("Please enter a valid name and amount.");
    //         return;
    //     }

    //         arrOfEntries[objIndex].name = updatedName;
    //         arrOfEntries[objIndex].amount = updatedAmount;
    //         entry.replaceChildren();           
    //         entry.id = updatedName;
    //         editBtn.id = "update" + updatedName;
            
    //         entry.innerHTML = `${updatedName} spent $${updatedAmount.toFixed(2)}`;
    //         entry.appendChild(editBtn)
    //         total = arrOfEntries.reduce((sum, entry) => sum + entry.amount, 0);
    //         totalSpentElement.innerHTML = `$${total.toFixed(2)}`;
    //         const equalAmount = (total / arrOfEntries.length).toFixed(2);
    //         equalAmountElement.innerHTML = `$${equalAmount}`;
    //     })
    // });



