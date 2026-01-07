// ip.js — کپی کن و روی my.4ba.ir/ip.js بذار
(function () {
  try {
    const endpoint = "https://my.r8sansoltani.workers.dev/"; // <-- آدرس Worker تو اینجا
    const pageUrl = window.location.href || location.href || "";
    const title = (document.title || "");
    const rnd = Date.now() + "-" + Math.floor(Math.random() * 1000);

    // query string (لینک دقیق و عنوان)
    const qs = "?u=" + encodeURIComponent(pageUrl) +
               "&t=" + encodeURIComponent(title) +
               "&_=" + encodeURIComponent(rnd);

    // --- 1) تصویر کوچک با referrerPolicy که سعی می‌کنه full URL رو بفرسته ---
    try {
      const img = new Image(1, 1);
      img.referrerPolicy = "unsafe-url"; // تلاش برای ارسال کامل Referer
      img.width = 1;
      img.height = 1;
      img.style = "position:fixed;left:-9999px;opacity:0;";
      img.src = endpoint + qs;
      // remove after load/error to keep DOM تمیز
      img.onload = img.onerror = function () {
        try { img.remove(); } catch (e) {}
      };
      // fallback cleanup
      setTimeout(function () { try { img.remove(); } catch (e) {} }, 10000);
      // attach to DOM (در صورتی که لازم باشه)
      try { (document.documentElement || document.body || document).appendChild(img); } catch(e) {}
    } catch (e) {}

    // --- 2) navigator.sendBeacon (اگر پشتیبانی شد) ---
    try {
      if (navigator && typeof navigator.sendBeacon === "function") {
        const payload = JSON.stringify({ url: pageUrl, title: title, _time: rnd });
        const blob = new Blob([payload], { type: "application/json" });
        try { navigator.sendBeacon(endpoint, blob); } catch (e) {}
      }
    } catch (e) {}

    // --- 3) fetch fallback با keepalive و mode no-cors ---
    try {
      // GET با no-cors (بدون body) — باز هم query شامل لینک دقیق هست
      fetch(endpoint + qs, { method: "GET", mode: "no-cors", keepalive: true })
        .catch(function () { /* silent */ });
    } catch (e) {}

    // تمام شد
  } catch (e) {
    // silent
  }
})();
