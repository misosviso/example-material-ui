import NetlifyGraph, { FetchHeadOidInput } from './graph';

export const fetchHeadOid = async function(event, repo, name) {

  const input: FetchHeadOidInput = {
    repository: repo,
    owner: name
  };

  const accessToken = event.authlifyToken;
  const {errors, data} = await NetlifyGraph.fetchHeadOid(input, {accessToken: accessToken})

  console.log(accessToken)
  console.log(NetlifyGraph.fetchHeadOid)

  return {errors: errors, data: data}
}