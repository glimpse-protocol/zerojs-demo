function measurePageLoad(count = 0) {
  if (count >= 10) {
    console.warn("Page load time was unable to be calculated")
    return undefined
  }

  const pageLoad = document.getElementById("page-load-time")

  const perf = performance.getEntriesByType("navigation")[0]

  if (perf && perf.duration) {
    pageLoad.innerText = `Page load time: ${Math.round(perf.duration)}ms`
  } else setTimeout(() => measurePageLoad(count + 1), 0)
}

function mesasureZeroJsLoad(count = 0) {
  if (count >= 10) {
    console.warn("Zero.js load time was unable to be calculated")
    return undefined
  }

  const zerojsLoad = document.getElementById("zerojs-load-time")

  const perf = performance.getEntriesByName("https://cdn.glimpsezero.io/scripts/zero.js")[0]

  if (perf && perf.duration) {
    zerojsLoad.innerText = `Zero.js load time: ${Math.round(perf.duration)}ms`
  } else setTimeout(() => mesasureZeroJsLoad(count + 1), 0)
}

window.addEventListener("DOMContentLoaded", () => {
  measurePageLoad()
  mesasureZeroJsLoad()
})
