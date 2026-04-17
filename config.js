// 🔥 SINGLE SOURCE API CONFIG
const API_BASE = "https://script.google.com/macros/s/AKfycby2h41GQ7lBc1Qu1bm4jutZBEEE4Cck2Ro5iQgl7So2i8vFPXmoxeJEkl0m2QB6KtsyGw/exec";

// 🔥 ALL ENDPOINTS
const API = {
  stats: API_BASE + "?type=stats",
  lookup: (order) => API_BASE + "?type=lookup&order_id=" + encodeURIComponent(order),
  track: (order, tracking) =>
    API_BASE + "?type=track&order_id=" + encodeURIComponent(order) +
    "&tracking=" + encodeURIComponent(tracking),
  post: API_BASE
};
