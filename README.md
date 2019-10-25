# Description

A simple CLI command to create a semantic-release minor bump pull request.

#### Workflow
- take the latest tag in your repository
- update your README.md with an empty line
- create a minor version bump pull-request to incite a new minor version


# Example

### via CLI

```bash
npx @daraff/create-bump-pr --token=<your-gh-token> --owner=<gh-owner> --repo=<gh-repo>
```
