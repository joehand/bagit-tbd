'use strict'

const html = require('choo/html')
const assert = require('assert')
const css = require('sheetify')

module.exports = headerElement

const header = css `
  :host {
    -webkit-app-region: drag;
  }
`

function headerElement (props) {
  return html`
    <footer class="cf fixed bottom-0 w-100 ph2 pv2 bt b--black-10 black-70">
      <nav class="fr">
        <a class="f6 link bg-animate black-80 hover-bg-lightest-blue dib pa2" href="/">About</a>
        <a class="f6 link bg-animate black-80 hover-bg-light-green dib pa2" href="/portfolio">Github</a>
      </nav>
      <p class="link b f3 dim black-70 lh-solid">TBD</a>
      <p class="f6 db b lh-solid">BagIt Manufacturing & Shipping</p>
    </footer>
  `
}