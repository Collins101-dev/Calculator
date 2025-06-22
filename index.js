function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function division(num1, num2){
    return num1 / num2
}




let currentInput = "";
let firstOperand = null;
let currentOperator = null;
let resetNextInput = false;

const display = document.getElementById("display");
const numButtons = document.querySelectorAll(".nums");
const opButtons = document.querySelectorAll(".ops");
const equalButton = document.querySelector(".equal");
const decimalButton = document.querySelector(".decimal");
const clearButton = document.querySelector(".clear");


function updateDisplay() {
    if (firstOperand !== null && currentOperator !== null) {
        display.textContent = `${firstOperand} ${currentOperator} ${currentInput}`;
    } else {
        display.textContent = currentInput || "0";
    }
}


// Number buttons
numButtons.forEach((btn, i) => {
    btn.textContent = (i === 9) ? "0" : `${i + 1}`;
    btn.addEventListener("click", () => {
        if (resetNextInput) {
            currentInput = "";
            resetNextInput = false;
        }
        if (currentInput === "0") currentInput = "";
        currentInput += btn.textContent;
        updateDisplay();

    });
});

// Operator buttons
opButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentInput === "") return;

        const inputNum = parseFloat(currentInput);

        if (firstOperand === null) {
            firstOperand = inputNum;
        } else if (!resetNextInput) {
            firstOperand = operate(firstOperand, inputNum, currentOperator);
        }

        currentOperator = button.textContent;
        resetNextInput = true;
        currentInput = ""; // ✅ clear it here

        updateDisplay();
    });
})


// Equal button
equalButton.addEventListener("click", () => {
    if (firstOperand === null || currentInput === "" || currentOperator === null) return;

    const secondOperand = parseFloat(currentInput);
    const result = operate(firstOperand, secondOperand, currentOperator);

    // Handle divide-by-zero or other errors
    if (result === "Error") {
        display.textContent = result;
        currentInput = "";
        firstOperand = null;
        currentOperator = null;
        resetNextInput = true;
        return;
    }

    // ✅ Limit to 12 significant digits & remove trailing zeroes
    const formatted = Number(result).toPrecision(12).replace(/\.?0+$/, "");

    currentInput = formatted;
    firstOperand = null;
    currentOperator = null;
    resetNextInput = true;

    updateDisplay();
});



// Decimal button
decimalButton.addEventListener("click", () => {
    if (resetNextInput) {
        currentInput = "0";
        resetNextInput = false;
    }
    if (!currentInput.includes(".")) {
        currentInput += (currentInput === "") ? "0." : ".";
        updateDisplay();
    }
});

// Clear button
clearButton.addEventListener("click", () => {
    currentInput = "";
    firstOperand = null;
    currentOperator = null;
    resetNextInput = false;
    updateDisplay();
});

// Math operations
function operate(a, b, operator) {
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return b !== 0 ? division(a, b) : "Error";
        default: return b;
    }
}

// TO ADD KEYBOARD USAGE