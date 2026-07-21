        const weightInput = document.getElementById("weightInput");
        const heightInput = document.getElementById("heightInput");

        const kg = document.getElementById("kg");
        const lbs = document.getElementById("lbs");
        const cm = document.getElementById("cm");
        const inch = document.getElementById("inch");
        const btn = document.getElementById("btn");

        const bmiPointer = document.getElementById("bmiPointer");
        const bmiOutput = document.getElementById("bmiOutput");
        const bmiCategory = document.getElementById("bmiCategory");

        const yourNeedOfWater = document.getElementById("YNOW_OUTPUT");
        const protin_OUTPUT = document.getElementById("protin_OUTPUT");
        const carb_OUTPUT = document.getElementById("carb_OUTPUT");
        const fat_OUTPUT = document.getElementById("fat_OUTPUT");



        // Radio button synchronization
        cm.addEventListener("change", () => { kg.checked = true; });
        inch.addEventListener("change", () => { lbs.checked = true; });
        kg.addEventListener("change", () => { cm.checked = true; });
        lbs.addEventListener("change", () => { inch.checked = true; });

        // ✅ Fixed gauge — maps BMI categories to correct pointer angles
        function updateGauge(bmi) {
            let degrees;
            let category;

            if (bmi < 16) {
                degrees = -90;                          // severely underweight → far left
                category = "Severely Underweight";
            } else if (bmi < 18.5) {
                degrees = -60;                          // underweight → left
                category = "Underweight";
            } else if (bmi < 25) {
                degrees = -15 + ((bmi - 18.5) / 6.5) * 30;  // normal → center (smooth)
                category = "Normal Weight ✅";
            } else if (bmi < 30) {
                degrees = 30 + ((bmi - 25) / 5) * 30;        // overweight → right (smooth)
                category = "Overweight ⚠️";
            } else if (bmi < 35) {
                degrees = 65;                           // obese → far right
                category = "Obese ";
            } else {
                degrees = 90;                           // severely obese → max right
                category = "Severely Obese ❌";
            }

            bmiPointer.style.transform = `translateX(-50%) rotate(${degrees}deg)`;
            bmiCategory.textContent = category;
        }

        btn.addEventListener("click", () => {
            const weight = Number(weightInput.value);
            const heightInputValue = Number(heightInput.value);

            if (weight <= 0 || heightInputValue <= 0) {
                bmiOutput.textContent = "Please enter valid values.";
                return;
            }

            let bmi;
            let height;
            let yrNeedOFwhater;

            let yrNeedOFsuger;

            let yrNeedOFProteinMin;
            let yrNeedOFfatMin;
            let yrNeedOFcarbMin;

            let yrNeedOFfatMaxfromcarb;
            let yrNeedOFfatMinfromcarb;

            let yrNeedOFProteinMax;
            let yrNeedOFfatMax;
            let yrNeedOFcarbMax;
if (kg.checked && cm.checked) {

    // BMI
    height = heightInputValue / 100;
    bmi = weight / (height * height);

    // water (ml/day → convert to L)
    yrNeedOFwhater = (weight * 30) / 1000;   // ✅ convert ml to L

    // protein (g/day)
    yrNeedOFProteinMin = weight * 1.4;
    yrNeedOFProteinMax = weight * 2.0;

    // fat per day (g/day)
    yrNeedOFfatMin = weight * 0.7;
    yrNeedOFfatMax = weight * 1.3;

    // fat from carb calories (g/day)
    yrNeedOFfatMinfromcarb = (weight * 30 * 0.20) / 9;   // ✅ no duplicate
    yrNeedOFfatMaxfromcarb = (weight * 30 * 0.35) / 9;

    // carbs (g/day) ✅ was missing
    yrNeedOFcarbMin = ((weight * 30) - 1000) / 4;
    yrNeedOFcarbMax = ((weight * 30) - 250)  / 4;
}
else if (lbs.checked && inch.checked) {


            // BMI
            height = heightInputValue;
            bmi = (weight * 703) / (height * height);

            // water (oz/day)
            yrNeedOFwhater = weight / 0.67;

            // protein (g/day)
            yrNeedOFProteinMin = weight * 0.636;   // 1.4g per kg = 0.636g per lbs
            yrNeedOFProteinMax = weight * 0.907;   // 2.0g per kg = 0.907g per lbs

            // fat per day (g/day)
            yrNeedOFfatMin = weight * 0.318;       // 0.7g per kg = 0.318g per lbs
            yrNeedOFfatMax = weight * 0.590;       // 1.3g per kg = 0.590g per lbs

            // fat from carb calories (g/day)
            yrNeedOFfatMinfromcarb = (weight * 13.6 * 0.20) / 9;   // min
            yrNeedOFfatMaxfromcarb = (weight * 13.6 * 0.35) / 9;   // max

            // carbs (g/day)
            yrNeedOFcarbMin = ((weight * 13.6) - 454) / 4;    // min
            yrNeedOFcarbMax = ((weight * 13.6) - 113) / 4;    // max
} else {
    bmiOutput.textContent = "Please select matching units (kg/cm or lbs/in)";
    return;
}
            
            let unitychanger;

            if (kg.checked) unitychanger= `L/DAY`;
            else unitychanger= `OZ/DAY`
                    updateGauge(bmi);
            bmiOutput.textContent = `BMI: ${bmi.toFixed(2)}`;
    
     
            yourNeedOfWater.textContent = 
                `the water you need: ${yrNeedOFwhater.toFixed(3) + unitychanger}`;
            protin_OUTPUT.innerHTML = `
                your needs of protein:<br>
                the minimum: ${yrNeedOFProteinMin.toFixed(2)} G/DAY<br>
                the maximum: ${yrNeedOFProteinMax.toFixed(2)} G/DAY`;

            carb_OUTPUT.innerHTML = `
                your needs of carbs:<br>
                the minimum: ${yrNeedOFcarbMin.toFixed(2)} G/DAY<br>
                the maximum: ${yrNeedOFcarbMax.toFixed(2)} G/DAY`;
                // the minimum: ${yrNeedOFfatMin.toFixed(3)} G/DAY<br>
                // the maximum: ${yrNeedOFfatMax.toFixed(3)} G/DAY
            fat_OUTPUT.innerHTML = `
                your needs of fat:<br>
                the minimum: ${yrNeedOFfatMin.toFixed(2)} G/DAY<br>
                the maximum: ${yrNeedOFfatMax.toFixed(2)} G/DAY<br>
                fat from carbs:<br>
                the minimum: ${yrNeedOFfatMinfromcarb.toFixed(2)} G/DAY<br>
                the maximum: ${yrNeedOFfatMaxfromcarb.toFixed(2)} G/DAY`;       

        });

        // initialize pointer at normal range
        updateGauge(22);
