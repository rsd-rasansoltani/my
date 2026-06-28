(function () {
  var img = new Image();
  img.src =
    "https://my.r8sansoltani.workers.dev/?u=" +
    encodeURIComponent(window.location.href) +
    "&_=" + Date.now(); // ضد کش
})();
