function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(sign, a, b) {
    switch(sign) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}


let firstNumber;
let secondNumber;
let sign;

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const compute = document.querySelector(".compute");
const clear = document.querySelector(".clear");
const output = document.querySelector("output")

function displayNumbers() {
    numbers.forEach((number) => {
        number.addEventListener("click", (e) => {
            output.textContent += `${number.textContent}`;
        })
    })
}
function operatorButtons() {
    operators.forEach((operator) => {
        operator.addEventListener("click", (e) => {
            sign = operator.textContent;
            firstNumber = +output.textContent;
            output.textContent = "";
        })
    })
}

function computeButton() {
    compute.addEventListener("click", (e) => {
        secondNumber = +output.textContent;
        output.textContent = operate(sign, firstNumber, secondNumber)
        console.log(firstNumber);
        console.log(secondNumber);
        console.log(sign);
        console.log(sign === "+")
    })
}


displayNumbers()
operatorButtons()
computeButton()



