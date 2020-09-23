#!/usr/bin/env node
const argv = require('yargs')
  .demandOption(['gh-token', 'owner', 'repo'])
  .option('gh-approval-token', {
    description: 'gh token to auto approve the opened pull request',
    type: 'string'
  })
  .option('file', {
    description: 'append an empty space space to this file (one needs a file diff to create a bump PR)',
    type: 'string',
    default: 'README.md'
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