const card = document.querySelector('.card');

function validateInput() {
  const fName = document.getElementById('fName');
  const lName = document.getElementById('lName');
  const address = document.getElementById('address');
  const message = document.querySelector("#message");

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
      message.innerHTML = "Minimum of 10 and maximum of 50 characters for address.";
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


card.addEventListener('submit', (event) => {
  if (!validateInput()) {
    event.preventDefault();
  }
});
