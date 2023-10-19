// Also, refactor the functions to be strict in their functionality (input number only inputs numbers).

let store = [];
let calcViaSign = false;
let checked = false;
let addFlag, subFlag, multFlag, divFlag;
const input = document.getElementById("calc-input");

function inputNumber(num) {
  // If it's the first number to be added, or, if it's the second number to be added with any sign
    // in between.
  if (store.length === 0 || store.length === 1 && (addFlag || subFlag || multFlag || divFlag)) {
    // Add the number to the array.
    store.push(num);
    // If it's only the first number, just display it.
    if (store.length === 1) {
      input.value = num;
    } else {
    // If it's the second number, add it to the input already displayed.
      input.value += num;
      calcViaSign = true;
    }
  } else if (store.length === 1) {
    // Whenever a number button is pressed while a number is displayed, it adds to the displayed number.
      // First number.
    store[0] += "" + num;
    input.value = store[0];
  } else {
      // Second number.
    store[1] += "" + num;
    input.value += "" + num;
    calcViaSign = true;
  }
  // input.focus();
}

// Will be called only if a signFlag is set to true.
// Will do the approp. calculation and clean up the store.
function runCalc(sign) {
  if (sign === "+") {
    addFlag = false;
    store[0] = Number(store[0]) + Number(store[1]);
  } else if (sign === "-") {
    subFlag = false;
    store[0] = Number(store[0]) - Number(store[1]);
  } else if (sign === "x") {
    multFlag = false;
    store[0] = Number(store[0]) * Number(store[1]);
  } else if (sign === "/") {
    divFlag = false;
    store[0] = Number(store[0]) / Number(store[1]);
  }
  calcViaSign = false;
  store.pop();
  input.value = store[0];
}

function inputSign(sign) {
  if (sign === "+") {
    // If the new input sign shouldn't be displayed (when calcViaSign is true)... 
      // make an if ... else here instead.
    if (calcViaSign === true) {
      inputSign("=");
    }
    // Adds a zero to the front of the input when "+" is first input.
    if (store.length === 0) {
      store[0] = 0;
    }
    input.value = store[0] + "+";
    addFlag = true;
    subFlag = multFlag = divFlag = false;
  } else if (sign === "-") {
    if (calcViaSign === true) {
      inputSign("=");
    }
    if (store.length === 0) {
      store[0] = 0;
    }
  input.value = store[0] + "-";
  subFlag = true;
  addFlag = multFlag = divFlag = false;
  } else if (sign === "x") {
    if (calcViaSign === true) {
      inputSign("=");
    } 
    if (store.length === 0) {
      store[0] = 0;
    }
  input.value = store[0] + "x";
  multFlag = true;
  addFlag = subFlag = divFlag = false;
  } else if (sign === "/") {
    if (calcViaSign === true) {
      inputSign("=");
    }
    if (store.length === 0) {
      store[0] = 0;
    }
  input.value = store[0] + "/";
  divFlag = true;
  addFlag = subFlag = multFlag = false;
  } else if (sign === "=" || sign === "Enter") {
    if (addFlag === true) {
      runCalc("+");
    } else if (subFlag === true) {
      runCalc("-");
    } else if (multFlag === true) {
      runCalc("x");
    } else if (divFlag === true) {
      runCalc("/");
    }
  } else {
    calcViaSign = addFlag = subFlag = multFlag = divFlag = false;
    input.value = '';
    store = [];
  }
  // input.focus();
}

input.addEventListener("keyup", (event) => {
  let previousInput = input.value.substring(0, input.value.length - 1);
  if (event.key === "0" ||
      event.key === "1" ||
      event.key === "2" ||
      event.key === "3" ||
      event.key === "4" ||
      event.key === "5" ||
      event.key === "6" ||
      event.key === "7" ||
      event.key === "8" ||
      event.key === "9") {
        input.value = previousInput;
        inputNumber(Number(event.key));
  } else if (event.key === "+" ||
             event.key === "-" ||
             event.key === "x" ||
             event.key === "/" ||
             event.key === "=" ||
             event.key === "Enter") {
                input.value = previousInput;
                inputSign(event.key);
  }
})
document.getElementById("one").addEventListener("click", function() { inputNumber(1) });
document.getElementById("two").addEventListener("click", function() { inputNumber(2) });
document.getElementById("three").addEventListener("click", function() { inputNumber(3) });
document.getElementById("four").addEventListener("click", function() { inputNumber(4) });
document.getElementById("five").addEventListener("click", function() { inputNumber(5) });
document.getElementById("six").addEventListener("click", function() { inputNumber(6) });
document.getElementById("seven").addEventListener("click", function() { inputNumber(7) });
document.getElementById("eight").addEventListener("click", function() { inputNumber(8) });
document.getElementById("nine").addEventListener("click", function() { inputNumber(9) });
document.getElementById("zero").addEventListener("click", function() { inputNumber(0) });
document.getElementById("add-button").addEventListener("click", function() { inputSign("+") });
document.getElementById("subtract-button").addEventListener("click", function() { inputSign("-") });
document.getElementById("multiply-button").addEventListener("click", function() { inputSign("x") });
document.getElementById("divide-button").addEventListener("click", function() { inputSign("/") });
document.getElementById("equals-button").addEventListener("click", function() { inputSign("=") });
document.getElementById("clear-button").addEventListener("click", function() { inputSign("c") });