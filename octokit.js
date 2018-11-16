const octokit = require('@octokit/rest')()

module.exports = class Octokit {

  constructor (token) {
    if (token) {
      octokit.authenticate({
        type: 'oauth',
        token: token
      })
    }
  }

  async createPullRequest ({owner, repo, title, head, base, body}) {
    return await octokit.pullRequests.create({
      owner: owner,
      repo: repo,
      title: title,
      head: head,
      base: base,
      body: body,
      maintainer_can_modify: true
    })
  }

  async getTagsByPage ({repo, owner, page, perPage}) {
    return await octokit.repos.getTags({
      owner: owner,
      repo: repo,
      per_page: perPage,
      page: page
    })
  }

  async getReadme ({owner, repo}) {
    return await octokit.repos.getReadme({
      owner: owner,
      repo: repo
    })
  }

  async updateReadme ({owner, repo, path, message, content, sha, branch}) {
    return await octokit.repos.updateFile({
      owner,
      repo,
      path,
      message,
      content,
      sha,
      branch
    })
  }

  // ref: name of the new branch
  //   e.g. '/refs/heads/my-new-branch'
  // sha: sha of the base commit
  async createBranch ({owner, repo, ref, sha}) {
    return await octokit.gitdata.createReference({
      owner,
      repo,
      ref,
      sha
    })
  }
}
