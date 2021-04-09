module.exports = {
	apps: [
		{
			script: 'tunnel.js',
			name: 'tunnel-test',
			log_file: 'output/logs/tunnel.log',
			time: true,
			wait_ready: true,
			listen_timeout: 15000,
		},
	],
};