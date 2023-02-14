import { saveToLocalStorage, getLocalStorage } from "./localStorage.js";

let data = {
    budget: 0,
    expenses: [],
    totalExp: 0
};

let enterBudgInput = document.getElementById('enterBudgInput');
let submitBudgBtn = document.getElementById('submitBudgBtn');
let budgTxt = document.getElementById('budgTxt');
let expTxt = document.getElementById('expTxt');
let expNameInp = document.getElementById('expNameInp');
let expAmtInp = document.getElementById('expAmtInp');
let addExpBtn = document.getElementById('addExpBtn');
let expCont = document.getElementById('expCont');

submitBudgBtn.addEventListener('click', function() {
    budgTxt.textContent = `Your budget: $${enterBudgInput.value}`;
    data.budget = parseInt(enterBudgInput.value);
    console.log(data);
    populateTotalExp();
    submitBudgBtn.textContent = 'Update';
});

addExpBtn.addEventListener('click', function() {
    if (expNameInp.value && expAmtInp.value) {
        let expense = {
            name: expNameInp.value,
            amount: expAmtInp.value
        }
        data.expenses.push(expense);
        console.log(data);
        populateExpenses();
        calcExpenses();
        populateTotalExp();
        expNameInp.value = '';
        expAmtInp.value = '';
    }
});

function populateExpenses() {
    let expenses = data.expenses;
    console.log(expenses);
    expCont.innerHTML = '';
    for (let i = 0; i < expenses.length; i++) {
        let thisExpense = expenses[i];
        let row = document.createElement('div');
        row.classList.add('expRow', 'row');
        let col1 = document.createElement('div');
        col1.classList.add('col-4');
        let col2 = document.createElement('div');
        col2.classList.add('col-4');
        let col3 = document.createElement('div');
        col3.classList.add('col-4');
        let name = document.createElement('h4');
        name.textContent = thisExpense.name + ':';
        let amount = document.createElement('h4');
        amount.textContent = '$' + thisExpense.amount;
        let btn = document.createElement('button');
        btn.textContent = 'X';
        btn.classList.add('delBtn', 'btn', 'btn-danger');
        btn.type = 'button';
        btn.addEventListener('click', function() {
            data.expenses.splice(i, 1);
            populateExpenses();
            calcExpenses();
            populateTotalExp();
        });

        col1.append(name);
        col2.append(amount);
        col3.append(btn);
        row.append(col1, col2, col3);
        expCont.append(row);
    }
};

function calcExpenses() {
    let expenses = data.expenses;
    let totalExp = 0;
    for (let i = 0; i < expenses.length; i++) {
        let thisExp = expenses[i];
        totalExp += parseInt(thisExp.amount);
    }
    console.log(totalExp);
    data.totalExp = totalExp;
}

function populateTotalExp() {
    expTxt.textContent = `Total expenses: $${data.totalExp}`;
    resultTxt.textContent = `Your budget is exactly equal to your monthly expenses`;
    if (data.totalExp < data.budget) {
        resultTxt.textContent = `You are $${data.budget - data.totalExp} under your monthly budget`;
    } else if (data.totalExp > data.budget) {
        resultTxt.textContent = `You are $${data.totalExp - data.budget} over your monthly expenses`;
    }
}