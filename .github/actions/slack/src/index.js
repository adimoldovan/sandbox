const { setFailed, getInput } = require( '@actions/core' );
const { context, getOctokit } = require( '@actions/github' );
const { WebClient, retryPolicies, LogLevel } = require( '@slack/web-api' );

( async function main() {
	const ghToken = getInput( 'github_token' );
	if ( ! ghToken ) {
		setFailed( 'main: Input `github_token` is required' );
		return;
	}

	const token = getInput( 'slack_token' );
	if ( ! token ) {
		setFailed( 'Input `slack_token` is required' );
		return;
	}

	const channel = getInput( 'slack_channel_id' );
	if ( ! channel ) {
		setFailed( 'Input `slack_channel_id` is required' );
		return;
	}

	// process.stdout.write(JSON.stringify(context));

	const octokit = new getOctokit( ghToken );

	const run = octokit.rest.actions.getWorkflowRun({
		owner: context.payload.repository.owner.login,
		repo: context.payload.repository.name,
		run_id: context.runId,
	  });

	process.stdout.write(JSON.stringify(run));

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
