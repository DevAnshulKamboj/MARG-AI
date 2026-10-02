const API_BASE = "https://robots-mines-virginia-operate.trycloudflare.com";
const TOKEN_KEY = "marg_access_token";

async function checkAuthentication() {
    const token = localStorage.getItem(TOKEN_KEY);

    // No token → go back to login
    if (!token) {
        window.location.href = "../";
        return;
    }

    try {
        const response = await fetch(API_BASE + "/api/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // Token invalid/expired
        if (!response.ok) {
            localStorage.removeItem(TOKEN_KEY);
            window.location.href = "../";
            return;
        }

        // Authentication successful
        console.log("User authenticated");

    } catch (error) {
        console.error("Authentication check failed:", error);
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = "../";
    }
}

checkAuthentication();
