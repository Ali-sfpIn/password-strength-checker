"use strict";
// SELECTIONS...
const passwordInp = document.querySelector("input");
const strengthRange = document.querySelector(".strength-range");
// STATE VARIABLE...
const state = {
  lowerEffect: true,
  numEffect: true,
  symEffect: true,
  upperEffect: true,
  0: "nonsense!",
  25: "weak",
  50: "not-bad",
  75: "keep-the-great-job",
  100: "respect!",
};
let width = 0;
let password;
// FUNCTIONS...
const widthHandler = function (effectType, sign) {
  sign === "+" ? (width += 25) : (width -= 25);
  state[effectType] = sign === "+" ? false : true;
};

const barHandler = function (width) {
  strengthRange.style.color = width > 0 ? "white" : "black";
  strengthRange.style.width = `${width}%`;
  strengthRange.textContent = state[width];
};

// EVENT HANDLERS...
passwordInp.addEventListener("input", function (e) {
  const symbolForm = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  password = e.target.value;
  if (/[a-z]/.test(password) && state.lowerEffect)
    widthHandler("lowerEffect", "+");
  if (/\d/.test(password) && state.numEffect) widthHandler("numEffect", "+");
  if (password.match(symbolForm) && state.symEffect)
    widthHandler("symEffect", "+");
  if (/[A-Z]/.test(password) && state.upperEffect)
    widthHandler("upperEffect", "+");
  barHandler(width);
});

passwordInp.addEventListener("keydown", function (e) {
  if (e.key !== "Backspace") return;
  if (!state.lowerEffect) widthHandler("lowerEffect", "-");
  if (!state.numEffect) widthHandler("numEffect", "-");
  if (!state.symEffect) widthHandler("symEffect", "-");
  if (!state.upperEffect) widthHandler("upperEffect", "-");
  barHandler(width);
});
