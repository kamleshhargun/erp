/* =========================================
   SETTINGS
========================================= */

const API_URL =
"https://script.google.com/macros/s/AKfycbyiQAu9YHFga1mNRTuQjJaQIbJLvAiaYLLNUoKR4_UcCKQC7G7x114UGvWjztz3F-Y/exec";

/* =========================================
   API HELPER
========================================= */

async function apiGet(params = "") {

    try {

        const response = await fetch(
            `${API_URL}${params}`
        );

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: error.message
        };
    }
}

async function apiPost(payload = {}) {

    try {

        const response = await fetch(
            API_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: error.message
        };
    }
}

/* =========================================
   CONNECTION CHECK
========================================= */

async function checkConnection() {

    const btn =
        document.getElementById(
            "connectionStatus"
        );

    if (!btn) return;

    try {

        const data =
            await apiGet(
                "?action=ping"
            );

        if (data.success) {

            btn.className =
                "btn btn-success w-100";

            btn.innerHTML =
                "🟢 Connected";

        } else {

            throw new Error();
        }

    } catch {

        btn.className =
            "btn btn-danger w-100";

        btn.innerHTML =
            "🔴 Disconnected";
    }
}

/* =========================================
   PAGE LOADER
========================================= */

async function loadPage(page) {

    try {

        const response =
            await fetch(
                `pages/${page}.html`
            );

        if (!response.ok) {
            throw new Error(
                "Page Not Found"
            );
        }

        const html =
            await response.text();

        document
            .getElementById(
                "contentArea"
            )
            .innerHTML = html;

    } catch (error) {

        console.error(error);

        document
            .getElementById(
                "contentArea"
            )
            .innerHTML = `
            <div class="alert alert-danger">
                ${error.message}
            </div>
        `;
    }
}

/* =========================================
   DASHBOARD
========================================= */

async function loadDashboard() {

    const data =
        await apiGet(
            "?action=dashboard"
        );

    if (!data.success)
        return;

    const total =
        document.getElementById(
            "totalOrders"
        );

    const pickup =
        document.getElementById(
            "pickupOrders"
        );

    const ret =
        document.getElementById(
            "returnOrders"
        );

    if (total)
        total.textContent =
            data.total || 0;

    if (pickup)
        pickup.textContent =
            data.pickup || 0;

    if (ret)
        ret.textContent =
            data.return || 0;
}

/* =========================================
   TODAY COUNTS
========================================= */

async function loadTodayCounts() {

    const data =
        await apiGet(
            "?action=todayCounts"
        );

    if (!data.success)
        return;

    const pickup =
        document.getElementById(
            "pickupCount"
        );

    const ret =
        document.getElementById(
            "returnCount"
        );

    if (pickup)
        pickup.textContent =
            data.pickup || 0;

    if (ret)
        ret.textContent =
            data.return || 0;
}

/* =========================================
   TRACK AWB
========================================= */

async function trackAWB(awb) {

    return await apiGet(
        "?action=track&awb=" +
        encodeURIComponent(awb)
    );
}

/* =========================================
   SAVE SCAN
========================================= */

async function saveScan(
    awb,
    type
) {

    return await apiPost({

        action: "save",

        awb,

        type

    });
}

/* =========================================
   SHEET DATA
========================================= */

async function getSheetData(month) {

    return await apiGet(
        "?action=getSheetData&month=" +
        encodeURIComponent(month)
    );
}

/* =========================================
   SUCCESS BEEP
========================================= */

function beep() {

    try {

        const ctx =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

        const osc =
            ctx.createOscillator();

        const gain =
            ctx.createGain();

        osc.connect(gain);
        gain.connect(
            ctx.destination
        );

        osc.frequency.value = 800;
        osc.type = "sine";

        osc.start();

        gain.gain
            .exponentialRampToValueAtTime(
                0.0001,
                ctx.currentTime + 0.2
            );

        osc.stop(
            ctx.currentTime + 0.2
        );

    } catch (error) {

        console.error(
            "Beep Error",
            error
        );
    }
}

/* =========================================
   LIVE CLOCK
========================================= */

let clockStarted = false;

function startClock() {

    if (clockStarted)
        return;

    const clock =
        document.getElementById(
            "clock"
        );

    if (!clock)
        return;

    clockStarted = true;

    setInterval(() => {

        clock.textContent =
            new Date()
            .toLocaleString(
                "en-IN"
            );

    }, 1000);
}

/* =========================================
   INIT
========================================= */

window.addEventListener(
    "load",
    async () => {

        startClock();

        await checkConnection();

        setInterval(
            checkConnection,
            30000
        );

        loadDashboard();

        loadTodayCounts();
    }
);
