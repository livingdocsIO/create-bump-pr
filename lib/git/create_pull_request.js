var request = require('request-promise');

// https://docs.github.com/en/rest/reference/pulls#create-a-pull-request
module.exports = async ({
  owner, repo, token, title, head, base, body
}) => {
  try {
    return request({
      method: 'POST',
      uri: `https://api.github.com/repos/${owner}/${repo}/pulls`,
      body: {title, head, base, body},
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'Request-Promise',
      },
      json: true
    })
  } catch (error) {
    throw error
  }
}