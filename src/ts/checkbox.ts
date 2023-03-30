import { generatorOptions } from "./options";

const checkboxList = document.querySelectorAll("input[type='checkbox");

checkboxList.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      generatorOptions[target.name] = target.checked;
    }
  });
});
