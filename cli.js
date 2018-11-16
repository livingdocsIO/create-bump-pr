#!/usr/bin/env node

const argv = require('yargs')
  .demandOption(['token', 'owner', 'repo'])
  .argv
const run = require('./index')
const {token, owner, repo} = argv

run({token, owner, repo})
  .then((pullRequest) => {
    console.log(`The PR for the release-management bump has been opened at
      ${pullRequest.data.html_url}`)
  })
  .catch((e) => {
    console.log(e.message)
  })
