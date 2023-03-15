
const btnAddEntry = document.getElementById("addEntry");
const btnCalculate = document.getElementById("Calculate");
const listOfEntries = document.getElementById("listOfEntries");
const totalSpentElement = document.getElementById("total");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");

const arrOfEntries = [];

btnAddEntry.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (!name || isNaN(amount)) {
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

    nameInput.value = "";
    amountInput.value = "";

});



