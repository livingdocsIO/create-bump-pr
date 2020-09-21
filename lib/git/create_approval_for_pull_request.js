var request = require('request-promise');

// https://docs.github.com/en/rest/reference/pulls#create-a-review-for-a-pull-request
module.exports = async ({
  owner, repo, token, pull_number, commit_id, event = 'APPROVE'
}) => {
  try {
    return request({
      method: 'POST',
      uri: `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/reviews`,
      body: {commit_id, event},
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