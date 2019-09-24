"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = require('@actions/github');
var promiseRetry = require('promise-retry');
const githubToken = core.getInput('github_token', { required: true });
const context = github.context;
const octokit = new github.GitHub(githubToken);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const owner = core.getInput('owner', { required: false }) || context.repo.owner;
            const base = core.getInput('base', { required: false });
            const head = core.getInput('head', { required: false });
            const mergeMethod = core.getInput('merge_method', { required: false });
            const prTitle = core.getInput('pr_title', { required: false });
            const prMessage = core.getInput('pr_message', { required: false });
            yield octokit.pulls.create({ owner: context.repo.owner, repo: context.repo.repo, title: prTitle, head: owner + ':' + head, base: base, body: prMessage, merge_method: mergeMethod, maintainer_can_modify: false })
                .then((pr) => {
                promiseRetry(function (retry, number) {
                    if (number > 1) {
                        console.log('merge attempt number ', number);
                    }
                    return octokit.pulls.merge({ owner: context.repo.owner, repo: context.repo.repo, pull_number: pr.data.number })
                        .catch(function (err) {
                        if (!!err.message && err.message == 'Base branch was modified. Review and try the merge again.') {
                            retry(err);
                        }
                        else {
                            throw err;
                        }
                    });
                })
                    .catch(function (err) {
                    console.log(err);
                    core.setFailed('Failed to merge pull request');
                });
            })
                .catch((err) => {
                if (!!err.errors && err.errors[0].message == 'No commits between ' + context.repo.owner + ':' + base + ' and ' + owner + ':' + head) {
                    console.log('No commits between ' + context.repo.owner + ':' + base + ' and ' + owner + ':' + head);
                }
                else {
                    console.log(err);
                    core.setFailed('Failed to create pull request');
                }
            });
        }
        catch (error) {
            core.setFailed('Error setting up action: ' + error.message);
        }
    });
}
run();
