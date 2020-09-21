var request = require('request-promise');

// https://docs.github.com/en/rest/reference/repos#list-repository-tags
// https://api.github.com/repos/livingdocsio/livingdocs-server/tags?access_token=1234
//
// @return base64 encoded README.md
module.exports = async ({owner, repo, token}) => {
  try {
    return await request({
      uri: `https://api.github.com/repos/${owner}/${repo}/readme`,
      qs: { access_token: token},
      headers: { 'User-Agent': 'Request-Promise' },
      json: true
    })
  } catch (error) {
    throw error
  }
}