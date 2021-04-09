module.exports = {
	apps: [
		{
			script: 'src/tunnel.js',
			name: 'tunnel-test',
			log_file: 'output/logs/tunnel.log',
			time: true,
		},
	],
};