function measurePageLoad(count = 0) {
  if (count >= 100) {
    console.warn("Page load time was unable to be calculated")
    return undefined
  }

  const pageLoad = document.getElementById("page-load-time")

  const perf = performance.getEntriesByType("navigation")[0]

  if (perf && perf.duration) {
    pageLoad.innerText = Math.round(perf.duration)
  } else setTimeout(() => measurePageLoad(count + 1), 0)
}

function mesasureZeroJsLoad(count = 0) {
  if (count >= 100) {
    console.warn("Zero.js load time was unable to be calculated")
    return undefined
  }

  const zerojsLoad = document.getElementById("zerojs-load-time")

  const perf = performance.getEntriesByName("https://cdn.glimpsezero.io/scripts/zero.js")[0]

  if (perf && perf.duration) {
    zerojsLoad.innerText = Math.round(perf.duration)
  } else setTimeout(() => mesasureZeroJsLoad(count + 1), 0)
}

window.addEventListener("DOMContentLoaded", () => {
  measurePageLoad()
  mesasureZeroJsLoad()
})

window.addEventListener("message", ({ data }) => {
  if (data === "zjs_serve") {
    const adType = document.getElementById("ad-unit-path")
    adType.innerText = "Sponsorship"

    const adCarbon = document.getElementById("ad-unit-carbon-cost")
    adCarbon.innerText = "0.1"

    const carbonSaving = document.getElementById("total-carbon-savings")
    carbonSaving.innerText = "90"
  }
})
