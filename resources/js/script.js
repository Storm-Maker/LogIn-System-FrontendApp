let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");

const nameCheckGuide = document.querySelector('input[type="text"]');
const emailCheckGuide = document.querySelector('input[type="email"]');
const passwordCheckGuide = document.querySelector('input[type="password"]');

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (localStorage.getItem("smartLog") != null){
    var userData = JSON.parse(localStorage.getItem("smartLog"));
} else {
    var userData = [];
}

function mainFunction(){
    if (isEmpty()){
        displayWarning("empty");
    } else if(!isValid() && signupBtn != null){
        displayWarning("wrongFormat");
        displayInputError();
    } else if (signupBtn != null){
        if (isExisting()){
            displayWarning("exists");
        } else {
            storeCredentials();
            clearFields();
            displayWarning("success");
        }
    } else if (loginBtn != null) {
        if (checkCredentials()){
            clearFields();
            changePage();
        } else {
            displayWarning("invalid");
        }
    }
}
function storeCredentials(){
    let newData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }
    userData.push(newData);
    localStorage.setItem ("smartLog", JSON.stringify(userData));
}
function isEmpty(){
    if (nameInput == null){
        if (emailInput.value == "" || passwordInput.value == ""){
            return true;
        } else {
            return false;
        }
    } else {
        if (nameInput.value == "" || emailInput.value == "" || passwordInput.value == ""){
            return true;
        } else {
            return false;
        }
    }
}
function isValid(){

    let validName = /^([A-Z]|[a-z ,.'-])*$/;
    let validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (nameInput == null){
        if (validEmail.test(emailInput.value) && validPassword.test(passwordInput.value)){
            return true;
        } else {
            return false;
        }
    } else {
        if (validName.test(nameInput.value) && validEmail.test(emailInput.value) && validPassword.test(passwordInput.value)){
            return true;
        } else {
            return false;
        }
    }

}
function nameInputGuide(){
    let validName = /^([A-Z]|[a-z ,.'-])*$/;

    if (nameInput.value == "") {
        nameInput.classList.remove ("is-invalid");
        nameInput.classList.remove ("is-valid");

    } else if (validName.test(nameInput.value)){
        nameInput.classList.remove ("is-invalid");
        nameInput.classList.add ("is-valid");

    } else {
        nameInput.classList.remove ("is-valid");
        nameInput.classList.add ("is-invalid");
    }
}
function emailInputGuide(){
    let validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    if (emailInput.value == "") {
        emailInput.classList.remove ("is-invalid");
        emailInput.classList.remove ("is-valid");

    } else if (validEmail.test(emailInput.value)) {
        emailInput.classList.remove ("is-invalid");
        emailInput.classList.add ("is-valid");

    } else {
        emailInput.classList.remove ("is-valid");
        emailInput.classList.add ("is-invalid");
    }
}
function passwordInputGuide(){
    let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (passwordInput.value == "") {
        passwordInput.classList.remove ("is-invalid");
        passwordInput.classList.remove ("is-valid");

    } else if (validPassword.test(passwordInput.value)){
        passwordInput.classList.remove ("is-invalid");
        passwordInput.classList.add ("is-valid");
    } else {
        passwordInput.classList.remove ("is-valid");
        passwordInput.classList.add ("is-invalid");
    }
}
function isExisting(){
    for (let i=0; i<userData.length; i++){
        if (emailInput.value == userData[i].email){
            return true;
        } else {
            return false;
        }
    }
}
function displayWarning(warningMessage){
    let message = ``;
    let warnDialog = document.getElementById("warningDialog");

    if (warningMessage == "empty"){
        warnDialog.classList.remove ("alert-success");
        warnDialog.classList.add ("alert-danger");
        message = `
        <p>All inputs is required</P>
        `

    } else if (warningMessage == "wrongFormat"){
        warnDialog.classList.remove ("alert-success");
        warnDialog.classList.add ("alert-danger");

        message = `
        <p>Incorrect Format</P>
        `

    }else if (warningMessage == "invalid"){
        warnDialog.classList.remove ("alert-success");
        warnDialog.classList.add ("alert-danger");

        message = `
        <p>Incorrect email or password</P>
        `

    }else if (warningMessage == "success"){
        warnDialog.classList.remove ("alert-danger");
        warnDialog.classList.add ("alert-success");

        message = `
        <p>Success</P>
        `
    } else if (warningMessage == "exists"){
        warnDialog.classList.remove ("alert-danger");
        warnDialog.classList.add ("alert-success");

        message = `
        <p>Email already exists</P>
        `
    }
    warnDialog.innerHTML = message;
}
function clearFields(){
    let warnDialog = document.getElementById("warningDialog");

    if (nameInput != null){
        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";

        nameInput.classList.remove ("is-valid");
        emailInput.classList.remove ("is-valid");
        passwordInput.classList.remove ("is-valid");
    } else {
        emailInput.value = "";
        passwordInput.value = "";
        warnDialog.innerHTML = "";
        warnDialog.classList.remove ("alert-success");
        emailInput.classList.remove ("is-valid");
        passwordInput.classList.remove ("is-valid");
    }
}
function displayInputError(){
    
    let validName = /^([A-Z]|[a-z ,.'-])*$/;
    let validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!validName.test(nameInput.value)){
        document.getElementById("nameDialog").innerHTML = "Name can only contain letter and , . ' -";
    } else {
        document.getElementById("nameDialog").innerHTML = "";
    }

    if (!validEmail.test(emailInput.value)){
        document.getElementById("emailDialog").innerHTML = "Email must be in the format: email@service.com";
    } else {
        document.getElementById("emailDialog").innerHTML = "";
    }
    if (!validPassword.test(passwordInput.value)){
        document.getElementById("passwordDialog").innerHTML = "Password must contain uppercase, lowercase, specialChar & digits";
    } else {
        document.getElementById("passwordDialog").innerHTML = "";
    }
}
function checkCredentials(){

    for (i=0; i<userData.length; i++){
        if (userData[i].email == emailInput.value && userData[i].password == passwordInput.value ){
            localStorage.setItem ("userName", userData[i].name);
            return true;
        }
    }
    return false;
}
function changePage() {
    if (loginBtn != null){
        location.replace("home.html");
    } else if (logoutBtn != null){
        location.replace("index.html");
    }
}
function homeWelcome(){
    document.getElementById("userWelcome").innerHTML = `<h1>Welcome ${localStorage.getItem("userName")}</h1>`;
}
function clearSigninError(){
    document.getElementById("warningDialog").innerHTML = "";
}
if (loginBtn != null){
    loginBtn.addEventListener("click", mainFunction);
    document.getElementById("signUpLink").addEventListener("click", function(){
        location.replace("signup.html");
    })
    emailInput.addEventListener("focus", clearSigninError);
    passwordInput.addEventListener("focus", clearSigninError);
    emailInput.addEventListener("blur", clearSigninError);
    passwordInput.addEventListener("blur", clearSigninError);

    document.addEventListener("keydown", function(e){
        if (e.key == "Enter"){
            mainFunction();
        }
    })
}
if (signupBtn != null){
    signupBtn.addEventListener("click", mainFunction);
    signInLink.addEventListener("click", function(){
        location.replace("index.html");
    })
    nameCheckGuide.addEventListener("keyup", nameInputGuide);
    emailCheckGuide.addEventListener("keyup", emailInputGuide);
    passwordCheckGuide.addEventListener("keyup", passwordInputGuide);
    
    nameInput.addEventListener("focus", clearSigninError);
    emailInput.addEventListener("focus", clearSigninError);
    passwordInput.addEventListener("focus", clearSigninError);

    nameInput.addEventListener("blur", clearSigninError);
    emailInput.addEventListener("blur", clearSigninError);
    passwordInput.addEventListener("blur", clearSigninError);

    document.addEventListener("keydown", function(e){
        if (e.key == "Enter"){
            mainFunction();
        }
    })
}
if (logoutBtn != null){
    logoutBtn.addEventListener("click", function(){
        location.replace("index.html");
    })
    document.getElementById("signoutLink").addEventListener("click", function(){
        location.replace("index.html");
    })
    if (localStorage.getItem("userName") != null){
        homeWelcome();
    } else {
        window.onload = function(){
            location.replace("index.html");
        }
    }
    document.addEventListener("keydown", function(e){
        if (e.key == "Escape"){
            location.replace("index.html");
        }
    })
}
window.addEventListener('beforeunload', function () {
    if (loginBtn != null){
        emailInput.value = "";
        passwordInputInput.value = "";
    }
    if (logoutBtn != null){
        localStorage.removeItem("userName");
        document.getElementById("userWelcome").innerHTML = "";
    }
});
