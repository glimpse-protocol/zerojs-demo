window.addEventListener("message", (event) => {
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
