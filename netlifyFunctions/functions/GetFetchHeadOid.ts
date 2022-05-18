import NetlifyGraph, { FetchHeadOidInput } from './graph';

export const fetchHeadOid = async function(event) {

  const input: FetchHeadOidInput = {
    repository: ' example-material-ui',
    owner: 'misosviso'
  };

  const accessToken = event.authlifyToken;
  const {errors, data} = await NetlifyGraph.fetchFetchHeadOid(input, {accessToken: accessToken})

  return {errors: errors, data: data}
}