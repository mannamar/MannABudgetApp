// Amardeep Mann
// 2-14-23
// Budget App
// We made a fully functional budgeting app for desktop and mobile that keeps track of your monthly budget and expenses

import { saveToLocalStorage, getLocalStorage } from "./localStorage.js";

let data = getLocalStorage();
let pieChart;

let enterBudgInput = document.getElementById('enterBudgInput');
let submitBudgBtn = document.getElementById('submitBudgBtn');
let budgTxt = document.getElementById('budgTxt');
let expTxt = document.getElementById('expTxt');
let expNameInp = document.getElementById('expNameInp');
let expAmtInp = document.getElementById('expAmtInp');
let addExpBtn = document.getElementById('addExpBtn');
let expCont = document.getElementById('expCont');
let myChart = document.getElementById('myChart');

submitBudgBtn.addEventListener('click', submit);
enterBudgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submit();
    }
});

function submit() {
    if (enterBudgInput.value) {
        budgTxt.textContent = `Your budget: $${enterBudgInput.value}`;
        data.budget = parseInt(enterBudgInput.value);
        console.log(data);
        populateTotalExp();
        submitBudgBtn.textContent = 'Update';
    }
}

function calcAndPopulate() {
    populateExpenses();
    calcExpenses();
    populateTotalExp();
    saveToLocalStorage(data);
    if (data.expenses.length > 0) {
        makeChart();
    } else {
        // Destroy!!! pie CHart if no values
        if (pieChart) {
            pieChart.destroy();
        }
    }
};

addExpBtn.addEventListener('click', addExpense);
expNameInp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addExpense();
    }
});
expAmtInp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addExpense();
    }
});

function addExpense() {
    if (expNameInp.value && expAmtInp.value) {
        let expense = {
            name: (expNameInp.value[0].toUpperCase() + expNameInp.value.slice(1)),
            amount: expAmtInp.value
        }
        data.expenses.push(expense);
        calcAndPopulate();
        expNameInp.value = '';
        expAmtInp.value = '';
        expNameInp.focus();
    }
}

function populateExpenses() {
    // data.expenses.sort( (item1, item2) => item2.amount - item1.amount);
    let expenses = data.expenses;
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
            calcAndPopulate();
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
    data.totalExp = totalExp;
}

function populateTotalExp() {
    expTxt.textContent = `Total expenses: $${data.totalExp}`;
    resultTxt.textContent = `Your budget is exactly equal to your monthly expenses`;
    if (data.totalExp < data.budget) {
        resultTxt.textContent = `You are $${data.budget - data.totalExp} under your monthly budget`;
        resultTxt.classList.add('green');
        resultTxt.classList.remove('red');
    } else if (data.totalExp > data.budget) {
        resultTxt.textContent = `You are $${data.totalExp - data.budget} over your monthly budget`;
        resultTxt.classList.add('red');
        resultTxt.classList.remove('green');
    } else {
        resultTxt.classList.remove('red');
        resultTxt.classList.remove('green');
    }
}

function makeChart() {
    // let xValues = ["Food", "Rent", "Cat"];
    // let yValues = [200, 1000, 5000];
    // let barColors = [
    // "#b91d47",
    // "#00aba9",
    // "#2b5797"
    // ];

    let xValues = [];
    let yValues = [];
    let barColors = [];

    for (let i = 0; i < data.expenses.length; i++) {
        let randomColor ='#' + (Math.random()*0xFFFFFF<<0).toString(16);
        xValues.push(data.expenses[i].name);
        yValues.push(parseInt(data.expenses[i].amount));
        barColors.push(randomColor);
    };

    if (pieChart) {
        pieChart.destroy();
    }
    pieChart = new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            title: {
            display: true,
            text: "Expenses Breakdown"
            }
        }
    });
}

// Populate fields at page start
calcAndPopulate();
if (data.budget) {
    budgTxt.textContent = `Your budget: $${data.budget}`;
}
enterBudgInput.value = data.budget;
if (enterBudgInput.value) {
    submitBudgBtn.textContent = 'Update';
}

if (data.expenses.length > 0) {
    makeChart();
}