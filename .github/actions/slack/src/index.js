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

	process.stdout.write(JSON.stringify(context));

	const octokit = new getOctokit( ghToken );

	const response = await octokit.rest.actions.listJobsForWorkflowRun({
		owner: context.payload.repository.owner.login,
		repo: context.payload.repository.name,
		run_id: context.runId,
	  });

	process.stdout.write(JSON.stringify(response));

	const conclusions = [...new Set(response.data.jobs.filter(job => job.status === 'completed').map(job => job.conclusion))]
	
	const isFailure = !! conclusions.some(conclusions => conclusions != 'success')

	process.stdout.write(JSON.stringify(conclusions));

	const status = isFailure ? 'failed' : 'passed';
	let event = context.sha;

	if (context.eventName === 'pull_request') {
		const {pr} = context.payload.pull_request;
		event = `PR ${pr.title} (${pr.number})`;
	}

	if (context.eventName === 'push') {
		event = `commit id ${context.sha} on branch ${context.ref.substring( 11 )}`;
	}

	const text = `Tests ${status} for ${event}`;

	const client = new WebClient( token, {
		retryConfig: retryPolicies.rapidRetryPolicy,
		logLevel: LogLevel.ERROR,
	} );

	await client.chat.postMessage( {
		text,
		channel,
		username: 'Reporter',
		icon_emoji: ':bot:',
	} );
} )();
