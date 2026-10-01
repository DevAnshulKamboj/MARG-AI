// ================= LOGIN VARIABLES =================

// Temporary credentials for frontend testing
const LOGIN_USERNAME = "admin";
const LOGIN_PASSWORD = "admin123";


// ================= CAPTCHA =================

let currentCaptcha = "";


function generateCaptcha() {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    currentCaptcha = "";

    for (let i = 0; i < 5; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        currentCaptcha += characters[randomIndex];
    }

    document.getElementById("captchaCode").textContent =
        currentCaptcha;
}


// Generate CAPTCHA when page loads
generateCaptcha();


// ================= LOGIN =================

function loginUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const captcha =
        document.getElementById("captchaInput").value.trim();


    // Check username
    if (username === "") {

        alert("Please enter username");

        return;
    }


    // Check password
    if (password === "") {

        alert("Please enter password");

        return;
    }


    // Check CAPTCHA
    if (captcha.toUpperCase() !== currentCaptcha) {

        alert("Invalid CAPTCHA");

        generateCaptcha();

        document.getElementById("captchaInput").value = "";

        return;
    }


    // Temporary frontend authentication
    if (
        username === LOGIN_USERNAME &&
        password === LOGIN_PASSWORD
    ) {

        alert("Login Successful");

        // Later your backend team can replace this
        // with an API request.

        // Example:
        // window.location.href = "dashboard.html";

    } else {

        alert("Invalid username or password");

    }
}