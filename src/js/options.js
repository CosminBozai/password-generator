const generatorOptions = {
  length: 8,
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
};

// Code related to the slider
const slider = document.querySelector("input[type='range']");
const lengthIndicator = document.querySelector("#length");

slider.value = generatorOptions.length;
lengthIndicator.textContent = generatorOptions.length;

slider.addEventListener("change", (e) => {
  generatorOptions.length = +e.target.value;
  lengthIndicator.textContent = generatorOptions.length;
});

// Code related to the checkboxes
const checkboxList = document.querySelectorAll("input[type='checkbox");

checkboxList.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    generatorOptions[e.target.name] = e.target.checked;
    console.log(generatorOptions);
  });
});

export default generatorOptions;
