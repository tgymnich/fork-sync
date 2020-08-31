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
const Github = require('@actions/github');
const Octokit = require('@octokit/rest').plugin(require('@octokit/plugin-retry'));
const githubToken = core.getInput('github_token', { required: true });
const context = Github.context;
const octokit = new Octokit({ auth: githubToken });
function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const owner = core.getInput('owner', { required: false }) || context.repo.owner;
        const base = core.getInput('base', { required: false });
        const head = core.getInput('head', { required: false });
        const mergeMethod = core.getInput('merge_method', { required: false });
        const prTitle = core.getInput('pr_title', { required: false });
        const prMessage = core.getInput('pr_message', { required: false });
        const ignoreFail = core.getInput('ignore_fail', { required: false });
        try {
            let pr = yield octokit.pulls.create({ owner: context.repo.owner, repo: context.repo.repo, title: prTitle, head: owner + ':' + head, base: base, body: prMessage, merge_method: mergeMethod, maintainer_can_modify: false });
            yield octokit.pulls.merge({ owner: context.repo.owner, repo: context.repo.repo, pull_number: pr.data.number });
        }
        catch (error) {
            if (((_a = error === null || error === void 0 ? void 0 : error.errors[0]) === null || _a === void 0 ? void 0 : _a.message) == 'No commits between ' + context.repo.owner + ':' + base + ' and ' + owner + ':' + head) {
                console.log('No commits between ' + context.repo.owner + ':' + base + ' and ' + owner + ':' + head);
            }
            else {
                if (!ignoreFail) {
                    core.setFailed(`Failed to create or merge pull request: ${error !== null && error !== void 0 ? error : "[n/a]"}`);
                }
            }
        }
    });
}
run();
