// const { createElement } = require("react");

const weightInput = document.getElementById("weightInput");
const heightInput = document.getElementById("heightInput");

const kg = document.getElementById("kg");
const lbs = document.getElementById("lbs");

const cm = document.getElementById("cm");
const inch = document.getElementById("inch");

const btn = document.getElementById("btn");

cm.addEventListener("change", () => {
    kg.checked = true;
});

inch.addEventListener("change", () => {
    lbs.checked = true;
});

kg.addEventListener("change", () => {
    cm.checked = true;
});

lbs.addEventListener("change", () => {
    inch.checked = true;
});

btn.addEventListener("click", () => {

    const weight = Number(weightInput.value);
const heightCm = Number(heightInput.value);
const height = heightCm / 100;


    console.log("Weight:", weight);
console.log("Height:", height);
console.log("KG checked:", kg.checked);
    if (weight <= 0 || height <= 0) {
        document.querySelector(".output").textContent = 
            "Please enter valid values.";
        return;
    }

    let bmi;

    if (kg.checked) {
        bmi = weight / (height * height);
    } else {
        bmi = (weight * 703) / (height * height);
    }

    document.querySelector(".output").textContent =
        `BMI: ${bmi.toFixed(2)}`;
});


console.log("JS loaded");