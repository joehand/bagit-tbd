'use strict'

const html = require('choo/html')
const assert = require('assert')
const css = require('sheetify')

module.exports = headerElement

const header = css `
  :host {
    -webkit-app-region: drag;
    height: 2.5rem;
    padding: .25rem .75rem;
    z-index:5;
  }
`

function headerElement (props) {
  return html`
    <header class="${header} sans-serif bg-near-black fixed top-0">
      <div class="dt dt--fixed w-80 center h-100">
        <a onclick=${props.oncreate} class="dtc-ns tc br1 grow pointer ${props.view === 'create' ? 'bg-white-10' : ''}">
          <span class="link dim white small-caps f4 v-mid" href="#">Create</span>
        </a>
        <a onclick=${props.onsend} class="dtc-ns tc br1 grow pointer ${props.view === 'send' ? 'bg-white-10' : ''}">
          <span class="link dim white small-caps f4 v-mid" href="#">Send</span>
        </a>
        <a onclick=${props.onverify} class="dtc-ns tc br1 grow pointer ${props.view === 'verify' ? 'bg-white-10' : ''}">
          <span class="link dim white small-caps f4 v-mid" href="#">Verify</span>
        </a>
      </div>
    </header>
  `
}