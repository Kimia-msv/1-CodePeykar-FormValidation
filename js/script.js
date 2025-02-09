let $ = document;

const emailInput = $.querySelector('#email-input');
const passwordInput = $.querySelector('#password-input');
const confirmPassInput = $.querySelector('#confirm-password');

const emailContainer = $.querySelector('.email-container');
const passContainer = $.querySelector('.pass-container');
const confirmpassContainer = $.querySelector('.confirmpass-container');

const modal = $.querySelector('.modal');
const overlay = $.querySelector('.overlay');
const btnElem = $.querySelector(".signup-button");


function showModal(message) {
    modal.style.display = "block";
    overlay.style.display = "block";

    modal.innerHTML = `
        <ul style="list-style-type: none; margin: 10px; padding: 0">
        <li>${message.split("\n").join("</li><li>")}</li></ul>
    `;

    modal.classList.remove('hide')
    modal.classList.add('show');

    setTimeout(function () {
        modal.classList.add("hide");
        overlay.style.display = "none";
    }, 2000)
}

function validateInput(input, container, regex, errorMessage) {
    let inputValue = input.value;
    let regexResult = regex.test(inputValue);
    let icon = container.querySelector('.icon-container .icon');

    if (!inputValue) {
        container.style.border = "none";
        if (icon) icon.style.fill = "gray";
        return false;
    }

    if (!regexResult) {
        input.value = "";
        container.style.border = "1px solid red";
        if (icon) icon.style.fill = "gray";
        showModal(errorMessage);
        return false;
    } else {
        inputValue = input.value;
        container.style.border = "none";
        if (icon) icon.style.fill = " #ff4081"
        return true;
    }
}


function validateConfirmPassword(input, container) {
    let inputValue = input.value;
    let passwordValue = passwordInput.value;
    let icon = container.querySelector('.icon-container .icon');

    if (!inputValue) {
        container.style.border = "none";
        if (icon) icon.style.fill = "gray";
        return false;
    }

    if (inputValue !== passwordValue) {
        input.value = "";
        container.style.border = "1px solid red";
        if (icon) icon.style.fill = " gray"
        showModal("Password and confirm password must match.");
        return false;
    } else {
        container.style.border = "none";
        if (icon) icon.style.fill = " #ff4081";
        return true;
    }
}

emailInput.addEventListener('blur', () => {
    let emailRegex = /\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+/;
    validateInput(emailInput, emailContainer, emailRegex, "Please enter a valid email.")
})

passwordInput.addEventListener('blur', () => {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
    validateInput(passwordInput, passContainer, passwordRegex, "Password must be more than 8 characters. \n Include at least one uppercase letter, one lowercase letter. \n Include one symbol (@, #, $, %). \n Include one number.")
})

confirmPassInput.addEventListener('blur', () => {
    validateConfirmPassword(confirmPassInput, confirmpassContainer)
})

btnElem.addEventListener('click', (e) => {
    e.preventDefault();

    let emailIsValid = validateInput(emailInput, emailContainer,/\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+/, "Please enter a valid email.");

    let passwordIsValid = validateInput(passwordInput, passContainer, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/, "Password must be more than 8 characters \n Include at least one uppercase letter, one lowercase letter \n Include one symbol (@, #, $, %) \n Include one number.");

    let confirmpassIsValid = validateConfirmPassword(confirmPassInput, confirmpassContainer);


    if (emailIsValid && passwordIsValid && confirmpassIsValid) {
        showModal('You signed up successfully 😊')
    } else {
        showModal("Please fill the inputs")
    }
})