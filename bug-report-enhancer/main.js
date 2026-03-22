const { app, BrowserWindow } = require("electron");
const path = require("path");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const log = require("electron-log");

const dev = !app.isPackaged;
const hostname = "localhost";
const port = 3000;

// Log configuration for easier debugging in production
log.transports.file.level = "info";

// In production, Next.js standalone server handles the running.
// If dev, we use next() wrapper
let nextApp;
let handle;

if (dev) {
    nextApp = next({ dev, hostname, port });
    handle = nextApp.getRequestHandler();
}

async function startNextJSServer() {
    if (dev) {
        await nextApp.prepare();
        createServer((req, res) => {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl);
        }).listen(port, () => {
            console.log(
                `> Ready on http://${hostname}:${port} as ${dev ? "development" : process.env.NODE_ENV
                }`
            );
        });
    } else {
        // In production, we start the standalone server that next build generates
        log.info("Starting Next.js standalone server...");

        // The standalone server is usually in `.next/standalone`
        // We adjust the path depending on electron-builder structure
        const serverPath = path.join(__dirname, ".next", "standalone", "server.js");

        try {
            // We set the PORT environment variable before starting the server
            process.env.PORT = port.toString();
            require(serverPath);
            log.info("Next.js standalone server started successfully.");
        } catch (err) {
            log.error("Failed to start standalone server", err);
        }
    }
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        title: "Bug Report Enhancer",
    });

    // Remove menu bar for a cleaner look
    mainWindow.setMenuBarVisibility(false);

    // Load the Next.js app
    // Allow some time for the server to start before loading
    if (dev) {
        mainWindow.loadURL(`http://${hostname}:${port}`);
        mainWindow.webContents.openDevTools();
    } else {
        // in prod we can wait a bit or just load
        setTimeout(() => {
            mainWindow.loadURL(`http://${hostname}:${port}`);
        }, 1000); // 1s buffer for server to start
    }

}

app.whenReady().then(async () => {
    await startNextJSServer();
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
