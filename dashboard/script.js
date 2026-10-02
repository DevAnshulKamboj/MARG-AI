const API_BASE = "https://robots-mines-virginia-operate.trycloudflare.com";
const TOKEN_KEY = "marg_access_token";
const LOGIN_URL = "https://devanshulkamboj.github.io/MARG-AI/";

// remove any old token left over from the localStorage version
localStorage.removeItem(TOKEN_KEY);

function goToLogin() {
    sessionStorage.removeItem(TOKEN_KEY);
    window.location.replace(LOGIN_URL);
}

async function checkAuthentication() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) return goToLogin();

    try {
        const response = await fetch(API_BASE + "/api/me", {
            headers: { "Authorization": "Bearer " + token }
        });
        if (!response.ok) return goToLogin();

        document.body.style.visibility = "visible";
    } catch (error) {
        console.error("Authentication check failed:", error);
        goToLogin();
    }
}

window.addEventListener("pageshow", (e) => {
    if (e.persisted) checkAuthentication();
});

checkAuthentication();