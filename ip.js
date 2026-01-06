(function(){
  try{
    const endpoint = "https://my.r8sansoltani.workers.dev/";
    const pageUrl = window.location.href;
    const title = document.title || "";
    const t = Date.now();

    // 1) IMG beacon (با referrerpolicy که سعی می‌کنه full URL بفرسته)
    const img = document.createElement("img");
    img.width = 1; img.height = 1;
    img.style = "position:fixed;left:-9999px;"; // پنهان
    img.referrerPolicy = "unsafe-url"; // تلاش برای فرستادن کامل URL
    img.src = endpoint + "?u=" + encodeURIComponent(pageUrl) + "&t=" + t + "&title=" + encodeURIComponent(title);
    document.documentElement.appendChild(img);

    // 2) navigator.sendBeacon (فقط در صورت پشتیبانی) — POST در پس‌زمینه
    if (navigator.sendBeacon) {
      try {
        const data = JSON.stringify({ url: pageUrl, title: title });
        const blob = new Blob([data], { type: "application/json" });
        navigator.sendBeacon(endpoint, blob);
      } catch(e){}
    }

    // 3) fetch keepalive fallback (آخرین شانس)
    try {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: pageUrl, title: title }),
        keepalive: true,
        mode: "no-cors"
      }).catch(()=>{});
    } catch(e){}

    // small timeout cleanup (remove img after a bit)
    setTimeout(()=>{ try{ img.remove(); }catch(e){} }, 5000);
  }catch(e){}
})();
