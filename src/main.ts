import * as core from '@actions/core';
const github = require('@actions/github');

const githubToken = core.getInput('github_token');
const context = github.context;
const octokit = new github.GitHub(githubToken);

async function run() {
  try {
    const owner = core.getInput('owner') || context.repo.owner;
    const destinationBranch = core.getInput('destination_branch');
    const originBranch = core.getInput('origin_branch');
    const mergeMethod = core.getInput('merge_method');
    const prTitle = core.getInput('pr_title');
    const prMessage = core.getInput('pr_message');

    await octokit.pulls.create({owner: context.repo.owner, repo: context.repo.repo, title: prTitle, head: owner+':'+originBranch, base: destinationBranch, body: prMessage, merge_method: mergeMethod})
      .then((pr) => {
        octokit.pulls.merge({owner: context.repo.owner, repo: context.repo.repo, pull_number: pr.data.number});
      })
      .catch((err) => {
        core.setFailed(err.message);
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();