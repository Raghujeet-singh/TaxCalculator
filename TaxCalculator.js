const calculateBtn = document.getElementById("calculate-btn");
const resultDiv = document.getElementById("result");
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];

// Hide error icons by default
const errorIcons = document.querySelectorAll(".error-icon");
errorIcons.forEach((icon) => (icon.style.display = "none"));

calculateBtn.addEventListener("click", calculateTax);

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function calculateTax() {
  const grossIncome = parseFloat(document.getElementById("gross-income").value);
  const extraIncome = parseFloat(document.getElementById("extra-income").value);
  const age = document.getElementById("age").value;
  const deductions = parseFloat(document.getElementById("deductions").value);

  let isValid = true;

  // Reset error icons
  errorIcons.forEach((icon) => (icon.style.display = "none"));

  // Validate input fields
  if (isNaN(grossIncome)) {
    isValid = false;
    document.querySelector("#gross-income + .error-icon").style.display =
      "inline-block";
  }

  if (isNaN(extraIncome)) {
    isValid = false;
    document.querySelector("#extra-income + .error-icon").style.display =
      "inline-block";
  }

  if (age === "") {
    isValid = false;
    document.querySelector("#age + .error-icon").style.display = "inline-block";
  }

  if (isNaN(deductions)) {
    isValid = false;
    document.querySelector("#deductions + .error-icon").style.display =
      "inline-block";
  }

  if (!isValid) {
    return;
  }

  const overallIncome = grossIncome + extraIncome - deductions;

  let taxAmount = 0;
  if (overallIncome > 800000) {
    const taxableAmount = overallIncome - 800000;
    let taxRate;

    if (age === "<40") {
      taxRate = 0.3;
    } else if (age === ">=40&<60") {
      taxRate = 0.4;
    } else {
      taxRate = 0.1;
    }

    taxAmount = taxableAmount * taxRate;
  }

  resultDiv.textContent = `Your tax amount is: ₹${taxAmount.toFixed(2)}`;
  modal.style.display = "block";
}
