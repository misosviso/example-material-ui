const fs = require('fs');



exports.generateNetlifyFunctions = () => {

  const branch = process.env.BRANCH
  const repoNameWithOwner = process.env.REPOSITORY_URL?.toString().replace('https://github.com/','')

  const executeCommitAddition = `
  import { executeCommit } from "../../netlifyFunctions/functions/ExecuteCommitAddition"

  export const handler = async function (event, context) {
    
    let response = await executeCommit(event, ${branch}, ${repoNameWithOwner})

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        ExecuteCommitErrors: response.errors,
        ExecuteCommitData: response.data
      }),
      headers: {
        'content-type': 'application/json'
      }
    }
  }`

  const fetchHeadOid = `import { fetchHeadOid } from "../../netlifyFunctions/functions/GetFetchHeadOid"

  export const handler = async function (event, context) {
    
    let response = await fetchHeadOid(event)
    console.log(response)

    return {
      statusCode: response.errors ? 500 : 200,
      body: JSON.stringify(response.errors || response.data),
      headers: {"Content-Type": "application/json"}
    }
  }`

  fs.mkdir('./netlify', (err) => {
    if (err) {
      return console.error(err);
    }

    fs.mkdir('./netlify/functions', (err) => {

      console.log('Directory created netlify/functions successfully!');

      // fs.mkdir('./netlify/functions/netlifyGraph', (err) => {
      //   if (err) {
      //     return console.error(err);
      //   }
      //   console.log(
      //     'Directory netlify/functions/netlifyGraph created successfully!'
      //   );
      //   fs.writeFileSync('./netlify/functions/netlifyGraph/index.js', indexJs);
      // });

      fs.writeFileSync(
        './netlify/functions/GetFetchHeadOid.ts',
        fetchHeadOid
      );

      fs.writeFileSync(
        './netlify/functions/ExecuteCommitAddition.ts',
        executeCommitAddition
      );

    });
  });
};
