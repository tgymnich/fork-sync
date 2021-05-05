# Contributors Guide

This guide is intended for _contributors_.

> A “contributor” could be anyone who comments on an issue or pull request, people who add value to the project
> (whether it’s triaging issues, writing code, or organizing events), or anybody with a merged pull request (perhaps
> the narrowest definition of a contributor).

[https://opensource.guide/leadership-and-governance/]

## Table of Contents

* [Contributing](#contributing)
* [Answering Questions](#answering-questions)
* [Reporting Bugs](#reporting-bugs)
* [Triaging bugs or contributing code](#triaging-bugs-or-contributing-code)
* [Code Review](#code-review)
* [Attribution of Changes](#attribution-of-changes)
* [Code Style and Documentation](#code-style-and-documentation)
* [Additional Resources](#additional-resources)

## Contributing

Everyone is welcome to contribute to GoDaddy's InnerSource Software. Contributing doesn't just mean submitting pull
requests. To get involved, you can report or triage bugs, and participate in discussions on the evolution of each
project.

No matter how you want to get involved, we ask that you first learn what’s expected of anyone who participates in the
project by reading the Contribution Guidelines and our [Code of Conduct][coc].

**Please Note:** GitHub is for bug reports and contributions primarily - if you have a support question head over
to [cloud-automation][slack]. You can request an invite
[here][invite].

## Answering Questions

One of the most important and immediate ways you can support this project is to answer questions on [Slack][slack]
or [Github][issues]. Whether you’re helping a newcomer understand a feature or troubleshooting an edge case with a
seasoned developer, your knowledge and experience with a programming language can go a long way to help others.

## Reporting Bugs

**Do not report potential security vulnerabilities to Slack or through GitHub issues. Refer to
[SECURITY.md](SECURITY.md) for more details about the process of reporting security vulnerabilities.**

Before submitting a ticket, please search our [Issue Tracker][issues] to make sure it does not already exist and have a
simple replication of the behavior. If the issue is isolated to one of the dependencies of this project, please create a
Github [issue][issues] in the project.

Submit a ticket for your issue, assuming one does not already exist:

* Create it on the project's [Issue Tracker][issues].
* Clearly describe the issue by following the template layout
  * Make sure to include steps to reproduce the bug.
  * A reproducible (unit) test could be helpful in solving the bug.
  * Describe the environment that (re)produced the problem.

While none of the above are _required_ steps, failure to do any of them can, and likely will, result in closing of your
issue if other contributors are unable to reproduce or understand your problem statement. To achieve the best outcome,
please provide the minimal amount of code needed to reproduce the problem, along with observations of the current
behavior, and a clear ISBAT statement of what behavior you expect. This information translates into simple unit tests
that can be used to verify the reported problem, along with verifying any proposed solutions. If you have a unit test to
demonstrate the bug, please include it in the PR as this further expedites resolution.

Please be aware that acceptable resolutions to reported issues may include:

* The documented behavior is incorrect. In such cases a documentation bug should be filed to correct the documentation.
* The observed behavior is expected. If appropriate a documentation bug can be filed to expand documentation to include
  this expected behavior.

## Triaging bugs or contributing code

If you're triaging a bug, first make sure that you can reproduce it. Once a bug can be reproduced, reduce it to the
smallest amount of code possible. Reasoning about a sample or unit test that reproduces a bug in just a few lines of
code is easier than reasoning about a longer sample.

From a practical perspective, contributions are as simple as:

1. Fork and clone the repo, [see Github's instructions if you need help.][fork]
1. Create a branch for your PR with `git checkout -b pr/your-branch-name`
1. Make changes on the branch of your forked repository.
1. When committing, reference your issue (if present) and include a note about the fix.
1. Please also add/update unit tests for your changes.
1. Push the changes to your fork and submit a pull request to the 'main development branch' branch of the project's
   repository. Please make use of the [Pull Request Template] available in the repository

If you are interested in making a large change and feel unsure about its overall effect, start with opening an Issue in
the project's [Issue Tracker][issues]
with a high-level proposal and discuss it with the core contributors through Github comments or in [Slack][slack]. After
reaching a consensus with core contributors about the change, discuss the best way to go about implementing it.

> Tip: Keep your master branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>   ```bash
> git remote add upstream https://github.secureserver.net/appservices/golden-amis.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
>   ```
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local master
> branch to use the upstream master branch whenever you run git pull. Then you
> can make all of your pull request branches based on this master branch.
> Whenever you want to update your version of master, do a regular git pull.

## Code Review

Any innersource project relies heavily on code review to improve software quality. All significant changes, by all
developers, must be reviewed before they are committed to the repository. Code reviews are conducted on GitHub through
comments on pull requests or commits. The developer responsible for a code change is also responsible for making all
necessary review-related changes.

Sometimes code reviews will take longer than you would hope for, especially for larger features. Here are some accepted
ways to speed up review times for your patches:

- Review other people’s changes. If you help out, others will more likely be willing to do the same for you.
- Split your change into multiple smaller changes. The smaller your change, the higher the probability that somebody
  will take a quick look at it.
- Mention the change on [Slack][slack]. If it is urgent, provide reasons why it is important to get this change landed.
  Remember that you are asking for valuable time from other professional developers.

**Note that anyone is welcome to review and give feedback on a change, but only people with commit access to the
repository can approve it.**

## Attribution of Changes

When contributors submit a change to this project, after that change is approved, other developers with commit access
may commit it for the author. When doing so, it is important to retain correct attribution of the contribution.
Generally speaking, Git handles attribution automatically.

## Code Style and Documentation

Ensure that your contribution follows the standards set by the project's style guide with respect to patterns, naming,
documentation and testing.

Please make use of the `.editorconfig` file in this repository

## Additional Resources

* [General GitHub Documentation](https://help.github.com/)
* [GitHub Pull Request documentation](https://help.github.com/send-pull-requests/)
* [GitHub Standard Fork & Pull Request Workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962)
* [Syncing a fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
* [git-flow cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)

[issues]: https://github.com/gdcorp-action-public-forks/fork-sync/issues
[coc]: ./CODE_OF_CONDUCT.md
[slack]: https://godaddy.slack.com/archives/CMRT5PUM6
[fork]: https://help.github.com/en/articles/fork-a-repo
[git flow methodology]: http://nvie.com/posts/a-successful-git-branching-model/
[Pull Request Template]: .github/pull_request_template.md
[invite]: https://godaddy.slack.com/archives/CMRT5PUM6
