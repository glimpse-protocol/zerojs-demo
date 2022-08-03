function measurePageLoad() {
  const pageLoad = document.getElementById("page-load-time")

  const duration = performance.getEntriesByType("navigation")[0].duration
  if (!duration) setTimeout(measurePageLoad, 0)
  else pageLoad.innerText = `Page load time: ${Math.round(duration)}ms`
}

window.addEventListener("DOMContentLoaded", measurePageLoad)
