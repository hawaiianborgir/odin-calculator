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
    if (b == 0) {
        alert("Error: Division by 0");
    } else {
        return a / b;
    }
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
let consecutive = 0; // consecutive operator indicator
let newDigit = 0; // if result is already displayed, it will show new number on the next number push
let isCommaClicked = 0;

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const compute = document.querySelector(".compute");
const clear = document.querySelector(".clear");
const output = document.querySelector("output");
const comma = document.querySelector(".comma");
const backspace = document.querySelector(".backspace");

// const isDisplayZero = output.textContent == 0;
// const isOutputSameAsFirstNumber = firstNumber === +output.textContent;
// const startNewDigit = newDigit == 1;

function displayNumbers() {
    numbers.forEach((number) => {
        number.addEventListener("click", (e) => {
            //firstNumber === +output.textContent is to keep the display until the next group number is pushed.
            if( 
                firstNumber === +output.textContent || 
                newDigit == 1 ||
                (+output.textContent === 0 && isCommaClicked === 0)          
            ) {
                newDigit = 0;
                output.textContent = number.textContent;
            } else {
                output.textContent += `${number.textContent}`;
            }
        })
    })
}

function operatorButtons() {
    operators.forEach((operator) => {
        operator.addEventListener("click", (e) => {
            if (sign != null) {
                console.log("==entering operatorButtons() in IF condition==")
                //if consecutive == 1, please refer to the consecutiveOperator()
                if (consecutive == 0) {
                    secondNumber = +output.textContent;
                    output.textContent = operate(sign, firstNumber, secondNumber);
                    newDigit = 1;
                    isCommaClicked = 0; 

                    firstNumber = +output.textContent;
                    secondNumber = null;
                    sign = operator.textContent
                }
            } else {
                sign = operator.textContent;
                firstNumber = +output.textContent;
                isCommaClicked = 0;
            }
        })
    })
}

function computeButton() {
    compute.addEventListener("click", (e) => {
        if (firstNumber == null) {
            alert("Press enter the number first")
        } else {
            secondNumber = +output.textContent;
            output.textContent = operate(sign, firstNumber, secondNumber);
            newDigit = 1;
            sign = null;
            isCommaClicked = 0;
        }
    })
}

function clearButton() {
    clear.addEventListener("click", (e) => {
        firstNumber = null;
        secondNumber = null;
        sign = null;
        output.textContent = 0;
        isCommaClicked = 0;
    })
}

function consecutiveOperator() {
    operators.forEach((operator) => {
        operator.addEventListener("click", (e) => {
            if (consecutive == 0) {
                consecutive = 1;
            } else {
                // consecutive == 1
                alert("Please enter second number first");
            };
        })
    })

    numbers.forEach((number) => {
        number.addEventListener("click", (e) => {
            if (consecutive == 1) {
                consecutive = 0
            }
        })
    })
}

function commaButton() {
    comma.addEventListener("click", (e) => {
        if(isCommaClicked === 0) {
            output.textContent += `${comma.textContent}`
            isCommaClicked = 1;
        } else {
            // if isCommaClicked == 1
            e.preventDefault()
        }
    })
}

function backspaceButton() {
    backspace.addEventListener("click", (e) => {
        output.textContent = output.textContent.slice(0, -1);
    })
}

//Keyboard Support
const buttons = document.querySelectorAll("button");

const buttonData = []
buttons.forEach((button) => {
    buttonData.push(button.dataset.key)
})

function keyboardSupport() {
    document.addEventListener("keydown", (e) => {
        const keyValue = e.key.toLowerCase()
        const autoClick = document.querySelector(`[data-key="${e.key.toLowerCase()}"]`).click()
        
        if(buttonData.includes(keyValue)) {autoClick}
    })
}





console.log(buttonData)

displayNumbers();
operatorButtons();
computeButton();
clearButton();
consecutiveOperator();
commaButton();
backspaceButton();
keyboardSupport();

//to do: operator -> equal error
//to do: if output shows result clear on number
//to do: use strict equality