#!/usr/bin/env node

const localtunnel = require('localtunnel');
const fs = require('fs');

(async () => {
    const tunnel = await localtunnel();
    console.log(`Opened tunnel for '${tunnel.clientId}', url: '${tunnel.url}'`);
    fs.writeFileSync('tunnel-url', tunnel.url);
    console.log("wrote url to file");
    process.send( 'ready' );
})();
