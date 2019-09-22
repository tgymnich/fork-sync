import * as core from '@actions/core';
const github = require('@actions/github');

const githubToken = core.getInput('github_token', {required: true});
const context = github.context;
const octokit = new github.GitHub(githubToken);

async function run() {
  try {
    const owner = core.getInput('owner', {required: false}) || context.repo.owner;
    const base = core.getInput('base', {required: false});
    const head = core.getInput('head', {required: false});
    const mergeMethod = core.getInput('merge_method', {required: false});
    const prTitle = core.getInput('pr_title', {required: false});
    const prMessage = core.getInput('pr_message', {required: false});

    await octokit.pulls.create({owner: context.repo.owner, repo: context.repo.repo, title: prTitle, head: owner+':'+head, base: base, body: prMessage, merge_method: mergeMethod, maintainer_can_modify: false})
      .then((pr) => {
        octokit.pulls.merge({owner: context.repo.owner, repo: context.repo.repo, pull_number: pr.data.number});
      })
      .catch((err) => {
        console.log(err)
        core.setFailed('### Failed to create or merge PR ###');
    });

  } catch (error) {
    core.setFailed('Error setting up action: '+error.message);
  }
}

run();