"use strict";

// Initial password
let password = { text: "P4$SW0RD", strength: 3 };

const passwordEl = document.querySelector("#password");
passwordEl.textContent = password.text;

const copyPasswordBtn = document.querySelector("#copy-btn");
const copyMsg = document.querySelector("#copy-message");

// Copy password to clipboard
copyPasswordBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(passwordEl.textContent);
    copyMsg.textContent = "COPIED";
    copyMsg.style.opacity = "1";
  } catch (err) {
    copyMsg.textContent = "COULD NOT COPY";
  }

  setTimeout(function hideMsg() {
    copyMsg.style.opacity = "0";
  }, 1700);
});

const generatePassword = ({
  length,
  uppercase,
  lowercase,
  numbers,
  symbols,
}) => {
  let charset = "";
  let text = "";
  //options
  if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numbers) charset += "0123456789";
  if (symbols) charset += "~!@#$%^&*()_+-={}[]:;<>,./";

  for (let i = 0, n = charset.length; i < length; i++) {
    text += charset.charAt(Math.floor(Math.random() * n));
  }

  // For the formula and explanation for calculating the strength of a random password check:
  // https://en.wikipedia.org/wiki/Password_strength

  // Calculate the total entropy in bits
  let entropy;

  if (numbers) entropy = length * 3322;
  if (lowercase || uppercase || symbols) entropy = length * 4700;

  if (
    (lowercase && uppercase) ||
    (lowercase && symbols) ||
    (uppercase && symbols)
  )
    entropy = length * 5700;

  if ((numbers && lowercase) || (numbers && uppercase) || (numbers && symbols))
    entropy = length * 5954;

  if (numbers && lowercase && uppercase && symbols) entropy = length * 6555;

  // Calculate strength level based on entropy
  let strength;
  console.log(entropy);
  if (entropy <= 55000) strength = 1;
  else if (entropy > 55000 && entropy <= 70000) strength = 2;
  else if (entropy > 70000 && entropy <= 80000) strength = 3;
  else if (entropy > 80000) strength = 4;

  return { text, strength };
};

const setPassword = (newPassword) => {
  password = newPassword;
  passwordEl.textContent = newPassword.text;
};

export { generatePassword, setPassword, password };
