const path = require('path')
// TODO: get browserify to play nice
const dialog = window.require('electron').remote.dialog
const app = window.require('electron').remote.app
const BagIt = require('bagit-fs')
const mirror = require('mirror-folder')
const xtend = require('xtend')
const verify = require('bagit-tools').verify

module.exports = bagModel

function bagModel (state, bus) {
  state.verify = xtend({
    results: []
  }, state.bag)

  bus.on('verify:start', function (pathname) {
    if (!pathname) {
      var files = dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      if (!files || !files.length) return
      pathname = files[0]
    }
    verifyBag(pathname)
  })

  function verifyBag (src) {
    state.verify = {
      name: path.basename(src),
      path: src,
      results: []
    }
    var tests = verify(src)
    tests.on('data', function (data) {
      state.verify.results.push(data)
      console.log(data)
      console.log('ok', data.indexOf('not ok') > -1)
      if (data.indexOf('not ok') > -1) state.verify.invalid = true
      bus.emit('render')
    })
    tests.on('verify', function (file) {
      state.verify.todo = state.verify.todo - 1
      bus.emit('render')
    })
    tests.once('manifest-count', function (count) {
      state.verify.manifests = count
      bus.emit('render')
    })
    tests.once('count', function (count) {
      state.verify.todo = count * state.verify.manifests
      bus.emit('render')
    })
    tests.on('end', function () {
      console.log('state', state.verify)
      tests.removeAllListeners()
      state.verify.done = true
      bus.emit('render')
    })
    tests.on('error', function (err) {
      console.error(err)
    })

    bus.emit('render')
  }
}