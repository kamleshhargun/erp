// 🔥 SINGLE SOURCE API CONFIG
const API_BASE = "https://script.google.com/macros/s/AKfycbzYF1nx8L09QvI-FF5e92lzf2sK78s90JImo87vX9fXMqJ3e01HrDUIRFR4I_BkgHUlXA/exec";

// 🔥 HELPER (cache bust safe)
function withNoCache(url){
  return url + (url.includes("?") ? "&" : "?") + "_=" + Date.now();
}

// 🔥 ALL ENDPOINTS
const API = {

  // ✅ STATS (FIXED)
  stats: () => withNoCache(API_BASE + "?type=stats"),

  // ✅ LOOKUP
  lookup: (order) =>
    withNoCache(
      API_BASE + "?type=lookup&order_id=" + encodeURIComponent(order)
    ),

  // ✅ TRACK
  track: (order, tracking) =>
    withNoCache(
      API_BASE +
      "?type=track&order_id=" + encodeURIComponent(order) +
      "&tracking=" + encodeURIComponent(tracking)
    ),

  // ✅ LEDGER GET
  ledgerGet: (category) =>
    withNoCache(
      API_BASE + "?type=ledger&category=" + encodeURIComponent(category)
    ),

  // ✅ POST (COMMON)
  post: API_BASE,

  // ✅ LEDGER POST
  ledgerPost: API_BASE
};
