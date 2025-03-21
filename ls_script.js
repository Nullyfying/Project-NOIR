const navArrow = document.querySelector('.nav-arrow');
const mainContainer = document.querySelector('.container');
const inputContainer = document.querySelector('.input-container');
const titleText = document.querySelector('.title-text');
const inputField = document.querySelector('.input-field');
const loginBtn = document.querySelector('.login-btn');
const errorMessage = document.querySelector('.error-message');
const loginMenu = document.querySelector('.login-menu');
let isInputActive = false;
let isCodeActivated = false;

if (localStorage.getItem('isCodeActivated') === 'true') {
    isCodeActivated = true;
    inputField.placeholder = 'Code activated permanently';
    inputField.classList.add('valid');
    inputField.disabled = true;
    updateNavArrowState();
}

function updateNavArrowState() {
    if (isCodeActivated && mainContainer.style.display === 'block') {
        navArrow.classList.add('disabled');
        navArrow.dataset.tooltip = '';
    } else {
        navArrow.classList.remove('disabled');
        navArrow.dataset.tooltip = isInputActive ? 'Back' : 'More';
    }
}

navArrow.addEventListener('click', () => {
    if (isCodeActivated) {
        loginMenu.style.display = 'none';
        mainContainer.style.display = 'block';
        inputContainer.style.display = 'none';
        titleText.textContent = 'NOIR_TERMINAL v1.0.4';
    } else {
        isInputActive = !isInputActive;
        mainContainer.style.display = isInputActive ? 'none' : 'block';
        inputContainer.style.display = isInputActive ? 'block' : 'none';
        titleText.textContent = isInputActive 
            ? inputField.dataset.terminal 
            : 'NOIR_TERMINAL v1.0.4';

        if (isInputActive) {
            setTimeout(() => inputField.focus(), 50);
            inputField.disabled = false;
        } else {
            inputField.placeholder = 'Enter access code...';
            inputField.classList.remove('valid', 'invalid');
        }
    }
    updateNavArrowState();
});

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !inputField.disabled) {
        const code = inputField.value.trim();
        inputField.value = '';
        
        inputField.disabled = true;
        
        if (code === 'loadstring.9821-xjvrplqa("activate-once")') {
            isCodeActivated = true;
            inputField.placeholder = 'Code activated permanently';
            inputField.classList.add('valid');
            inputField.disabled = true;

            localStorage.setItem('isCodeActivated', 'true');

            updateNavArrowState();
        } else {
            inputField.placeholder = 'Code does not exist.';
            inputField.classList.add('invalid');
            setTimeout(() => {
                inputField.placeholder = 'Enter access code...';
                inputField.classList.remove('invalid');
                inputField.disabled = false;
            }, 3000);
        }
    }
});

loginBtn.addEventListener('click', () => {
    if (isCodeActivated) {
        mainContainer.style.display = 'none';
        loginMenu.style.display = 'block';
        titleText.textContent = 'LOGIN_MENU';
    } else {
        loginBtn.disabled = true;
        loginBtn.classList.add('error');
        errorMessage.textContent = 'Code is not activated!';
        errorMessage.classList.add('show');

        setTimeout(() => {
            loginBtn.classList.remove('error');
            errorMessage.classList.remove('show');
            loginBtn.disabled = false;
        }, 2000);
    }
    updateNavArrowState();
});

updateNavArrowState();
