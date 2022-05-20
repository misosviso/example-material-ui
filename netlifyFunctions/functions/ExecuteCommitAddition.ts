import NetlifyGraph, { CommitAdditionInput } from './graph';

export const executeCommit = async function(event, branch, repo){

  const headOid = event.headers.headoid;
  const commitMessage = event.headers.commitmessage;
  const accessToken = event.authlifyToken;
  const content = event.headers.content;
  const path = event.headers.filepath.substring(1);
  const branchName = branch;
  const repositoryNameWithOwner = repo;

  const input: CommitAdditionInput = {
    branchName: branchName,
    repositoryNameWithOwner: repositoryNameWithOwner,
    expectedHeadOid: headOid,
    contents1: content,
    path: path,
    headline: commitMessage
  };

  // @ts-ignore
  const { errors: ExecuteCommitErrors, data: ExecuteCommitData } =
    await NetlifyGraph.executeCommitAddition(input, { accessToken });

  console.log({ errors: ExecuteCommitErrors, data: ExecuteCommitData })

  // return { errors: ExecuteCommitErrors, data: ExecuteCommitData } 

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      ExecuteCommitErrors: ExecuteCommitErrors,
      ExecuteCommitData: ExecuteCommitData 
    }),
    headers: {
      'content-type': 'application/json'
    }
  }
};