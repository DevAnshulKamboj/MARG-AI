const API_BASE = "https://robots-mines-virginia-operate.trycloudflare.com";
const TOKEN_KEY = "marg_access_token";
const LOGIN_URL = "/";   // absolute path to your login page

function goToLogin() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.replace(LOGIN_URL);   // replace() so Back doesn't return here
}

async function checkAuthentication() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return goToLogin();

    try {
        const response = await fetch(API_BASE + "/api/me", {
            headers: { "Authorization": "Bearer " + token }
        });

        if (!response.ok) return goToLogin();

        // Valid token: reveal the page
        document.body.style.visibility = "visible";
    } catch (error) {
        console.error("Authentication check failed:", error);
        goToLogin();
    }
}

checkAuthentication();
