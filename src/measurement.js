window.startMeasurements = (matched) => {
  window.prematched = matched.length === 2
  window.startTime = Date.now()
  window.endTime = 0
}

window.endMeasurements = () => {
  window.endTime = Date.now()
  const adLoadTime = (window.endTime - window.startTime) / 1000
  const isPrematched = window.prematched

  const pageLoadTime = document.getElementById("page-load-time")
  pageLoadTime.innerText = adLoadTime

  const pageLoadEmoji = document.getElementById("page-load-emoji")
  pageLoadEmoji.innerHTML = isPrematched ? "⚡" : "🐌"
}
