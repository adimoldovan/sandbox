module.exports = {
    apps: [
        {
            script: 'src/tunnel.js',
            name: 'tunnel-test',
            args: 'on',
            log_file: 'output/logs/tunnel.log',
            time: true,
            auto_restart: false,
        },
    ],
};