"use strict";

let store = [];
let firstSign;
let secondSign = false;
const input = document.getElementById("calc-input");

// Tentative updateStore function...

function inputNumber(num) {
  // If it's the first number to be added, or, if it's the second number to be added with any sign
    // in between.
  if (store.length === 0 || store.length === 1 && ( firstSign )) {
    store.push(num);
    // If it's only the first number, just display it.
    if (store.length === 1) {
      input.value = num;
    } else {
    // If it's the second number, add it to the input already displayed.
      input.value += num;
      secondSign = true;
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
    secondSign = true;
  }
}

// Will do the approp. calculation and clean up the store.
function runCalc(sign) {
  if (sign === "+") {
    store[0] = Number(store[0]) + Number(store[1]);
  } else if (sign === "-") {
    store[0] = Number(store[0]) - Number(store[1]);
  } else if (sign === "x") {
    store[0] = Number(store[0]) * Number(store[1]);
  } else if (sign === "/") {
    store[0] = Number(store[0]) / Number(store[1]);
  }
  firstSign = false;
  secondSign = false;
  store.pop();
  input.value = store[0];
}

function inputSign(sign) {
  if (sign === "c") {
    firstSign = false;
    input.value = '';
    store = [];
  } else if (sign === "=" || sign === "Enter") {
    runCalc(input.value.substring(1, input.value.length - 1));
  } else {
    if (store.length === 0) {
      store[0] = 0;
    }
    if (secondSign === true) {
      runCalc(sign);
    }
    input.value = store[0] + sign;
    firstSign = true;
  }
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
document.getElementById("one").addEventListener("click", () => { inputNumber(1) });
document.getElementById("two").addEventListener("click", () => { inputNumber(2) });
document.getElementById("three").addEventListener("click", () => { inputNumber(3) });
document.getElementById("four").addEventListener("click", () => { inputNumber(4) });
document.getElementById("five").addEventListener("click", () => { inputNumber(5) });
document.getElementById("six").addEventListener("click", () => { inputNumber(6) });
document.getElementById("seven").addEventListener("click", () => { inputNumber(7) });
document.getElementById("eight").addEventListener("click", () => { inputNumber(8) });
document.getElementById("nine").addEventListener("click", () => { inputNumber(9) });
document.getElementById("zero").addEventListener("click", () => { inputNumber(0) });
document.getElementById("add-button").addEventListener("click", () => { inputSign("+") });
document.getElementById("subtract-button").addEventListener("click", () => { inputSign("-") });
document.getElementById("multiply-button").addEventListener("click", () => { inputSign("x") });
document.getElementById("divide-button").addEventListener("click", () => { inputSign("/") });
document.getElementById("equals-button").addEventListener("click", () => { inputSign("=") });
document.getElementById("clear-button").addEventListener("click", () => { inputSign("c") });