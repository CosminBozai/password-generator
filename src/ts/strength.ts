import { Password } from "./interfaces";

const strengthLevelEl = document.querySelector(
  "#strength-level"
) as HTMLSpanElement;
const strengthIndicators = document.querySelectorAll(".indicator-el");

const setStrength = (password: Password) => {
  strengthIndicators.forEach((i) => (i.className = ""));

  let className = "";

  switch (password.strength) {
    case 1:
      strengthLevelEl.textContent = "TOO WEAK!";
      className = "too-weak";
      break;
    case 2:
      strengthLevelEl.textContent = "WEAK";
      className = "weak";
      break;
    case 3:
      strengthLevelEl.textContent = "MEDIUM";
      className = "medium";
      break;
    case 4:
      strengthLevelEl.textContent = "STRONG";
      className = "strong";
      break;
  }

  for (let i = 0; i < password.strength; i++) {
    strengthIndicators[i].className = className;
  }
};

export default setStrength;
