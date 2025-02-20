document.addEventListener('DOMContentLoaded', function() {

  const card = document.querySelector('.card');
  const fName = document.getElementById('fName');
  const lName = document.getElementById('lName');
  const ageInput = document.getElementById('age');
  const address = document.getElementById('address');
  const message = document.querySelector("#message");

  const inputs = document.querySelectorAll('input[data-counter]');
  const addressCounter = document.querySelectorAll('textarea[data-counter]');
  
  function validateInput() {
  
    if ((fName.value.length < 2 || fName.value.length > 15) && (lName.value.length < 2 || lName.value.length > 15)) {
      message.setAttribute("class", "error");
      message.innerHTML = "Minimum of 2 and maximum of 15 characters for first name and last name.";
      return false; // prevent form submit
    } else {
      if (!validateSpaces(fName.value) || !validateSpaces(lName.value) || !validateSpaces(address.value)) {
        message.setAttribute("class", "error");
        message.innerHTML = "Spaces are not allowed before and after the name and address.";
        return false;
      }
  
      if (hasSpecialCharacters(fName.value) || hasSpecialCharacters(lName.value)) {
        message.setAttribute("class", "error");
        message.innerHTML = "Special characters for name is not allowed.";
        return false;
      }
  
      if (address.value.length < 10 || address.value.length > 50) {
        message.setAttribute("class", "error");
        message.innerHTML = "Minimum of 10 and maximum of 150 characters for address.";
        return false;
      }
  
      if (validAddress(address.value)) {
        message.setAttribute("class", "error");
        message.innerHTML = "Only special characters allowed are hyphen, comma, period, and forward slash.";
        return false;
      }
  
      if (!containsNumber(address.value)) {
        message.setAttribute("class", "error");
        message.innerHTML = "Address should contain at least one number.";
        return false;
      }
  
      return true;
    }
  }
  
  function validateSpaces(input) {
    return !input.startsWith(" ") && !input.endsWith(" "); // check lang kung di nagstart or nagend sa space
  }
  
  function hasSpecialCharacters(input) {
    // List of special characters
    const specialCharacters = "0123456789!@#$%^&*()_+{}:\"<>?|[];,./~"; //removed apostrophe , hyphen, and backtick
  
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      // pag wala sa list, special character
      if (specialCharacters.includes(char)) {
        return true; 
      }
    }
    return false; 
  }
  
  function validAddress(input) {
    const specialCharacters = "!@#$%^&*()_+{}:\"<>?|[];~"; //removed numbers, comma, period, and forward slash
    
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      // pag wala sa list, special character
      if (specialCharacters.includes(char)) {
        return true; 
      }
    }
    return false; 
  }
  
  function containsNumber(input) {
    for (let i = 0; i < input.length; i++) {
      if (!isNaN(input[i])) { // check current character if it is a number
        return true;
      }
    }
  
    return false;
  }

  // age validation
  ageInput.addEventListener('input', function() {
    ageInput.value = ageInput.value.replace(/[^0-9]/g, ''); // remove non-numeric characters
  });

  // character counter for name
  inputs.forEach(input => {
   input.addEventListener('input', function() {
      const counter = document.querySelector(`#${input.id} + span`);
      // kung nag eexist yung counter
      if(counter) {
        counter.textContent = `${input.value.length}/50`;
      }

      input.classList.remove('valid'); // remove all classes
      
      if (input.value.length > 1 && input.value.length <= 50) {
        input.classList.add('valid'); // green (valid)
      }
    });

    
    input.addEventListener('keydown', function(e) {
      if (e.key === "Backspace" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Tab" || e.key === "Delete" || e.key === "Ctrl") {
        return; // allow these keys
      }

      if (input.value.length >= 50) {
        e.preventDefault();
      }
    });
  });

  // character counter for address
  addressCounter.forEach(input => {
    input.addEventListener('input', function() {
      const counter = document.querySelector(`#${input.id} + span`);
      if (counter) {
        counter.textContent = `${input.value.length}/150`;
      }

      if (input.value.length < 10) {
        address.style.borderColor = "#ff4545";
      } else {
        address.style.borderColor = "#00ff99";
      }
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === "Backspace" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Tab" || e.key === "Delete" || e.key === "Ctrl") {
        return; // allow these keys
      }

      if (input.value.length >= 150) {
        e.preventDefault();
      }
    });
  });
  
  card.addEventListener('submit', (event) => {
    if (!validateInput()) {
      event.preventDefault();
    }
  });

});

