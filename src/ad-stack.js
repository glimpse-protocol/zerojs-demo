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

var zjs = window.zjs || {}
zjs.cmd = window.zjs.cmd || []

zjs.cmd.push(() => {
  zjs.setPubId("jp57")

  const [unmatched, matched] = zjs.pretarget(units)

  window.startMeasurements(matched)

  googletag.cmd.push(function () {
    googletag.pubads().addEventListener("slotRenderEnded", () => {
      window.endMeasurements()
    })
  })

  runHeaderBidding(unmatched)
})

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

setTimeout(function () {
  initAdserver()
}, 3000)
