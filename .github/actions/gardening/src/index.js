const { getInput } = require( '@actions/core' );
const { context, getOctokit } = require( '@actions/github' );


( async function main() {
	const token = getInput( 'github_token' );
	if ( ! token ) {
		setFailed( 'main: Input `github_token` is required' );
		return;
	}

	const octokit = new getOctokit( token );
	
	console.log(context);

	const { number, repository, pull_request } = context.payload;
	const { owner, name } = repository;
	const labels = new Set();

	const isDraft = !! (pull_request && pull_request.draft);
	console.log(isDraft);

	if(isDraft) {
		console.log('This PR is a draft');
		labels.add('in progress');
	} else {
		console.log('This PR is a ready to review (not a draft)');
	}

	if(labels.size > 0) {
		await octokit.rest.issues.addLabels( {
			owner: owner.login,
			repo: name,
			issue_number: number,
			labels: [...labels],
		} );
	}
	

} )();
