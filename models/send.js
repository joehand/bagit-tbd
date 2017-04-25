const path = require('path')
// TODO: get browserify to play nice
const dialog = window.require('electron').remote.dialog
const app = window.require('electron').remote.app
const BagIt = require('bagit-fs')
const mirror = require('mirror-folder')
const xtend = require('xtend')
const verify = require('bagit-tools').verify
const Dat = require('dat-node')

module.exports = sendModel

function sendModel (state, bus) {
  state.send = xtend({
  }, state.send)

  bus.on('send:start', function (pathname) {
    if (!pathname) {
      var files = dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      if (!files || !files.length) return
      pathname = files[0]
    }
    sendBag(pathname)
  })

  function sendBag (src) {
    state.send = {
      name: path.basename(src),
      path: src
    }
    Dat(src, function (err, dat) {
      if (err) console.error(err)
      state.key = dat.key.toString('hex')
      var network = dat.joinNetwork()
      network.on('conneciton', function (conn) {
        state.send.connected = true
        bus.emit('render')
      })
      dat.importFiles(function (err) {
        if (err) console.error(err)
        console.log('done importing')
      })
      var stats = dat.trackStats()
      console.log(stats)
      bus.emit('render')
    })

    bus.emit('render')
  }
}
