# Fork Sync
[![Build](https://github.com/tg908/fork-sync/workflows/PR%20Checks/badge.svg)](https://github.com/tg908/fork-sync/actions?workflow=PR%20Checks)
![Version](https://img.shields.io/github/v/release/tg908/fork-sync?style=flat-square)

Github action to sync your Forks.
This action uses octokit and the GitHub API to automatically create and merge a pull request with the head defined by `head` into the base defined by `base`. The head branch owner is defined by `owner`. If you create a PR in the same repository you can omit the `owner` parameter.

# Example Workflow

```yml
name: Sync Fork

on:
  schedule:
    - cron: '*/30 * * * *' # every 30 minutes
  workflow_dispatch: # on button click

jobs:
  sync:

    runs-on: ubuntu-latest

    steps:
      - uses: tgymnich/fork-sync@v1.3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          owner: llvm
          base: master
          head: master
```

## Auto approve

If you use a workflow which does not allow to merge pull requests without a review 
("Require pull request reviews before merging" in your [repo settings](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/configuring-protected-branches))
you can set `auto_approve` to `true`. In that case you'll have to provide a [personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)
for a user which is allowed to review the pull requests changes. Make sure the token has at least
`public_repo` permissions and store the token inside of the [repository secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository).

An example workflow would then look like this:

```yml
name: Sync Fork

on:
  schedule:
    - cron: '*/30 * * * *' # every 30 minutes
  workflow_dispatch: # on button click

jobs:
  sync:

    runs-on: ubuntu-latest

    steps:
      - uses: tgymnich/fork-sync@v1.3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          owner: llvm
          base: master
          head: master
          auto_approve: true
          personal_token: ${{ secrets.PERSONAL_TOKEN }}
```

# Parameters

|  name           |   Optional  |   Default              |   description                                        |
|---              |---          |---                     |---                                                   |
|   owner         | ✅          | $current_repo_owner    |   Owner of the forked repository                     |
|   token         | ✅          | ${{ github.token }}    |   Token  to access the Github API                    |
|   head          | ✅          | master                 |   Head branch                                        |
|   base          | ✅          | master                 |   Base branch                                        |
|   merge_method  | ✅          | merge                  |   merge, rebase or squash                            |
|   pr_title      | ✅          | Fork Sync              |   Title of the created pull request                  |
|   pr_message    | ✅          |                        |   Message of the created pull request                |
|   ignore_fail   | ✅          |                        |   Ignore Exceptions                                  |
|   auto_approve  | ✅ *        | `false`                |   Automatically approve pull request before merge    |

⚠️ $current_repo_owner is your own username!

⚠️ Only provide the branch name for `head` and `base`. `user:branch` will not work! 

⚠️ * if `auto_approve` is set to `true` you must provide a personal access token in `token` the default github token won't work! 
