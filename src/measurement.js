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

window.addEventListener("DOMContentLoaded", () => {
  measurePageLoad()
})

window.addEventListener("message", (event) => {
  console.log(event)

  if (event.data === "zjs_serve") {
    const pageLoadEmoji = document.getElementById("page-load-emoji")
    pageLoadEmoji.innerHTML = "⚡"

    const unitOne = document.getElementById("unit-01-type")
    unitOne.innerText = "Prematch ✔️"

    const unitTwo = document.getElementById("unit-02-type")
    unitTwo.innerText = "Prematch ✔️"

    const carbonSaving = document.getElementById("total-carbon-savings")
    carbonSaving.innerText = "90"
  }
})
