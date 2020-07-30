const { app, BrowserWindow, Menu } = require('electron');

function createWindow () {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeINtegration: true
        }
    });

    win.loadFile('index.html');
    win.webContents.openDevTools()
}

app.whenReady().then(createWindow);


app.on('window-all-closes', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

// 自定义dock
const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click () { console.log('New Window') }
    }, {
      label: 'New Window with Settings',
      submenu: [
        { label: 'Basic' },
        { label: 'Pro' }
      ]
    },
    { label: 'New Command...' }
]);
app.dock.setMenu(dockMenu);