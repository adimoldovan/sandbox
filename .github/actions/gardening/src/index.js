const { getInput } = require( '@actions/core' );
const { context, getOctokit } = require( '@actions/github' );


( async function main() {
	const token = getInput( 'github_token' );
	if ( ! token ) {
		setFailed( 'main: Input `github_token` is required' );
		return;
	}

	const octokit = new getOctokit( token );

	const {pull_request} = context.payload;

	if(pull_request.draft) {
		console.log('This PR is a draft')
	} else {
		console.log('This PR is a ready to review (not a draft)')
	}

    console.log(context.payload);
} )();
