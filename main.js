const { app, BrowserWindow } = require('electron')

const url = require('url')

let mainWindow
function createWindow() {
    
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        useContentSize: true
    })
    
    mainWindow.loadURL(url.format({
        pathname: 'index.html',
        protocol: 'file:',
        slashes: true
    }))
    
    mainWindow.on('closed', function() {
        mainWindow = null
    })
    
    mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})