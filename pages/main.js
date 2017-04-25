'use strict'

const html = require('choo/html')

const createPage = require('./create')
const sendPage = require('./send')
const verifyPage = require('./verify')
const Header = require('../elements/header')
const Footer = require('../elements/footer')
const FileImport = require('../elements/file-import')

module.exports = mainView

function mainView (state, emit) {
  document.title = 'BagIt - TBD'
  console.log(state)

  return html`
    <div class="pv5">
      ${Header({
        view: state.view,
        oncreate: () => emit('view:create'),
        onsend: () => emit('view:send'),
        onverify: () => emit('view:verify')
      })}
      <div class="vh-75 dt w-100">
        ${view()}
      </div>
      <div>
        ${Footer()}
      </div>
    </div>
  `

  function view () {
    switch (state.view) {
      case 'create':
        return createPage(state, emit)
      case 'send':
        return sendPage(state, emit)
      case 'verify':
        return verifyPage(state, emit)
      default:
        return html`<div>Error</div>`
    }
  }
}
