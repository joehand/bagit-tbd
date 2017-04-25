const log = require('choo-log')
const css = require('sheetify')
const choo = require('choo')
const xtend = require('xtend')

css('tachyons')
css('./public/css/base.css')

const app = choo()

if (process.env.NODE_ENV === 'development') {
  app.use(log())
}

app.use(require('./models/drag-drop'))
app.use(require('./models/verify'))
app.use(require('./models/create'))
app.use(require('./models/send'))
app.use(function (state, bus) {
  if (!state.view) state.view = 'verify'
  bus.on('view:create', () => {
    state.view = 'create'
    bus.emit('render')
  })
  bus.on('view:send', () => {
    state.view = 'send'
    bus.emit('render')
  })
  bus.on('view:verify', () => {
    state.view = 'verify'
    bus.emit('render')
  })
  bus.on('drop', (dirname) => {
    switch (state.view) {
      case 'create':
        return bus.emit('bag:create', dirname)
      case 'verify':
        return bus.emit('bag:verify', dirname)
    }
  })
})

app.route('/', require('./pages/main'))

app.mount('body div')
