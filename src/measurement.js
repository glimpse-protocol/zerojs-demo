window.startMeasurements = (matched) => {
  window.prematched = matched.length === 2
  window.startTime = Date.now()
}

window.measurePrebidTime = function () {
  window.prebidEnd = Date.now()
}

window.measureGamTime = function () {
  window.gamEnd = Date.now()
}

window.endMeasurements = () => {
  window.endTime = Date.now()
  const isPrematched = window.prematched

  const prebidBar = document.getElementById("bar-prebid")
  const gamBar = document.getElementById("bar-gam")

  if (isPrematched) {
    prebidBar.className = prebidBar.className + " bar-hidden"

    const gamTime = window.gamEnd - window.startTime
    gamBar.style.width = `${gamTime}px`
  } else {
    const prebidTime = window.prebidEnd - window.startTime
    prebidBar.style.width = `${prebidTime}px`

    const gamTime = window.gamEnd - window.prebidEnd
    gamBar.style.width = `${gamTime}px`
  }

  const renderBar = document.getElementById("bar-render")
  const renderTime = window.endTime - window.gamEnd
  renderBar.style.width = `${renderTime}px`
    
  const adLoadTime = (window.endTime - window.startTime) / 1000

  const pageLoadTime = document.getElementById("page-load-time")
  pageLoadTime.innerText = adLoadTime

  const pageLoadEmoji = document.getElementById("page-load-emoji")
  pageLoadEmoji.innerHTML = isPrematched ? "⚡" : "🐌"
}
