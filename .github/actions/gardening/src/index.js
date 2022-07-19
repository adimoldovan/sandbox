const { getInput } = require( '@actions/core' );
const { context, getOctokit } = require( '@actions/github' );


( async function main() {
	const token = getInput( 'github_token' );
	if ( ! token ) {
		setFailed( 'main: Input `github_token` is required' );
		return;
	}

	const octokit = new getOctokit( token );
	
	console.log(context.payload);

	const { number, repository, pull_request } = context.payload;
	const { owner, name } = repository;
	const labels = new Set();

	if(pull_request && pull_request.draft) {
		console.log('This PR is a draft');
		labels.add('in progress');
	} else {
		console.log('This PR is a ready to review (not a draft)');
	}

	await octokit.rest.issues.addLabels( {
		owner: owner.login,
		repo: name,
		issue_number: number,
		labels: [...labels],
	} );

} )();
