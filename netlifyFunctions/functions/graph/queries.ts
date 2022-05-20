export const operationsDoc = `
mutation CommitAddition($contents: GitHubBase64String = "", $branchName: String = "", $repositoryNameWithOwner: String = "", $clientMutationId: String = "", $headline: String = "", $contents1: GitHubBase64String = "", $path: String = "", $expectedHeadOid: GitHubGitObjectID = null) @netlify(id: """2c9d16fa-b843-48a6-85df-8c3aca9d1882""", doc: """An empty mutation to start from""") {
  gitHub {
    createCommitOnBranch(
      input: {
        branch: {
          branchName: $branchName, 
          repositoryNameWithOwner: $repositoryNameWithOwner
        }, 
        fileChanges: {
          additions: {
            contents: $contents1, path: $path
          }
        }, 
        message: {
          headline: $headline
        }, 
        expectedHeadOid: $expectedHeadOid
      }
    ) {
      clientMutationId
    }
  }
}

query fetchHeadOid($repository: String = "", $owner: String = "") @netlify() {
  gitHub {
    repository(name: $repository, owner: $owner) {
      refs(refPrefix: "refs/heads/", first: 10) {
        edges {
          node {
            name
            target {
              oid
            }
          }
        }
      }
    }
  }
}
`