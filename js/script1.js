var button = document.querySelectorAll(".button");
var div = document.querySelectorAll("div");
var email = document.getElementById("email");
var erroR = document.querySelector(".erro-r");


function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

email.oninput = () => {
    if(isValidEmail(email.value)){
        email.classList.remove("error");
        erroR.style.display = "none";
    } else {
        email.classList.add("error");
        erroR.style.display = "block";
        if(email.value === ""){
            email.classList.remove("error");
            erroR.innerHTML = "Please add your email";
        } else {
            erroR.innerHTML = "Valid email required";
        }
    }
}

setInterval(function() {
    if (window.innerWidth >= 768) {
        div[2].className = "sign-up-img";
        div[3].classList.remove("sign-up-img");
    } else {
        div[2].className = "img-content *";
        div[3].classList.add("sign-up-img");
    }
}, 1000);