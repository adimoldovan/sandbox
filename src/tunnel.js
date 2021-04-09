#!/usr/bin/env node

const fs = require('fs');
const tunnelConfig = { port: 8889, host: 'https://loca.lt' };
const axios = require('axios');
const yargs = require('yargs');
const localtunnel = require('localtunnel');

// eslint-disable-next-line no-unused-expressions
yargs
    .usage('Usage: $0 <cmd>')
    .demandCommand(1, 1)
    .command(
        'on',
        'Opens a local tunnel',
        () => { },
        async () => await tunnelOn()
    )
    .command(
        'off',
        'Closes a local tunnel',
        () => { },
        async () => await tunnelOff()
    )
    .help('h')
    .alias('h', 'help').argv;

async function tunnelOn() {
    const subdomain = await getTunnelSubdomain();

    if (!(await isTunnelOn(subdomain))) {
        console.log(`Opening tunnel. Subdomain: '${subdomain}'`);
        const tunnel = await localtunnel({
            host: tunnelConfig.host,
            port: tunnelConfig.port,
            subdomain,
        });

        tunnel.on('close', () => {
            console.log(`${tunnel.clientId} tunnel closed`);
        });

        fs.writeFileSync('tunnel-url', tunnel.url);
        console.log(`Opened tunnel for '${tunnel.clientId}'`);
    }

    if (process.send) {
        process.send('ready');
    }
}

async function tunnelOff() {
    const subdomain = await getTunnelSubdomain();

    if (subdomain) {
        console.log(`Closing tunnel ${subdomain}`);
        try {
            const res = await axios.get(`${tunnelConfig.host}/api/tunnels/${subdomain}/delete`);
            console.log(JSON.stringify(res.data));
        } catch (error) {
            console.error(error.message);
        }
    }
}

async function isTunnelOn(subdomain) {
    console.log(`Checking if tunnel for ${subdomain} is on`);
    const statusCode = await getTunnelStatus(subdomain);

    const isOn = statusCode === 200;
    let status = 'OFF';
    if (isOn) {
        status = 'ON';
    }
    console.log(`Tunnel for ${subdomain} is ${status} (${statusCode})`);
    return isOn;
}

async function getTunnelStatus(subdomain) {
    let responseStatusCode;

    if (!subdomain) {
        console.log('Cannot check tunnel for undefined subdomain!');
        responseStatusCode = 404;
    } else {
        try {
            const res = await axios.get(`${tunnelConfig.host}/api/tunnels/${subdomain}/status`);
            console.log(res.status);
            responseStatusCode = res.status;
        } catch (error) {
            console.error(error.message);
        }
    }
    return responseStatusCode;
}

async function getTunnelSubdomain() {
    return 'sandbox-sub-99';
}
