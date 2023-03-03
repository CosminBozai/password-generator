import { setPassword, generatePassword } from "./password";
import generatorOptions from "./options";
import setStrength from "./strength";

const generateBtn = document.querySelector("#generate");
const errorMsg = document.querySelector(".error");

generateBtn.addEventListener("click", () => {
  errorMsg.textContent = "";

  const { uppercase, lowercase, numbers, symbols } = generatorOptions;

  if (uppercase || lowercase || numbers || symbols) {
    const newPassword = generatePassword(generatorOptions);
    setPassword(newPassword);
    setStrength(newPassword);
  } else {
    errorMsg.textContent = "You must include at least 1 option";
  }
});
