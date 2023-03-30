import { Password, Options } from "./interfaces";
import { generatorOptions } from "./options";
import setStrength from "./strength";

{
  // Initial password
  const initialPassword: Password = { text: "P4$SW0RD", strength: 3 };

  const passwordEl = document.querySelector("#password") as HTMLDivElement;
  passwordEl.textContent = initialPassword.text;

  // Update the password
  const generateBtn = document.querySelector("#generate") as HTMLButtonElement;
  const errorMsg = document.querySelector(".error") as HTMLSpanElement;

  generateBtn.addEventListener("click", () => {
    errorMsg.textContent = "";

    const { uppercase, lowercase, numbers, symbols } = generatorOptions;

    if (uppercase || lowercase || numbers || symbols) {
      const newPassword = generatePassword(generatorOptions);
      passwordEl.textContent = newPassword.text;
      setStrength(newPassword);
    } else {
      errorMsg.textContent = "You must include at least 1 option";
    }
  });

  const copyPasswordBtn = document.querySelector(
    "#copy-btn"
  ) as HTMLButtonElement;
  const copyMsg = document.querySelector("#copy-message") as HTMLSpanElement;

  // Copy password to clipboard
  copyPasswordBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(passwordEl.textContent!);
      copyMsg.textContent = "COPIED";
      copyMsg.style.opacity = "1";
    } catch (err) {
      copyMsg.textContent = "COULD NOT COPY";
    }

    setTimeout(function hideMsg() {
      copyMsg.style.opacity = "0";
    }, 1700);
  });
}

function generatePassword(options: Options): Password {
  let charset = "";
  let text = "";

  // Generator options
  const { length, lowercase, uppercase, numbers, symbols } = options;
  const numberLength = +length;

  if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numbers) charset += "0123456789";
  if (symbols) charset += "~!@#$%^&*()_+-={}[]:;<>,./";

  for (let i = 0, n = charset.length; i < numberLength; i++) {
    text += charset.charAt(Math.floor(Math.random() * n));
  }

  // For the formula and explanation for calculating the strength of a random password check:
  // https://en.wikipedia.org/wiki/Password_strength

  // Calculate the total entropy
  let entropy: number = 0;

  if (numbers) entropy = numberLength * 3322;
  if (lowercase || uppercase || symbols) entropy = numberLength * 4700;

  if (
    (lowercase && uppercase) ||
    (lowercase && symbols) ||
    (uppercase && symbols)
  )
    entropy = numberLength * 5700;

  if ((numbers && lowercase) || (numbers && uppercase) || (numbers && symbols))
    entropy = numberLength * 5954;

  if (numbers && lowercase && uppercase && symbols)
    entropy = numberLength * 6555;

  // Calculate strength level based on entropy
  let strength = 0;
  if (entropy <= 55000) strength = 1;
  else if (entropy > 55000 && entropy <= 70000) strength = 2;
  else if (entropy > 70000 && entropy <= 80000) strength = 3;
  else if (entropy > 80000) strength = 4;

  return { text, strength };
}
