import NetlifyGraph from './graph'

export const fetchHeadOid = async function(event) {

  const accessToken = event.authlifyToken;
  const {errors, data} = await NetlifyGraph.fetchFetchHeadOid({/* variables */}, {accessToken: accessToken})

  // return {
  //   statusCode: errors ? 500 : 200,
  //   body: JSON.stringify(errors || data),
  //   headers: {"Content-Type": "application/json"}
  // }

  return {errors: errors, data: data}
}