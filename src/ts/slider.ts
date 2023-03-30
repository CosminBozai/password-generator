import { generatorOptions } from "./options";

const slider = document.querySelector(
  "input[type='range']"
) as HTMLInputElement;
const lengthIndicator = document.querySelector("#length") as HTMLSpanElement;

// Initial values
slider.value = generatorOptions.length;
lengthIndicator.textContent = generatorOptions.length;

slider.addEventListener("change", (e: Event) => {
  const target = e.target as HTMLInputElement;
  generatorOptions.length = target.value;
  lengthIndicator.textContent = generatorOptions.length;
});
