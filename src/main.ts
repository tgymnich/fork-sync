import * as core from '@actions/core';
const github = require('@actions/github');

const myToken = core.getInput('github-token');
const context = github.context;
const octokit = new github.GitHub(myToken);

async function run() {
  try {
    const owner = core.getInput('owner');
    const destinationBranch = core.getInput('destinationBranch');
    const originBranch = core.getInput('originBranch');
    const mergeMethod = core.getInput('mergeMethod');

    octokit.pulls.create({owner: context.repo.owner, repo: context.repo.repo, title: 'Sync Fork', head: owner+':'+originBranch, base: destinationBranch, merge_method: mergeMethod})
    .then(pr => octokit.pulls.merge({owner: pr.data.user.login, repo: context.repo.repo, pull_number: pr.data.number}));

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
