const btnEle = document.getElementsByClassName("number");
const inputEle = document.getElementById("result");
const clearButton = document.getElementById("clear");
const operatorButtons = document.getElementsByClassName("operator");
const equalButton = document.getElementById("equals");
const decimalButton = document.getElementsByClassName("decimal");

let currentOperator = null;
let firstOperand = '';
let secondOperand = '';
let isOperatorClicked = false;

// Clear button handler
clearButton.addEventListener('click', () => {
    inputEle.value = '';
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    isOperatorClicked = false;
});
// Append number to the input field
function appendValue(value) {
    if (isOperatorClicked) {
        inputEle.value = '';
        isOperatorClicked = false;
    }
    inputEle.value += value;
}
// Number button event listeners
for (let i = 0; i < btnEle.length; i++) {
    btnEle[i].addEventListener("click", () => {
        const btnValue = btnEle[i].textContent;
        appendValue(btnValue);
    });
}
// Operator button event listeners
for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        if (inputEle.value === '') return;
        if (currentOperator !== null) {
            secondOperand = inputEle.value;
            inputEle.value = calculateResult();
            firstOperand = inputEle.value;
            secondOperand = '';
        } else {
            firstOperand = inputEle.value;
        }
        currentOperator = operatorButtons[i].textContent;
        isOperatorClicked = true;
    });
}
// Equal button event listener
equalButton.addEventListener('click', () => {
    if (firstOperand === '' || currentOperator === null) return;
    secondOperand = inputEle.value.split('').pop();
    inputEle.value = calculateResult();
    firstOperand = inputEle.value;
    secondOperand = '';
    currentOperator = null;
    isOperatorClicked = false;
});
// Function to perform the calculation based on the operator
function calculateResult() {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);
    let result;
    switch (currentOperator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                alert("Cannot divide by zero");
                result = 'Error';
            } else {
                result = num1 / num2;
            }
            break;
        default:
            return '';
    }
    return result;
}









