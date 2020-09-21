#!/usr/bin/env node
const argv = require('yargs')
  .demandOption(['gh-token', 'owner', 'repo'])
  .option('gh-approval-token', {
    description: 'gh token to auto approve the opened pull request',
    type: 'string'
  })
  .help(false)
  .version(false)
  .argv
const run = require('./index')

run(argv)
  .then((pullRequest) => {
      console.log(`
        The PR for the release-management bump has been opened at
        ${pullRequest.html_url}
      `)
  })
  .catch((e) => {
    console.log(e.message)
    process.exit(1)
  })