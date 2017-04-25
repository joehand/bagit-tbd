'use strict'

const html = require('choo/html')

module.exports = sendView

function sendView (state, emit) {
  if (!state.send.name) {
    return html`<div class="dtc v-mid tc ph4">
        <h1 class="f3 f2-m f1-l fw2 black-90 mv3">
          Drop a Bag Here to Send!
        </h1>
        <h2 class="f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
          <a onclick=${function () {emit('send:start')}} href="#" class="link blue">(or open file dialog)</a>
        </h2>
      </div>
    `
  }
  return html`
    <div>
      Share a Bag over Dat!
      ${state.key ? 'dat://' + state.key : ''}
    </div>
  `
}
