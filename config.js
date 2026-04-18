// 🔥 SINGLE SOURCE API CONFIG
const API_BASE = "https://script.google.com/macros/s/AKfycbxDZGsw-h-uo2EnxAzKgqADOq6X9Tm8QxFoFZgip5t40Bfs4j7QSOzhXRbo2chyNZ7X6w/exec";

// 🔥 ALL ENDPOINTS
const API = {
  stats: API_BASE + "?type=stats",
  lookup: (order) => API_BASE + "?type=lookup&order_id=" + encodeURIComponent(order),
  track: (order, tracking) =>
    API_BASE + "?type=track&order_id=" + encodeURIComponent(order) +
    "&tracking=" + encodeURIComponent(tracking),
  post: API_BASE
};
