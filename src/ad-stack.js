const units = [
  {
    div: "unit-01",
    code: "/21789678234/gz_demo_01_300x250",
    mediaTypes: {
      banner: {
        sizes: [[300, 250]],
      },
    },
    bids: [
      {
        bidder: "glimpse",
      },
    ],
  },
  {
    div: "unit-02",
    code: "/21789678234/gz_demo_02_300x250",
    mediaTypes: {
      banner: {
        sizes: [[300, 250]],
      },
    },
    bids: [
      {
        bidder: "glimpse",
      },
    ],
  },
]

window.googletag = window.googletag || {}
window.googletag.cmd = window.googletag.cmd || []
window.pbjs = window.pbjs || {}
window.pbjs.que = window.pbjs.que || []
window.zjs = window.zjs || {}
window.zjs.cmd = window.zjs.cmd || []

setupGoogleTag()
setupGlimpseZero()

function setupGoogleTag() {
  googletag.cmd.push(function () {
    units.forEach(({ code, mediaTypes, div }) => {
      googletag
        .defineSlot(code, mediaTypes.banner.sizes, div)
        .addService(googletag.pubads())
    })
    googletag.pubads().disableInitialLoad()
    googletag.pubads().enableSingleRequest()
    googletag.enableServices()
  })
}

function runHeaderBidding(misses) {
  pbjs.que.push(function () {
    pbjs.addAdUnits(misses)
    pbjs.requestBids({
      bidsBackHandler: () => {
        if (pbjs.initAdServer) return
        pbjs.initAdServer = true

        googletag.cmd.push(function () {
          pbjs.que.push(function () {
            pbjs.setTargetingForGPTAsync()
            googletag.pubads().refresh()
          })
        })
      },
      timeout: 1500,
    })
  })
}

function setupGlimpseZero() {
  zjs.cmd.push(() => {
    zjs.init({
      id: "demo",
      adUnitPathKey: "code"
    })

    const { misses } = zjs.prematch(units)
    if (misses.length === 0) {
      console.log("All units prematched no prebid to run")
      googletag.cmd.push(() => {
        googletag.pubads().refresh()
      })
    } else {
      runHeaderBidding(misses)
    }
  })
}
