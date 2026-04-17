// 🔥 SINGLE SOURCE API CONFIG
const API_BASE = "https://script.google.com/macros/s/AKfycbwHRpW0V9Jc2uvhkBHum_AX6Asrk1U_7RyL48hdV6dP0VFj6i_eQeyqRu8ZBXu2Ub6I-g/exec";

// 🔥 ALL ENDPOINTS
const API = {
  stats: API_BASE + "?type=stats",
  lookup: (order) => API_BASE + "?type=lookup&order_id=" + encodeURIComponent(order),
  track: (order, tracking) => API_BASE + "?type=track&order_id=" + encodeURIComponent(order) + "&tracking=" + encodeURIComponent(tracking),
  post: API_BASE // POST same base
};
