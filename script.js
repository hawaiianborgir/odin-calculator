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

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const compute = document.querySelector(".compute");
const clear = document.querySelector(".clear");
const output = document.querySelector("output")

const isDisplayZero = output.textContent == 0;
const isOutputSameAsFirstNumber = firstNumber === +output.textContent;
const startNewDigit = newDigit == 1;

function displayNumbers() {
    numbers.forEach((number) => {
        number.addEventListener("click", (e) => {
            //firstNumber === +output.textContent is to keep the display until the next group number is pushed.
            if (
                isDisplayZero || 
                isOutputSameAsFirstNumber || 
                startNewDigit
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
                if (consecutive == 0) {
                    secondNumber = +output.textContent;
                    output.textContent = operate(sign, firstNumber, secondNumber);
                    newDigit = 1; 
                    
                    console.log(`First: ${firstNumber}`);
                    console.log(`Second: ${secondNumber}`);
                    console.log(`Sign: ${sign}`);
                    console.log(`Output: ${output.textContent}`);
                    console.log("==operatorButtons() IF computing...==");

                    firstNumber = +output.textContent;
                    secondNumber = null;
                    sign = operator.textContent

                    console.log(`First: ${firstNumber}`);
                    console.log(`Second: ${secondNumber}`);
                    console.log(`Sign: ${sign}`);
                    console.log(`Output: ${output.textContent}`)
                }
                
                
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
            newDigit = 1;
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
        console.log("==entering clearButton()==")

        firstNumber = null;
        secondNumber = null;
        sign = null;
        output.textContent = 0;

        console.log(`computeFirst: ${firstNumber}`);
        console.log(`computeSecond: ${secondNumber}`);
        console.log(`computeSign: ${sign}`);
        console.log(`Output: ${output.textContent}`)
    })
}

function consecutiveOperator() {
    operators.forEach((operator) => {
        operator.addEventListener("click", (e) => {
            if (consecutive == 0) {
                consecutive = 1
                console.log(`consecutive UP: ${consecutive}`)
            } else {
                // consecutive == 1
                alert("Please enter second number first");
                console.log("consecutive alert")
            };
        })
    })

    numbers.forEach((number) => {
        number.addEventListener("click", (e) => {
            if (consecutive == 1) {
                consecutive = 0
                console.log(`consecutive DOWN: ${consecutive}`)
            }
        })
    })

}


displayNumbers()
operatorButtons()
computeButton()
clearButton()
consecutiveOperator()

//to do: operator -> equal error
//to do: if output shows result clear on number
