const logregBox = document.querySelector(".logreg-box");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");

//when user clicks "register"
registerLink.addEventListener('click', () => {
    logregBox.classList.add('active');
});

//when user click login
loginLink.addEventListener('click',()=>{
logregBox.classList.remove('active')
});


