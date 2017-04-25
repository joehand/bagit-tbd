'use strict'

const html = require('choo/html')
const assert = require('assert')
const css = require('sheetify')

module.exports = fileImport

const importer = css `
  :host {
    .file-list {
      overflow-y: scroll;
    }
  }
`

function fileImport (props) {
  if (!props.imported || !props.put) return ''
  if (!props.imported.length) return fileUI(props.put.name)

  return html`
    <div class="${importer} pa3 center">
      <h2 class="f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
        Creating bag <b>${props.name}</b> in ${props.bagDir}
      </h2>
      ${fileUI(props.put.name)}
      <ul class="file-list list pl0 measure center">
        ${props.imported.map((file) => {
          return html`
            <li class="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
              ${file.name}
            </li>
          `
        })}
      </ul>
    </div>
  `

  function fileUI (name) {
    return html`
      <div>
        IMPORTING: ${name}
      </div>
    `
  }
}
