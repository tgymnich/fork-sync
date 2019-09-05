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
const githubToken = core.getInput('github_token');
const context = github.context;
const octokit = new github.GitHub(githubToken);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const owner = core.getInput('owner') || context.repo.owner;
            const destinationBranch = core.getInput('destination_branch');
            const originBranch = core.getInput('origin_branch');
            const mergeMethod = core.getInput('merge_method');
            const prTitle = core.getInput('pr_title');
            const prMessage = core.getInput('pr_message');
            yield octokit.pulls.create({ owner: context.repo.owner, repo: context.repo.repo, title: prTitle, head: owner + ':' + originBranch, base: destinationBranch, body: prMessage, merge_method: mergeMethod })
                .then((pr) => {
                octokit.pulls.merge({ owner: context.repo.owner, repo: context.repo.repo, pull_number: pr.data.number });
            })
                .catch((err) => {
                core.setFailed(err.message);
            });
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
