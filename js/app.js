/* =========================================
   SETTINGS
========================================= */

const API_URL =
"https://script.google.com/macros/s/AKfycbygYJcHD7t56J_ZgS_JYGkVLvqVNK6Z1r-5MFivMQpGFQdjEd8goJ8dvDx9vcc3BJs/exec";

/* =========================================
   PAGE LOADER
========================================= */

async function loadPage(page) {

  try {

    const res =
      await fetch(
        "pages/" +
        page +
        ".html"
      );

    if (!res.ok) {

      throw new Error(
        "Page Not Found"
      );

    }

    const html =
      await res.text();

    document.getElementById(
      "contentArea"
    ).innerHTML =
      html;

  } catch (err) {

    document.getElementById(
      "contentArea"
    ).innerHTML =
      `
      <div class="alert alert-danger">
        ${err}
      </div>
      `;

    console.error(err);

  }

}

/* =========================================
   DASHBOARD DATA
========================================= */

async function loadDashboard() {

  try {

    const res =
      await fetch(
        API_URL +
        "?action=dashboard"
      );

    const data =
      await res.json();

    if (!data.success) {

      return;

    }

    if (
      document.getElementById(
        "totalOrders"
      )
    ) {

      document.getElementById(
        "totalOrders"
      ).innerText =
        data.total || 0;

    }

    if (
      document.getElementById(
        "pickupOrders"
      )
    ) {

      document.getElementById(
        "pickupOrders"
      ).innerText =
        data.pickup || 0;

    }

    if (
      document.getElementById(
        "returnOrders"
      )
    ) {

      document.getElementById(
        "returnOrders"
      ).innerText =
        data.return || 0;

    }

  } catch (err) {

    console.error(err);

  }

}

/* =========================================
   TODAY COUNTS
========================================= */

async function loadTodayCounts() {

  try {

    const res =
      await fetch(
        API_URL +
        "?action=todayCounts"
      );

    const data =
      await res.json();

    if (!data.success) {

      return;

    }

    if (
      document.getElementById(
        "pickupCount"
      )
    ) {

      document.getElementById(
        "pickupCount"
      ).innerText =
        data.pickup || 0;

    }

    if (
      document.getElementById(
        "returnCount"
      )
    ) {

      document.getElementById(
        "returnCount"
      ).innerText =
        data.return || 0;

    }

  } catch (err) {

    console.error(err);

  }

}

/* =========================================
   TRACK AWB
========================================= */

async function trackAWB(awb) {

  try {

    const res =
      await fetch(
        API_URL +
        "?action=track&awb=" +
        encodeURIComponent(
          awb
        )
      );

    return await res.json();

  } catch (err) {

    return {

      success: false,

      message:
        String(err)

    };

  }

}

/* =========================================
   SAVE SCAN
========================================= */

async function saveScan(
  awb,
  type
) {

  try {

    const res =
      await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({

              action: "save",

              awb: awb,

              type: type

            })

        }
      );

    return await res.json();

  } catch (err) {

    return {

      success: false,

      message:
        String(err)

    };

  }

}

/* =========================================
   SUCCESS BEEP
========================================= */

function beep() {

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

  osc.frequency.value =
    800;

  osc.type =
    "sine";

  osc.start();

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + 0.20
  );

  osc.stop(
    ctx.currentTime + 0.20
  );

}

/* =========================================
   LIVE CLOCK
========================================= */

function startClock() {

  const el =
    document.getElementById(
      "clock"
    );

  if (!el) {

    return;

  }

  setInterval(() => {

    el.innerHTML =
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
  () => {

    startClock();

    loadDashboard();

    loadTodayCounts();

  }
);
