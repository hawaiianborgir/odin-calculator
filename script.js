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
            if (output.textContent == 0) {
                output.textContent = number.textContent;
            } else if (firstNumber === +output.textContent) {
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

                secondNumber = +output.textContent;
                output.textContent = operate(sign, firstNumber, secondNumber);
                
                console.log(`First: ${firstNumber}`);
                console.log(`Second: ${secondNumber}`);
                console.log(`Sign: ${sign}`);
                console.log(`Output: ${output.textContent}`)
                console.log("==operatorButtons() IF computing...==")

                firstNumber = +output.textContent;
                sign = operator.textContent

                console.log(`First: ${firstNumber}`);
                console.log(`Second: ${secondNumber}`);
                console.log(`Sign: ${sign}`);
                console.log(`Output: ${output.textContent}`)
                
            } else {
                console.log("==entering operatorButtons() in ELSE condition==")

                sign = operator.textContent;
                firstNumber = +output.textContent;

                console.log(`First: ${firstNumber}`);
                console.log(`Second: ${secondNumber}`);
                console.log(`Sign: ${sign}`);
                console.log(`Output: ${output.textContent}`)
            }
        })
    })
}

function computeButton() {
    compute.addEventListener("click", (e) => {
        console.log("==entering computeButton()==")

        if (firstNumber == null) {
            alert("Press enter the number first")
        } else {
            secondNumber = +output.textContent;
            output.textContent = operate(sign, firstNumber, secondNumber);
            sign = null;
        }

        console.log(`computeFirst: ${firstNumber}`);
        console.log(`computeSecond: ${secondNumber}`);
        console.log(`computeSign: ${sign}`);
        console.log(`Output: ${output.textContent}`)
    })
}

function clearButton() {
    clear.addEventListener("click", (e) => {
        firstNumber = null;
        secondNumber = null;
        sign = null;
        output.textContent = 0;
    })
}


displayNumbers()
operatorButtons()
computeButton()

//to do: operator -> equal error

