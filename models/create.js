const path = require('path')
// TODO: get browserify to play nice
const dialog = window.require('electron').remote.dialog
const app = window.require('electron').remote.app
const BagIt = require('bagit-fs')
const mirror = require('mirror-folder')
const xtend = require('xtend')
const verify = require('bagit-tools').verify

module.exports = bagModel

var bagDir = path.join(app.getPath('downloads'), '/bags')

function bagModel (state, bus) {
  state.create = xtend({
    bagDir: bagDir,
    name: 'my-bag-' + Date.now(),
    put: null,
    imported: []
  }, state.create)

  bus.on('create:start', function (pathname) {
    if (!pathname) {
      var files = dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      if (!files || !files.length) return
      pathname = files[0]
    }
    createBag(pathname)
  })

  function createBag (src) {
    var bag = BagIt(path.join(state.create.bagDir, state.create.name))
    state.create.it = bag
    state.create.importing = true

    var progress = mirror(src, {name: '/', fs: bag}, {
      ignore: function (name) { },
      live: false
    }, function (err) {
      if (err) throw err
      // state.importing = false
      bag.finalize(function () {
        console.log('Bagged!')
      })
    })

    progress.on('put', function (src, dest) {
      state.create.put = dest
      state.create.put.imported = 0
      bus.emit('render')
    })

    progress.on('put-data', function (data) {
      state.create.put.imported += data.length
      bus.emit('render')
    })

    progress.on('put-end', function (src, dest) {
      console.log(state.create)
      state.create.imported = state.create.imported.concat([dest])
      bus.emit('render')
    })
  }
}