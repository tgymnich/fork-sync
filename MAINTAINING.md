# Maintainers Guide

This guide is intended for _maintainers_.
> ... “maintainers” are the only people in a project with commit access. ...
>
> A maintainer doesn’t necessarily have to be someone who writes code for your project. It could be someone who’s done
> a lot of work evangelizing your project, or written documentation that made the project more accessible to others.
> Regardless of what they do day-to-day, a maintainer is probably someone who feels responsibility over the direction
> of the project and is committed to improving it.

[https://opensource.guide/leadership-and-governance/]

## Table of Contents

* [Maintaining](#maintaining)
* [Reviewing Pull Requests and Triaging Issues](#reviewing-pull-requests-and-triaging-issues)
* [Attribution](#attribution)

## Maintaining

* The master/main branch MUST be releasable at all times. Commits against this branch MUST contain only bugfixes and/or
  security fixes. All other changes must come from pull requests.

## Reviewing Pull Requests and Triaging Issues

We recommend reviewing pull requests directly within [GitHub]. This facilitates public commentary on changes, and
provides transparency for all users.

When providing feedback be sure to abide by the [CODE OF CONDUCT] to help encourage a helpful, welcoming community.

During your review, consider the following points:

* Have they made use of, and filled out, the [pull request template]? If not, ask them to please update their PR comment
  with the template and fill it out. This will help to ensure that the remaining items on this page are covered in the
  PR.

* Does the change have impact? While fixing typos is nice as it adds to the overall quality of the project, merging one
  typo fix at a time can be a waste of effort. (Merging many typo fixes because somebody reviewed the entire component,
  however, is useful!) Other examples to be wary of:

  * Changes in class/function/variable names. Ask whether or not the change will make understanding the code easier,
      or if it could simply a personal preference on the part of the author.

  * Formatting changes. Most formatting changes should be generated only by a coding standards checker/fixer — and
      those will normally be caught by continuous integration. Ask whether the change is generally improving
      readability/maintenance, or if it could simply be a personal preference on the part of the author.

  Essentially: feel free to close issues that do not have impact.

* Does the change make sense? If you do not understand what the changes are or what they accomplish, ask the author for
  clarification. Ask the author to add comments and/or clarify test case names to make the intentions clear.

  At times, such clarification will reveal that the author may not be using the code correctly, or is unaware of
  features that accommodate their needs. If you feel this is the case, work up a code sample that would address the
  issue for them, and feel free to close the issue once they confirm. Help them to learn the code and documentation;
  don't just tell them to RTFM.

* Does the change break backwards compatibility? If so, work with the contributor to determine why the backwards
  compatibility break is needed, and whether there may be a way to make the change without breaking backwards
  compatibility. Breaking backwards compatibility should be undertaken only out of necessity, and any break should have
  accompanying documentation on the impact, as well as how to update applications to accommodate the changes.

  If at all possible, try to introduce new behavior and deprecate existing behavior. This allows users to gradually
  migrate over a period of releases. The existing, deprecated behavior can then be removed in a later major release.

  Any backwards compatibility breaks you plan on merging MUST be communicated to the [CODEOWNERS]/repository-owners to
  ensure that testing can be done on related components and so that the release can be tested.

* Is this a new feature? If so:

  * Does the linked issue contain narrative indicating the need for the feature? If not, ask them to provide that
      information. Since the issue will be linked in the [CHANGELOG], this will often be a user's first introduction to
      it.

  * Are new unit tests in place that test all new behaviors introduced? If not and unit tests are applicable, do not
      merge the feature until they are!

  * Is documentation in place for the new feature? (See the documentation guidelines). Do not merge the feature until
      it is!

  * Is the feature necessary for general use cases? Introducing a new feature should benefit the pipeline as a whole,
      or fulfill a need that many teams have.

  * Is the feature backwards compatible? If so, there's nothing blocking merging it, so long as it passes review, and
      include it in the next minor release. If it's not, however, you have a decision to make: will the next version be
      a minor, or a major release? If you decide that you are not ready for a major release yet, indicate to the author
      that you are not yet ready to merge, and ask them to please keep the patch up-to-date with any merged changes so
      that it's mergeable when you are ready to schedule a new major release.

  This workflow ensures that the author of the patch is responsible for any merge conflicts. Since the author is the one
  most familiar with the changes they are introducing, they are the party most likely to resolve conflicts correctly.

## Attribution

Maintainers documentation inspired
by [zendframwork Maintainers](https://github.com/zendframework/maintainers/blob/master/MAINTAINERS.md).

[GitHub]: https://github.com/gdcorp-action-public-forks/fork-sync

[CODE OF CONDUCT]: CODE_OF_CONDUCT.md

[CODEOWNERS]: .github/CODEOWNERS

[CHANGELOG]: CHANGELOG.md

[pull request template]: .github/pull_request_template.md
