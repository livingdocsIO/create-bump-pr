var request = require('request-promise');

// https://docs.github.com/en/rest/reference/repos#list-repository-tags
// https://api.github.com/repos/livingdocsio/livingdocs-server/tags?access_token=1234
//
// @return
// [
//   {
//     "name": "v0.1",
//     "commit": {
//       "sha": "c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc",
//       "url": "https://api.github.com/repos/octocat/Hello-World/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc"
//     }
//   }
// ]
module.exports = async ({owner, repo, token, page = 1, per_page = 10}) => {
  try {
    return await request({
      uri: `https://api.github.com/repos/${owner}/${repo}/tags`,
      qs: { access_token: token, page, per_page },
      headers: { 'User-Agent': 'Request-Promise' },
      json: true
    })

  } catch (error) {
    throw error
  }
}