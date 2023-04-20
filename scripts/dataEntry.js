
const btnAddEntry = document.getElementById("addEntryBtn");
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
    
    let name = nameInput.value.trim();
    let amount = parseFloat(amountInput.value.trim());

    if (!name || isNaN(amount) || amount < 0) {
        alert("Please enter a valid name and amount.");
        return;
    }
    document.getElementById("entriesBox").style.display = "flex";
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
            btnCalculate.style.display = "inline-block";
        }
    }

    // Create editBtn
    const editBtn = document.createElement("button");
    editBtn.id = "editBtn";
    entry.appendChild(editBtn);

    // Add click event to editBtn
    editBtn.addEventListener("click", () => {

        btnCalculate.style.display = "none";
        entry.replaceChildren();
        const inputName = document.createElement('input');
        inputName.id = "editName";
        inputName.type = "text";
        inputName.value = name;
        inputName.style.width = ((inputName.value.length + 8) * 8) + 'px';
        const inputAmount = document.createElement("input");
        inputAmount.value = person.amount;
        inputAmount.style.width = ((inputAmount.value.length + 8) * 8) + 'px';
        inputAmount.id = "editAmount";
        inputAmount.type = "number";

        // create saveBtn
        const saveBtn = document.createElement("button");
        saveBtn.id = "saveBtn"       
         
        entry.appendChild(inputName);
        entry.appendChild(inputAmount);
        entry.appendChild(saveBtn);

        // Add click event to Save button
        saveBtn.addEventListener("click", () => {
            
            let objIndex = arrOfEntries.findIndex((entry) => entry.name == name && entry.amount == amount);
            name = inputName.value.trim();
            amount = parseFloat(inputAmount.value.trim());

        if (!name || isNaN(amount) || amount < 0) {
            alert("Please enter a valid name and amount.");
            return;
        }
            
            arrOfEntries[objIndex].name = name;
            arrOfEntries[objIndex].amount = amount;
            entry.replaceChildren();           
            entry.id = name;
            entry.innerHTML = `${name} spent $${amount.toFixed(2)}`;
            entry.appendChild(editBtn)
            total = arrOfEntries.reduce((sum, entry) => sum + entry.amount, 0);
            totalSpentElement.innerHTML = `Total: $${total.toFixed(2)}`;
            const equalAmount = (total / arrOfEntries.length).toFixed(2);
            equalAmountElement.innerHTML = `Per Person: $${equalAmount}`;
            if(arrOfEntries.length > 1){
                btnCalculate.style.display = "inline-block";
            }
        })
    });
    
    total = arrOfEntries.reduce((sum, entry) => sum + entry.amount, 0);
    totalSpentElement.innerHTML = `Total: $${total.toFixed(2)}`;
    const equalAmount = (total / arrOfEntries.length).toFixed(2);
    equalAmountElement.innerHTML = `Per Person: $${equalAmount}`;

    nameInput.value = "";
    amountInput.value = "";
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
    
    document.getElementById("resultsBox").style.display = "flex";
    btnCalculate.style.display = "none";
    btnStartOver.style.display = "inline-block";
    nameInput.style.display = "none";
    amountInput.style.display = "none";
    btnAddEntry .style.display = "none";

    const listItems = listOfEntries.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++){
        const editButton = listItems[i].querySelector("#editBtn")
        if(editButton){
            editButton.remove();
        }
    }
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

// Adding event listener for Start Over button
btnStartOver.addEventListener("click", () => {

    while(listOfEntries.firstChild) listOfEntries.removeChild(listOfEntries.firstChild);
    const ul = document.getElementById("tally");
    ul.style.display = "none";
    while(listOfResults.firstChild) listOfResults.removeChild(listOfResults.firstChild);
    nameInput.style.display = "inline-block";
    amountInput.style.display = "inline-block";
    btnAddEntry.style.display = "inline-block";
    document.getElementById("resultsBox").style.display = "none";
    document.getElementById("entriesBox").style.display = "none";
    btnStartOver.style.display = "none";
    arrOfEntries = [];
    total = 0;
})




