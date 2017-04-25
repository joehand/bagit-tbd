'use strict'

const html = require('choo/html')

module.exports = verifyView

function verifyView (state, emit) {
  if (!state.verify.name) {
    return html`<div class="dtc v-mid tc ph4">
        <h1 class="f3 f2-m f1-l fw2 black-90 mv3">
          Drop a Bag Here to Verify!
        </h1>
        <h2 class="f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
          <a onclick=${function () {emit('verify:start')}} href="#" class="link blue">(or open file dialog)</a>
        </h2>
      </div>
    `
  }

  return html`
    <div class="cf ph2 ph5-ns pv5">
      <header class="fn fl-ns w-35-ns pr5-ns">
        <h2 class="f3 mid-gray lh-title">
          Verifying Bag!
        </h2>
        <time class="f6 ttu tracked gray">/${state.verify.name}</time>
        <h4 class="f5">${state.verify.done
          ? state.verify.invalid
          ? 'INVALID BAG'
          : 'VALID BAG'
            : 'TODO: ' + state.verify.todo
        }</h4>
      </header>
      <div class="avenir fn fl-ns w-65-ns">
        ${state.verify.results.map(result => {
          if (result.indexOf('TAP') > -1) return
          if (result[0] === '#') {
            return html`<dl class="f6 lh-title mv2">
              <dt class="ttu dib b">${result}</dt></dl>`
          }
          var status = result.split(/[0-9]+/)[0]
          var number = result.match(/\d+/)
          var title = result.split(/[0-9]+(.+)/)[1]
          return html`<dl class="f6 lh-title mv2">
            <dt class="ttu dib b">${status}</dt>
            <dd class="dib ml0 gray">${title}</dd>
          </dl>`
        })}
      </div>
    </div>
  `
}
