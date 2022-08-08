const Key = {
  Prematched: "gp_zjs_demo_prematched",
  Postmatched: "gp_zjs_demo_postmatched",
}

function getPrematchedAverageChart() {
  const previousMeasurements = JSON.parse(localStorage.getItem(Key.Prematched))

  if (previousMeasurements) {
    const gam = getAverageValueOfKey(previousMeasurements, "gam")
    const render = getAverageValueOfKey(previousMeasurements, "render")

    const averageMeasurements = {
      gam,
      render,
    }

    addBarMeasurements(averageMeasurements, "prematched")
  }
}

function getPostmatchedAverageChart() {
  const previousMeasurements = JSON.parse(localStorage.getItem(Key.Postmatched))

  if (previousMeasurements) {
    const gam = getAverageValueOfKey(previousMeasurements, "gam")
    const prebid = getAverageValueOfKey(previousMeasurements, "prebid")
    const render = getAverageValueOfKey(previousMeasurements, "render")

    const averageMeasurements = {
      gam,
      prebid,
      render,
    }

    addBarMeasurements(averageMeasurements, "postmatched")
  }
}

function getAverageValueOfKey(arr, key) {
  const measurements = arr.map((a) => a[key])

  const average = measurements.reduce((a, b) => a + b, 0) / measurements.length
  return Math.floor(average)
}


window.startMeasurements = (matched) => {
  getPrematchedAverageChart()
  getPostmatchedAverageChart()

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

  const measurements = {}

  if (isPrematched) {
    measurements.gam = window.gamEnd - window.startTime
    window.storageKey = Key.Prematched
  } else {
    measurements.prebid = window.prebidEnd - window.startTime
    measurements.gam = window.gamEnd - window.prebidEnd
    window.storageKey = Key.Postmatched
  }

  measurements.render = window.endTime - window.gamEnd

  const pageLoadEmoji = document.getElementById("current-page-load-emoji")
  pageLoadEmoji.innerHTML = isPrematched ? "⚡" : "🐌"

  const currentMeasurements = JSON.parse(localStorage.getItem(window.storageKey)) ?? []
  localStorage.setItem(window.storageKey, JSON.stringify([measurements, ...currentMeasurements]))

  addBarMeasurements(measurements, "current")
}

function addBarMeasurements(measurements, barName) {
  const { gam, render } = measurements
  const prebid = measurements.prebid ?? 0
  const total = gam + render + prebid

  const gamBar = document.getElementById(`${barName}-bar-gam`)
  const prebidBar = document.getElementById(`${barName}-bar-prebid`)
  const renderBar = document.getElementById(`${barName}-bar-render`)
  const pageLoadTime = document.getElementById(`${barName}-page-load-time`)

  gamBar.style.width = `${gam}px`
  renderBar.style.width = `${render}ps`
 
  if (prebidBar) {
    prebid === 0
      ? prebidBar.className = prebidBar.className + " bar-hidden"
      : prebidBar.style.width = `${prebid}px`
  }

  pageLoadTime.innerText = total
}
