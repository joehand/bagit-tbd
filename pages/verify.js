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
          <a onclick=${function () {emit('verify:start')}} href="#" class="link blue">(or select a bag directory)</a>
        </h2>
      </div>
    `
  }

  var done = state.verify.done
  var valid = done && !state.verify.invalid
  var invalid = state.verify.invalid

  var bkgColor = 'bg-washed-blue'
  if (invalid) bkgColor = 'bg-light-red'
  else if (valid) bkgColor = 'bg-light-green'

  return html`
    <div class="vh-100 pv5">
      <header class="vh-100 fn fl-ns w-35-ns ph4">
        <h2 class="f4 mid-gray lh-title">
          Verifying Bag!
        </h2>
        <time class="f6 ttu tracked gray">${state.verify.name}</time>
      </header>
      <div class="avenir fn fl-ns w-65-ns">
        <h4 class="w-100 f5 tc ${bkgColor}">${state.verify.done
          ? state.verify.invalid
          ? 'INVALID BAG'
          : 'VALID BAG'
            : `${state.verify.todo} hashes to check`
        }</h4>
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
