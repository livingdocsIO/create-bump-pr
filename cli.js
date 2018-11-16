#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 --token [string] --o [string]')
  .demandOption(['token', 'owner', 'repo', 'base-branch'])
  .argv
const run = require('./index')
const {token, owner, repo, baseBranch} = argv

run({token, owner, repo, baseBranch})
  .then((pullRequest) => {
    console.log(`The PR for the release-management bump has been opened at
      ${pullRequest.data.html_url}`)
  })
  .catch((e) => {
    console.log(e.message)
  })
