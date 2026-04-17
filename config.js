// 🔥 SINGLE SOURCE API CONFIG
const API_BASE = "https://script.google.com/macros/s/AKfycbyu45IVYDpUzhQFUu5lfImFrDwEsfGz-UeYVKdnWEZmLIEubA8TcfQ0Pl6VVWHHQTR38w/exec";

// 🔥 ALL ENDPOINTS
const API = {
  stats: API_BASE + "?type=stats",
  lookup: (order) => API_BASE + "?type=lookup&order_id=" + encodeURIComponent(order),
  track: (order, tracking) =>
    API_BASE + "?type=track&order_id=" + encodeURIComponent(order) +
    "&tracking=" + encodeURIComponent(tracking),
  post: API_BASE
};
