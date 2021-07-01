const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

/*const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];*/

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '' ){
        alert('Please add a text and a value');
    }else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

function generateID(){
    return Math.floor(Math.random() * 100000000)
}

function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}

function removeTransaction(id){
    console.log(transactions);
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
    console.log(transactions);
}

function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    const total = getTotal(amounts);
    const income = getTotal(amounts.filter(item => item > 0));
    const expense = getTotal(amounts.filter(item => item < 0));

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

function getTotal(arr){
    return Math.abs(arr.reduce((acc, item) => (acc += item), 0)).toFixed(2);
}

init();

form.addEventListener('submit', addTransaction);