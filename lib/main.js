"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
const myToken = core.getInput('github-token');
const context = github.context;
const octokit = new github.GitHub(myToken);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const owner = core.getInput('owner');
            const destinationBranch = core.getInput('destinationBranch');
            const originBranch = core.getInput('originBranch');
            const mergeMethod = core.getInput('mergeMethod');
            octokit.pulls.create({ owner: context.repo.owner, repo: context.repo.repo, title: 'Sync Fork', head: owner + ':' + originBranch, base: destinationBranch, merge_method: mergeMethod })
                .then(pr => octokit.pulls.merge({ owner: pr.data.user.login, repo: context.repo.repo, pull_number: pr.data.number }));
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
