const localtunnel = require('localtunnel');
const fs = require('fs');

const tunnel = await localtunnel();
console.log(`Opened tunnel for '${tunnel.clientId}', url: '${tunnel.url}'`);
fs.writeFileSync('tunnel-url', tunnel.url);
process.send('ready');