const { setFailed, getInput } = require( '@actions/core' );
const { context } = require( '@actions/github' );
const { WebClient, retryPolicies, LogLevel } = require( '@slack/web-api' );

( async function main() {
	const token = getInput( 'slack_token' );
	if ( ! token ) {
		setFailed( 'Input `slack_token` is required' );
		return;
	}

	const channel = getInput( 'slack_channel' );
	if ( ! channel ) {
		setFailed( 'Input `slack_channel` is required' );
		return;
	}

	process.stdout.write(`${ context.eventName }'`);

	const client = new WebClient( token, {
		retryConfig: retryPolicies.rapidRetryPolicy,
		logLevel: LogLevel.ERROR,
	} );

	if(context.eventName === 'pull_request') {

	}

	await client.chat.postMessage( {
		text: `Received event = '${ context.eventName }', action = '${ context.payload.action }'`,
		channel,
		username: 'Reporter',
		icon_emoji: ':wave:',
	} );
} )();
