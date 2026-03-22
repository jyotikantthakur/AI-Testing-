const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(__dirname, '..', '.next', 'standalone');
const publicDir = path.join(__dirname, '..', 'public');
const staticDir = path.join(__dirname, '..', '.next', 'static');

const destPublicDir = path.join(standaloneDir, 'public');
const destStaticDir = path.join(standaloneDir, '.next', 'static');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

console.log('Copying public directory to standalone...');
if (fs.existsSync(publicDir)) {
    copyRecursiveSync(publicDir, destPublicDir);
}

console.log('Copying static directory to standalone...');
if (fs.existsSync(staticDir)) {
    copyRecursiveSync(staticDir, destStaticDir);
}

console.log('Standalone build preparation complete.');
