const units = [
  {
    div: "unit-01",
    code: "/21789678234/gz_demo_sponsorship_300x250",
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
    code: "/21789678234/gz_demo_prebid_300x250",
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

// Setup Glimpse Zero
var zjs = window.zjs || {}
zjs.cmd = window.zjs.cmd || []

zjs.cmd.push(() => {
  zjs.setPubId("jp57")

  const [unmatched] = zjs.pretarget(units)

  zjs.onEvent("adServed", () => window.postMessage("zjs_serve"))

  runHeaderBidding(unmatched)
})

var pbjs = pbjs || {}
pbjs.que = pbjs.que || []

function runHeaderBidding(unmatched) {
  pbjs.que.push(function () {
    pbjs.addAdUnits(unmatched)
    pbjs.requestBids({
      bidsBackHandler: initAdserver,
      timeout: 1500,
    })
  })
}

function initAdserver() {
  if (pbjs.initAdserverSet) return
  pbjs.initAdserverSet = true
  googletag.cmd.push(function () {
    pbjs.que.push(function () {
      pbjs.setTargetingForGPTAsync()
      googletag.pubads().refresh()
    })
  })
}
// in case PBJS doesn't load
setTimeout(function () {
  initAdserver()
}, 3000)

var googletag = googletag || {}
googletag.cmd = googletag.cmd || []

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
