// const { createElement } = require("react");

const weightInput = document.getElementById("weightInput");
const heightInput = document.getElementById("heightInput");

const kg = document.getElementById("kg");
const lbs = document.getElementById("lbs");

const cm = document.getElementById("cm");
const inch = document.getElementById("inch");

const btn = document.getElementById("btn");


const bmiInput = document.getElementById('bmiInput');
const bmiValueText = document.getElementById('bmiValue');
const bmiPointer = document.getElementById('bmiPointer');

const minBMI = 15;
const maxBMI = 35;
const minDegrees = -90;
const maxDegrees = 90;

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

 const currentBMI = parseFloat(bmiInput.value);
    bmiValueText.textContent = currentBMI;

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
        
    const percentage = (currentBMI - minBMI) / (maxBMI - minBMI);
    const targetDegrees = minDegrees + (percentage * (maxDegrees - minDegrees));

    /* FIX 2: The main problem was here - we need to properly set the transform
       with translateX first, then rotate, and ensure we're not overriding
       the transform-origin that's set in CSS */
    bmiPointer.style.transform = `translateX(-50%) rotate(${targetDegrees}deg)`;

});


console.log("JS loaded");



bmiInput.addEventListener('input', updateGauge);
updateGauge();