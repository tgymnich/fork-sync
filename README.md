# Fork Sync

Github action to sync your Forks.
This action automatically creates and merges a pull request with the head defined by `origin_branch` from owner into the base defined by `destination_branch`.

# Example Workflow

```
name: Sync Fork

on:
  schedule:
  - cron: 0 2 * * 1-5

jobs:
  sync:

    runs-on: ubuntu-latest
    
    steps:
    - uses: TG908/fork-sync@v1
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        owner: llvm
        destination_branch: master
        origin_branch: master
```

# Options

|  name 	                                        |   description	                        |
|---	                                            |---	                                |
|   owner (optional)	                            |   Owner of the forked repository	    |
|   github_token	                                |   Token  to access the Github API	    |
|   origin_branch (optional, default = master)	    |   Head branch	                        |
|   destination_branch (optional, default = master)	|   Base branch	                        |
|   merge_method (optional, default = rebase)       |   merge, rebase or squash            	|
|   pr_title (optional, default = Fork Sync)        |   Title of the created pull request	|
|   pr_message                                  	|   Message of the created pull request	|
