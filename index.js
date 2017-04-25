const defaultMenu = require('electron-default-menu')
const { app, shell, Menu, ipcMain } = require('electron')
const window = require('electron-window')
const Env = require('envobj')
const path = require('path')

const windowStyles = {
  width: 800,
  height: 600,
  titleBarStyle: 'hidden-inset',
  // backgroundColor: colors.neutral
}

const env = Env({ NODE_ENV: 'production' })
let mainWindow

const shouldQuit = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (shouldQuit) app.quit()

function onReady () {
  mainWindow = window.createWindow(windowStyles)
  const indexPath = path.join(__dirname, 'index.html')
  const log = str => mainWindow.webContents.send('log', str)

  ipcMain.on('quit', () => app.quit()) // TODO: ping backend with error

  mainWindow.showUrl(indexPath, () => {
    if (env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools({ mode: 'detach' })
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  if (env.NODE_ENV !== 'production') {
    const browserify = require('./lib/browserify')
    const b = browserify({ watch: true })
    b.once('written', onReady)
  } else {
    onReady()
  }
})

app.on('window-all-closed', () => app.quit())
