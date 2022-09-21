// Global Variables
let cardNumber = document.querySelector(".card-number");
let holderName = document.querySelector(".holder-name");
let month = document.querySelector(".month");
let year = document.querySelector(".year");
let cvc = document.querySelector(".cvc");
let form = document.querySelector(".payment-info");
let nameInput = document.querySelector("#holder-name");
let numberInput = document.querySelector("#card-number");
let monthInput = document.querySelector("#exp-month");
let yearInput = document.querySelector("#exp-year");
let cvcInput = document.querySelector("#cvc");
let allInputs = document.querySelectorAll("input:not(.submit)");
let expParent = document.querySelector(".exp-container");
let submit = document.querySelector(".submit");
let cont = document.querySelector(".continue");
let success = document.querySelector(".success");
// Holder Name
nameInput.oninput = (e) => {
  if (e.target.value !== "") {
    holderName.textContent = e.target.value;
  } else {
    holderName.textContent = "Jane Appleseed";
  }
};

// Card Number
numberInput.oninput = (e) => {
  if (e.target.value.match(/^\D/g)) {
    e.target.value = "";
  } else if (e.target.value !== "") {
    e.target.value = e.target.value
      .replace(/[^\d]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    cardNumber.textContent = e.target.value;
  } else {
    cardNumber.textContent = "0000 0000 0000 0000";
  }
};

// Expire Month
monthInput.oninput = (e) => {
  if (e.target.value.match(/^\D/g)) {
    e.target.value = "";
  } else if (e.target.value !== "") {
    e.target.value = e.target.value.replace(/[^\d]/g, "");
    month.textContent = e.target.value;
  } else {
    month.textContent = "00";
  }
  if (e.target.value > 12) {
    e.target.value = 12;
    month.textContent = e.target.value;
  }
};
monthInput.onchange = (e) => {
  if (e.target.value.length === 1 && e.target.value != 0) {
    e.target.value = "0" + e.target.value;
    month.textContent = e.target.value;
  }
};

// Expire Year
yearInput.oninput = (e) => {
  if (e.target.value.match(/^\D/g)) {
    e.target.value = "";
  } else if (e.target.value !== "") {
    e.target.value = e.target.value.replace(/[^\d]/g, "");
    year.textContent = e.target.value;
  } else {
    year.textContent = "00";
  }
};

// CVC
cvcInput.oninput = (e) => {
  if (e.target.value.match(/^\D/g)) {
    e.target.value = "";
  } else if (e.target.value !== "") {
    e.target.value = e.target.value.replace(/[^\d]/g, "");
    cvc.textContent = e.target.value;
  } else {
    cvc.textContent = "000";
  }
};

// Form Validation
let validation = true;
let errElements = document.querySelectorAll("input, .exp-container");
function removeErr() {
  errElements.forEach((el) => {
    el.classList.remove("empty-err", "length-err");
  });
  submit.classList.remove("err");
}
function emptyInputs() {
  allInputs.forEach((input) => {
    input.value = "";
  });
}
function defaultDetails() {
  holderName.textContent = "Jane Appleseed";
  cardNumber.textContent = "0000 0000 0000 0000";
  month.textContent = "00";
  year.textContent = "00";
  cvc.textContent = "000";
}
form.onsubmit = (e) => {
  e.preventDefault();
  validation = true;
  removeErr();
  allInputs.forEach((input) => {
    if (input.value === "") {
      input.classList.add("empty-err");
      if (input.parentElement.parentElement === expParent) {
        expParent.classList.add("empty-err");
      }
      validation = false;
    } else if (input.value.length < input.maxLength) {
      if (input !== nameInput) {
        input.classList.add("length-err");
        if (input.parentElement.parentElement === expParent) {
          expParent.classList.add("length-err");
        }
        validation = false;
      }
    }
  });
  if (validation) {
    form.style.display = "none";
    success.style.display = "flex";
    emptyInputs();
  } else {
    setTimeout(() => {
      submit.classList.add("err");
    }, 100);
  }
};

cont.onclick = () => {
  success.style.display = "none";
  form.style.display = "block";
  defaultDetails();
};
