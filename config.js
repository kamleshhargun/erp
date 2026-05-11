// 🔥 SINGLE SOURCE API CONFIG
const API_BASE = "https://script.google.com/macros/s/AKfycbxpahTZVKpuaB8MwXQx8Dfejn-EsGJqh7xmf3jerqdkQSvkZ1HD8ynmGNMgby5oX0Uuvg/exec";

// 🔥 HELPER (cache bust - always fresh request)
function withNoCache(url){
  return url + (url.includes("?") ? "&" : "?") + "_=" + Date.now();
}

// 🔥 ALL ENDPOINTS
const API = {

  // ✅ STATS
  stats: () =>
    withNoCache(API_BASE + "?type=stats"),

  // ✅ LOOKUP
  lookup: (order) =>
    withNoCache(
      API_BASE + "?type=lookup&order_id=" + encodeURIComponent(order)
    ),

  // ✅ TRACK
  track: (order,tracking) =>
    withNoCache(
      API_BASE +
      "?type=track" +
      "&order_id=" + encodeURIComponent(order) +
      "&tracking=" + encodeURIComponent(tracking)
    ),

  // ✅ LEDGER GET
  ledgerGet: (category) =>
    withNoCache(
      API_BASE +
      "?type=ledger" +
      "&category=" + encodeURIComponent(category)
    ),

  // ✅ PICKUP
  pickup: (order, tracking) =>
    withNoCache(
      API_BASE +
      "?mode=pickup" +
      "&order_id=" + encodeURIComponent(order) +
      "&tracking=" + encodeURIComponent(tracking)
    ),

  // ✅ RETURN
  returnScan: (order, tracking) =>
    withNoCache(
      API_BASE +
      "?mode=return" +
      "&order_id=" + encodeURIComponent(order) +
      "&tracking=" + encodeURIComponent(tracking)
    ),

  // ✅ POST
  post: API_BASE,

  // ✅ LEDGER POST
  ledgerPost: API_BASE
};
