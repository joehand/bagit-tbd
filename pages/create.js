'use strict'

const html = require('choo/html')

const FileImport = require('../elements/file-import')

module.exports = createView

function createView (state, emit) {
  var drop = html`
    <div class="dtc v-mid tc ph4">
      <h1 class="f3 f2-m f1-l fw2 black-90 mv3">
        Drop Files to Bag
      </h1>
      <h2 class="f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
        <a onclick=${function () {emit('create:start')}} href="#" class="link blue">(or open file dialog)</a>
      </h2>
    </div>
  `
  return html`
    <div class="vh-75 dt w-100">
      ${state.create.importing ? FileImport(state.create) : drop}
    </div>
  `
}
