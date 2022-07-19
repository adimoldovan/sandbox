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
} )();
