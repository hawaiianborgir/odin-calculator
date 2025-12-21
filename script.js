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

function operate(operator, a, b) {
    switch(operator) {
        case adding:
            add(a, b);
        case subtracting:
            subtract(a, b);
        case multiplying:
            multiply(a, b);
        case dividing:
            divide(a, b);
    }
}


let firstNumber;
let secondNumber;
let operator;

const numbers = document.querySelectorAll(".number");

const adding = document.querySelector(".adding");
const subtracting = document.querySelector(".subtracting");
const multiplying = document.querySelector(".multiplying");
const dividing = document.querySelector(".dividing");

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


displayNumbers()




