const { app, BrowserWindow } = require('electron')
const path = require('path')
const db = require("./config/db.config");
const student = db.student;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('src/views/index.html')
}


db.sequelize.sync().then(() => {
    app.whenReady().then(() => {
        createWindow()
        db.student.findAll()
            .then(student => {
                console.log(student);
            })



        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            }
        })
    })
});



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})