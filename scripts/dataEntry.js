
const btnAddEntry = document.getElementById("addEntry");
const btnCalculate = document.getElementById("Calculate");
const listOfEntries = document.getElementById("listOfEntries");
const listOfResults = document.getElementById("listOfResults");
const totalSpentElement = document.getElementById("total");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
let total = 0;

let arrOfEntries = [];

// Adding event listener for AddEntry button
btnAddEntry.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid name and amount.");
        return;
    }
    
    const person = { name, amount };
    const entry = document.createElement('li');
    entry.innerHTML = `${person.name} - $${person.amount.toFixed(2)}`;
    listOfEntries.appendChild(entry);
    arrOfEntries.push(person);
    
    const totalSpent = arrOfEntries.reduce((sum, entry) => sum + entry.amount, 0);
    totalSpentElement.innerHTML = `$${totalSpent.toFixed(2)}`;
    total = totalSpent;

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

btnCalculate.addEventListener("click", () => {
    console.log("array of entries:", arrOfEntries)
    const equalAmount = (total / arrOfEntries.length).toFixed(2);

    arrOfEntries.forEach((entry) => {
    entry.balance = parseFloat((equalAmount - entry.amount).toFixed(2));
    });
    
    const creditors = arrOfEntries.filter((entry) => entry.balance < 0);
    const debtors = arrOfEntries.filter((entry) => entry.balance >= 0);

    console.log("Equal amount: " + equalAmount)
    // let debtorBalance = debtors.reduce((sum, debtor) => sum + debtor.balance, 0)

    console.log("length of array:", arrOfEntries.length)

    
    
    if (creditors.length > debtors.length){
        console.log("creditors more than debtors")
        creditorsMore(creditors, debtors);   
    }

    else if (creditors.length < debtors.length){  
        console.log("creditors less than debtors")
            
        debtors.forEach((debtor) => {
            
            let amountToReturn = debtor.balance;
            const creditorGreater = creditors.find((creditor) => Math.abs(creditor.balance) >= amountToReturn);
            const creditorLess = creditors.find((creditor) => Math.abs(creditor.balance) < amountToReturn);
                        
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
        arrOfEntries = arrOfEntries.filter((entry) => entry.balance > 0.01 || entry.balance < -0.01);
        arrOfEntries.sort((a,b) => (a.balance - b.balance))
        console.log(arrOfEntries);
        
    }

    else if (creditors.length == debtors.length){

        console.log("length equal")  
        // if (arrOfEntries.length > 1){
            creditorsMore(creditors, debtors);
            arrOfEntries = arrOfEntries.filter((entry) => entry.balance > 0.01 || entry.balance < -0.01);
        arrOfEntries.sort((a,b) => (a.balance - b.balance))
        console.log(arrOfEntries);
        // }  
        // need code below?
    //     else { 
    //     creditors.sort((a,b) => a.balance - b.balance);
    //     debtors.sort((a,b) => a.balance - b.balance);
    //     creditors[0].balance += debtors[0].balance;
    //     const result = document.createElement("li");
    //     result.innerHTML = `${debtors[0].name} owes $${debtors[0].balance.toFixed(2)} to ${creditors[0].name}`;
    //     listOfResults.appendChild(result);
    //     arrOfEntries.splice(debtors[0], 1);
    //     debtors.splice(debtors[0], 1);
    // } 

                  
    }
    if (arrOfEntries.length == 2){
        console.log("length equal 2")
        arrOfEntries[0].balance += arrOfEntries[1].balance;
        const result = document.createElement("li");
        result.innerHTML = `${arrOfEntries[1].name} owes $${arrOfEntries[1].balance.toFixed(2)} to ${arrOfEntries[0].name}`;
        listOfResults.appendChild(result);
    }
    
})

//     arrOfEntries.forEach((person) => {

    //         let debtorBalanceNotZero = debtors.find((debtor) => debtor.balance > 0);
    //         let creditorBalanceNotZero = creditors.find((creditor) => Math.abs(creditor.balance) > 0);

    //         console.log("debtorBalanceNotZero", debtorBalanceNotZero);
    //         console.log("creditorBalanceNotZero", creditorBalanceNotZero);

    //         const creditorGreater = creditors.find((creditor) => Math.abs(creditor.balance) >= debtorBalanceNotZero.balance);
    //         const creditorLess = creditors.find((creditor) => Math.abs(creditor.balance) < debtorBalanceNotZero.balance);
    //         const debtorGreater = debtors.find((debtor) => debtor.balance >= Math.abs(creditorBalanceNotZero.balance));
    //         const debtorLess = debtors.find((debtor) => debtor.balance < Math.abs(creditorBalanceNotZero.balance));
            

    //         if (creditorLess) {    
    //         // if (person.balance < 0 && Math.abs(person.balance) < debtorBalanceNotZero) {    
    //             debtorBalanceNotZero.balance += (person.balance + 0.01);                           
    //             const result = document.createElement("li");
    //             result.innerHTML = `${debtorBalanceNotZero.name} owes $${Math.abs(person.balance).toFixed(2)} to ${person.name}`;
    //             listOfResults.appendChild(result);  
    //             person.balance = 0;  
    //             console.log('case 1')            
    //         } 
            
    //         else if (creditorGreater) { 
    //         // else if (person.balance < 0 && Math.abs(person.balance) > debtorBalanceNotZero) {
    //             person.balance += debtorBalanceNotZero.balance;               
    //             const result = document.createElement("li");
    //             result.innerHTML = `${debtorBalanceNotZero.name} owes $${debtorBalanceNotZero.balance.toFixed(2)} to ${person.name}`;
    //             listOfResults.appendChild(result);
    //             debtorBalanceNotZero.balance = 0.01; 
    //             console.log('case 2')
    //         }             

    //         else if (debtorGreater) {
    //         // else if (person.balance >= 0 && Math.abs(person.balance) > creditorBalanceNotZero) {
    //             person.balance += creditorBalanceNotZero.balance;         
    //             const result = document.createElement("li");
    //             result.innerHTML = `${person.name} owes $${Math.abs(creditorBalanceNotZero.balance).toFixed(2)} to ${creditorBalanceNotZero.name}`;
    //             listOfResults.appendChild(result);
    //             creditorBalanceNotZero.balance = 0.01;
    //             console.log('case 3')
    //         }   

    //         else if (debtorLess){               
    //         // else if (person.balance >= 0 && Math.abs(person.balance) < creditorBalanceNotZero){               
    //             creditorBalanceNotZero.balance += (person.balance + 0.01);                
    //             const result = document.createElement("li");
    //             result.innerHTML = `${person.name} owes $${person.balance.toFixed(2)} to ${creditorBalanceNotZero.name}`;
    //             listOfResults.appendChild(result);
    //             person.balance = 0;
    //             console.log('case 4') 
    //         }
    //     })


// 1 --------------------------------------------------------------------

//     while( debtorBalance > 0.01){

//     creditors.forEach((creditor) => {
//     let amountOwed = Math.abs(creditor.balance);

//     const debtorGreater = debtors.find((debtor) => debtor.balance >= amountOwed);
//     const debtorLess = debtors.find((debtor) => debtor.balance < amountOwed);

//     if (debtorGreater && debtorGreater != 0 && amountOwed != 0) {
//         debtorGreater.balance = parseFloat((debtorGreater.balance - amountOwed).toFixed(2));
//         debtorBalance = parseFloat((debtorBalance - amountOwed).toFixed(2));
//         console.log("debtorGreater balance:", debtorGreater.balance, "-", amountOwed);
//         creditor.balance = 0;
//         console.log("debtorBalance (greater):", debtorBalance)
//         const result = document.createElement("li");
//         result.innerHTML = `${debtorGreater.name} owes $${amountOwed} to ${creditor.name}`;
//         listOfResults.appendChild(result);
//     }

//     else if (debtorLess && debtorLess != 0 && amountOwed != 0) {    
        
//         creditor.balance = parseFloat((creditor.balance + debtorLess.balance).toFixed(2));           
//         const result = document.createElement("li");
//         result.innerHTML = `${debtorLess.name} owes $${debtorLess.balance} to ${creditor.name}`;
//         listOfResults.appendChild(result);
//         debtorLess.balance = 0;  
//         debtorBalance = parseFloat((debtorBalance - debtorLess.balance).toFixed(2));
//         console.log("debtorBalance:", debtorBalance)
//         }  
//     });
// }
//     });


// 2 -------------------------------------------------------------------

// Adding event listener for Calculate button
// btnCalculate.addEventListener("click", () => {
//     const equalAmount = total / arrOfEntries.length;
//     arrOfEntries.forEach( e => e.balance = equalAmount - e.amount )
//     console.log(arrOfEntries);
//     let owed = 0;
//     for(let i = 0; i < arrOfEntries.length-1; i++){
//         for(let j = 1; j < arrOfEntries.length; j++){
//             if (arrOfEntries[i].balance < 0 && Math.abs(arrOfEntries[i].balance) < arrOfEntries[j].balance){
//                     owed = arrOfEntries[i].balance;
//                     arrOfEntries[j].balance += arrOfEntries[i].balance;
//                     arrOfEntries[i].balance = 0;
                
//                     const result = document.createElement("li");
//                     result.innerHTML = `${arrOfEntries[j].name} owes ${owed} to ${arrOfEntries[i].name}`
//                     listOfResults.appendChild(result)
//             }
//             else if(arrOfEntries[i].balance < 0 && Math.abs(arrOfEntries[i].balance) > arrOfEntries[j].balance){
//                     owed = arrOfEntries[j].balance;
//                     arrOfEntries[i].balance += arrOfEntries[j].balance;
//                     arrOfEntries[j].balance = 0; 
                    
//                     const result = document.createElement("li");
//                     result.innerHTML = `${arrOfEntries[j].name} owes ${owed} to ${arrOfEntries[i].name}`
//                     listOfResults.appendChild(result)
//             }
//             else if(arrOfEntries[j].balance < 0 && Math.abs(arrOfEntries[j].balance) > arrOfEntries[i].balance){
//                 owed = arrOfEntries[i].balance;
//                 arrOfEntries[j].balance += arrOfEntries[i].balance;
//                 arrOfEntries[i] = 0;

//                 const result = document.createElement("li");
//                 result.innerHTML = `${arrOfEntries[i].name} owes ${owed} to ${arrOfEntries[j].name}`
//                 listOfResults.appendChild(result)
//             }
//             else if(arrOfEntries[j].balance < 0 && Math.abs(arrOfEntries[j].balance) < arrOfEntries[i].balance){
//                 owed = arrOfEntries[j].balance;
//                 arrOfEntries[j].balance += arrOfEntries[i].balance;
//                 arrOfEntries[j] = 0;

//                 const result = document.createElement("li");
//                 result.innerHTML = `${arrOfEntries[i].name} owes ${owed} to ${arrOfEntries[j].name}`
//                 listOfResults.appendChild(result)
//             }

//         }
        
//     }

// })


