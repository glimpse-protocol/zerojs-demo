window.startMeasurements = (matched) => {
  window.prematched = matched.length === 2
  window.startTime = Date.now()
  window.endTime = 0
}

window.endMeasurements = () => {
  console.log("I've been called")
  window.endTime = Date.now()
  const adLoadTime = (window.endTime - window.startTime) / 1000
  console.log(adLoadTime)
  const isPrematched = window.prematched

  const pageLoadTime = document.getElementById("page-load-time")
  pageLoadTime.innerText = adLoadTime

  const pageLoadEmoji = document.getElementById("page-load-emoji")
  pageLoadEmoji.innerHTML = isPrematched ? "⚡" : "🐌"

  const unitOne = document.getElementById("unit-01-type")
  unitOne.innerText = isPrematched ? "Prematch ✔️" : "Postmatch ❌"

  const unitTwo = document.getElementById("unit-02-type")
  unitTwo.innerText = isPrematched ? "Prematch ✔️" : "Postmatch ❌"

  const carbonSaving = document.getElementById("total-carbon-savings")
  carbonSaving.innerText = isPrematched ? 90 : 0
}
