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

                // bmi
                height = heightInputValue / 100;
                bmi = weight / (height * height);
                       //    whater
                yrNeedOFwhater = weight / 30 ;
                    //  Protein
                    //     For general :
                    //     For muscle building or if very active:
                       yrNeedOFProteinMax = weight * 1.4;//(minimum)
                      yrNeedOFProteinMin = weight * 2.0;//(maximum)

                    // fat
                    //    based on what u eat from carb
                      yrNeedOFfatMaxfromcarb = (weight * 30 * 0.20) / 9;//(minimum)
                      yrNeedOFfatMinfromcarb =  (weight * 30 * 0.35) / 9;;//(maximum)

                   // carb
                       
                    yrNeedOFcarbMin = ((weight * 30) - 1000) / 4;          // min carbs (grams)
                    yrNeedOFcarbMax = ((weight * 30) - 250) / 4; 
                    // max carbs in your naming (but note: this is actually fewer carbs)

                   // suger

            } else if (lbs.checked && inch.checked) {
                height = heightInputValue;
                                // bmi
                bmi = (weight * 703) / (height * height);

                       //    whater
                yrNeedOFwhater = weight / 0.67 ;

                                    //  Protein
                    //     For muscle building or if very active:
                      yrNeedOFProtein = weight * 0.36;//(minimum)
                      yrNeedOFProtein = weight *  1.0 ;//(maximum)
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
            protin_OUTPUT.textContent = 
               ` your needs of protin:\n
                the minimum:${yrNeedOFProteinMin.toFixed(3)} G/DAY\n
                the minimum:${yrNeedOFProteinMax.toFixed(3)} G/DAY.`;

            carb_OUTPUT.textContent = 
               `your needs of carb:\n
                the maximum:${yrNeedOFfatMin.toFixed(3)} G/DAY.\n
                the minimum: ${yrNeedOFfatMax.toFixed(3)} G/DAY.`;
                
            fat_OUTPUT.textContent = 
               `your needs of fat:\n
               the minimum:${yrNeedOFcarbMin.toFixed(3)} G/DAY.\n
               the maximum:${yrNeedOFcarbMax.toFixed(3)} G/DAY.\n
               in ever carb you eat how mutch it gonna be fat:\n
               the minimum:${yrNeedOFfatMaxfromcarb.toFixed(3)} G/DAY.\n
               the maximum:${yrNeedOFfatMinfromcarb.toFixed(3)} G/DAY.`;

        });

        // initialize pointer at normal range
        updateGauge(22);
