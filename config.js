// 🔥 SINGLE SOURCE API CONFIG
const API_BASE = "https://script.google.com/macros/s/AKfycbwOaMgCMYMmR-WO7Cx38PjPYKjp9oBYKtSSS63d9aL0R5S6f5aqNu2IUG0sFdavlt5FHQ/exec";

// 🔥 ALL ENDPOINTS
const API = {
  stats: API_BASE + "?type=stats",
  lookup: (order) => API_BASE + "?type=lookup&order_id=" + encodeURIComponent(order),
  track: (order, tracking) =>
    API_BASE + "?type=track&order_id=" + encodeURIComponent(order) +
    "&tracking=" + encodeURIComponent(tracking),
  post: API_BASE
};
