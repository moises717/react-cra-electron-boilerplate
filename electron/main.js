const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({ width: 600, height: 600, show: false });
	mainWindow.loadURL(
		!app.isPackaged
			? "http://localhost:3000"
			: url.format({
					pathname: path.join(__dirname, "../index.html"),
					protocol: "file:",
					slashes: true
			  })
	);

	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
	});

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});
