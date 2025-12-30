let firstNumber = null
let secondNumber = null;
let sign = null;
let consecutive = 0; // consecutive operator indicator
let newDigit = 0; // if result is already displayed, it will show new number on the next number push
let isCommaClicked = 0;
let defaultDisplay = 0;

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const compute = document.querySelector(".compute");
const clear = document.querySelector(".clear");
const output = document.querySelector("output");
const comma = document.querySelector(".comma");
const backspace = document.querySelector(".backspace");


function add(a, b) {
    return limitDecimals(a + b);
}

function subtract(a, b) {
    return limitDecimals(a - b);
}

function multiply(a, b) {
    return limitDecimals(a * b);
}

function divide(a, b) {
    if (b === 0) {
        alert("Error: Division by 0");
        resetCalculator()
        clearActiveBtn()
        return 0
    } else {
        return limitDecimals(a/b)
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

function displayNumbers() {
    numbers.forEach((number) => {
        number.addEventListener("click", (e) => {
            //firstNumber === +output.textContent is to keep the display until the next group number is pushed.
            if( 
                firstNumber === +output.textContent || 
                newDigit === 1 ||
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
            if (sign !== null) {
                //if consecutive === 1, please refer to the consecutiveOperator()
                if (consecutive === 0) {
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
        if (firstNumber === null) {
            alert("Press enter the number first")
        } else {
            secondNumber = +output.textContent;
            output.textContent = operate(sign, firstNumber, secondNumber);
            defaultDisplay = 1;
            newDigit = 1;
            sign = null;
            isCommaClicked = 0;
            clearActiveBtn();
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
        clearActiveBtn()
    })
}



function consecutiveOperator() {
    operators.forEach((operator) => {
        operator.addEventListener("click", (e) => {
            if (consecutive === 0) {
                consecutive = 1;
            } else {
                // consecutive == 1
                alert("Please enter second number first");
            };
        })
    })

    numbers.forEach((number) => {
        number.addEventListener("click", (e) => {
            if (consecutive === 1) {
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
        if(output.textContent.length === 1) {
            output.textContent = 0;
        } else if(+output.textContent === 0 ) {
            e.preventDefault();
        } else {
        output.textContent = output.textContent.slice(0, -1);
        }
    })
}

//Keyboard Support
const buttons = document.querySelectorAll("button");

const buttonData = []
buttons.forEach((button) => {
    buttonData.push(button.dataset.key)
})

function clickButton(key) {
    const clickIt = document.querySelector(`[data-key="${key.toLowerCase()}"]`).click();
    return clickIt;
}
function clickEnter() {
    const clickIt = document.querySelector(`[data-key="="]`).click();
    return clickIt;
}

function keyboardSupport() {
    document.addEventListener("keydown", (e) => {
        const keyValue = e.key.toLowerCase();
       
        if(buttonData.includes(keyValue)) {
            clickButton(keyValue)
        }
        else if (keyValue === "enter") {
            clickEnter()
        }
    })
}

// Visual Effect for Keyboard

const operatorData = [];
operators.forEach((button) => {
    operatorData.push(button.dataset.key)
});

let activeBtn = null;

function keyboardVisual() {
    
    document.addEventListener("keydown", (e) => {
        const keyValue = e.key.toLowerCase();

        if(buttonData.includes(keyValue)) {
            activeBtn = document.querySelector(`[data-key="${keyValue}"]`);
            activeBtn?.classList.add('is-active');
        } else if (keyValue === "enter") {
            activeBtn = document.querySelector(`[data-key="="]`);
            activeBtn?.classList.add('is-active');
        }
    })

    document.addEventListener("keyup", (e) => {
        activeBtn?.classList.remove("is-active");
    })
}

// function keyboardVisual() {
    
//     document.addEventListener("keydown", (e) => {
//         const keyValue = e.key.toLowerCase();
//         const isOperator = operatorData.includes(keyValue);

//         if(buttonData.includes(keyValue) && !isOperator) {
//             activeBtn = document.querySelector(`[data-key="${keyValue}"]`);
//             activeBtn?.classList.add('is-active');
//         } else if (isOperator) {
//             activeOpr = document.querySelector(`[data-key="${keyValue}"]`);
//             activeOpr?.classList.add("is-active");
//         } else if (keyValue === "enter") {
//             activeBtn = document.querySelector(`[data-key="="]`);
//             activeBtn?.classList.add('is-active');
//         }
//     })

//     document.addEventListener("keyup", (e) => {
//         activeBtn?.classList.remove("is-active");
//     })

//     numbers.forEach((number) => {
//         number.addEventListener("click", (e) => {
//             activeOpr?.classList.remove("is-active")
//         })
//     })
// }

// Additional Support Function 
function resetCalculator() {
    firstNumber = null;
    secondNumber = null;
    sign = null;
    output.textContent = 0;
    isCommaClicked = 0;
}

function clearActiveBtn() {
    document
    .querySelectorAll(".is-active")
    .forEach(button => button.classList.remove("is-active"));
}

function limitDecimals(num) {
    return Math.round(num * 10**2) / 10**2
}

displayNumbers();
operatorButtons();
computeButton();
clearButton();
consecutiveOperator();
commaButton();
backspaceButton();
keyboardSupport();
keyboardVisual();

//to do: operator -> equal = error
//to do: equal after result will delete all display
//to do: limit the display