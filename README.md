# Fork Sync
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ftg908%2Ffork-sync%2Fbadge%3Fref%3Dmaster&style=flat-square)](https://actions-badge.atrox.dev/tg908/fork-sync/goto?ref=master)  ![Version](https://img.shields.io/github/v/release/tg908/fork-sync?style=flat-square)

Github action to sync your Forks.
This action automatically creates and merges a pull request with the head defined by `ownwer`:`head` into the base defined by `base`. If you create a PR in the same repository you can omit the `owner` parameter.

# Example Workflow

```
name: Sync Fork

on:
  schedule:
  - cron: '*/30 * * * *'

jobs:
  sync:

    runs-on: ubuntu-latest
    
    steps:
    - uses: TG908/fork-sync@v1.1.2
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        owner: llvm
        base: master
        head: master
```
# Parameters

|  name 	        |   Optional  |   Default              |   description	                       |
|---	            |---          |---                     |---	                                   |
|   owner	        | ✅          | $current_repo_owner    |   Owner of the forked repository	    |
|   github_token	| ❌          |                        |   Token  to access the Github API	    |
|   head          | ✅          | master                 |   Head branch	                        |
|   base          | ✅          | master                 |   Base branch	                        |
|   merge_method  | ✅          | merge                  |   merge, rebase or squash            	|
|   pr_title      | ✅          | Fork Sync              |   Title of the created pull request	  |
|   pr_message    | ✅    	     |                        |   Message of the created pull request	|
