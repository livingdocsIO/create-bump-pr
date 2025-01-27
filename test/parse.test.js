'use strict'

const fs = require('fs')
const chai = require('chai')
const expect = chai.expect

const {parse} = require('comment-json')
const JSON5 = require('json5')

describe('parses a JSON file correctly:', function () {
  it('with doubleQuotes', async function () {
    const fixture = './test/parse.input.doubleQuotes.json'
    const jason5raw = fs.readFileSync(fixture, 'utf-8').toString()
    const jason5 = JSON5.parse(jason5raw)
    expect(jason5.baseBranches).to.deep.equal(['main', 'release-2025-01-16'])
  })
})

describe('parses a JSON5 file correctly:', function () {
  it('with doubleQuotes', async function () {
    const fixture = './test/parse.input.doubleQuotes.json5'
    const jason5raw = fs.readFileSync(fixture, 'utf-8').toString()
    const jason5 = parse(jason5raw)
    expect(jason5.baseBranches).to.deep.equal(['main', 'release-2025-01-16'])
  })

  // is not supported properly
  it.skip('with singleQuotes', async function () {
    const fixture = './test/parse.input.singleQuotes.json5'
    const jason5raw = fs.readFileSync(fixture, 'utf-8').toString()
    const jason5 = parse(jason5raw)
    expect(jason5.baseBranches).to.deep.equal(['main', 'release-2025-01-16'])
  })

  // is not supported properly
  it.skip('with noQuotes', async function () {
    const fixture = './test/parse.input.noQuotes.json5'
    const jason5raw = fs.readFileSync(fixture, 'utf-8').toString()
    const jason5 = parse(jason5raw)
    expect(jason5.baseBranches).to.deep.equal(['main', 'release-2025-01-16'])
  })
})
