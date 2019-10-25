const _ = require('lodash')
const semver = require('semver')
const Octokit = require('./octokit')

// @return {'tag': '1.0.1', 'sha': '1234'}
const getHighestTag = async ({repo, owner, o}) => {
  const tagsRaw = await o.getTagsByPage({repo, owner, page: 1, perPage: 5})
  return _
    .chain(tagsRaw.data)
    .map((tag) => {
      return {
        'tag': tag.name,
        'sha': tag.commit.sha
      }
    })
    .reduce((biggest, tag) => {
      if (semver.valid(tag.tag) && semver.gte(tag.tag, biggest.tag)) {
        return tag
      }
      return biggest
    }, {'tag': '0.0.1', 'sha': '0000'})
    .value()
}

const getNextMinorTag = ({tag}) => {
  return semver.inc(tag, 'minor')
}

// main application
module.exports = async ({owner, repo, token}) => {
  const o = new Octokit(token)

  const baseTagCommit = await getHighestTag({repo, owner, o})
  const bumpTo = getNextMinorTag({tag: baseTagCommit.tag})

  // get README.md
  const readmeBase64 = await o.getReadme({owner, repo})

  // add an empty line to the readme to have a code diff for the upcoming pull request
  const readme = Buffer.from(readmeBase64.data.content, 'base64').toString('ascii')
  const newLineReadme = `\n ${readme}`
  const newLineReadmeEncoded = Buffer.from(newLineReadme).toString('base64')

  // create new release-branch
  console.log(`try to create branch "bump-${bumpTo}"`)
  await o.createBranch({
    owner,
    repo,
    ref: `refs/heads/bump-${bumpTo}`,
    sha: baseTagCommit.sha
  })

  // add a new commit to the release-branch
  await o.updateReadme({
    owner,
    repo,
    path: readmeBase64.data.path,
    message: `feat(release-management): Bump minor version to ${bumpTo} for release management`,
    content: newLineReadmeEncoded,
    sha: readmeBase64.data.sha,
    branch: `bump-${bumpTo}`
  })

  // create the bump pull request
  const pullRequest = await o.createPullRequest({
    owner,
    repo,
    title: `Bump minor version to ${bumpTo} for release management`,
    head: `bump-${bumpTo}`,
    base: 'master',
    body: `## Description
      Bump minor version to ${bumpTo} for release management`
  })

  // response format https://developer.github.com/v3/pulls/#create-a-pull-request
  return pullRequest
}
