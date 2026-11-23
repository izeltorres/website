# Decisions

A record of decisions made by the project owner. Add new decisions to the end of the list.

## Session 1: 2026-11-21

### 1. Which repository to use
**Decision:** Work in the `izeltorres/website` repository, not `izeltorres/izels-website`.

### 2. How to resolve the conflicting `problem.md`
**Decision:** Keep the version uploaded on GitHub and drop the duplicate local commit.
**Why:** Both had the same text. They differed only in line endings.

### 3. Changes to `problem.md` (written by the owner)
**Decision:**
- Fix the heading to `# problem` so it displays as a heading.
- Remove the sentence describing the website from the problem section.
- Say "books and film" so the problem matches the requirements.
- Fix the spelling of "description".

### 4. How the website is built
**Decision:** Write it in HTML, and make sure everything is free.

### 5. Project files
**Decision:** Add a spec (`SPEC.md`), a `CLAUDE.md`, and a `README.md` to the website folder.

### 6. Commit order
**Decision:** Commit the spec on its own ("Add spec") before committing any code.

### 7. Changes to `SPEC.md` (written by the owner)
**Decision:**
- **Rating:** a 5-star rating that the reviewer fills in by clicking the stars, with animation, instead of a dropdown. It is no longer marked "(required)".
- **Reviewer identity:** a person is identified by their first and last name (case-insensitive) for the one-review-per-title rule.
- **Constraints:** removed "plain HTML, CSS, and JavaScript only, no frameworks or build step".
- **Data storage:** removed the section saying data is stored only in the browser (`localStorage`).
- **Out of scope:** narrowed to user accounts and passwords only. Sharing across devices, editing or deleting reviews, and outside book/film details are no longer listed as out of scope.
- **Acceptance checks:** removed, then put back, the check that user-typed text is shown as plain text (check 7).

### 8. Decision and handoff records
**Decision:** Keep a `decision.md` with every decision the owner makes and a `handoff.md` for picking up the work in a later session.

### 9. Rebuild the website from the updated spec
**Decision:** Build the website from the current `SPEC.md` and `CLAUDE.md`. Add a `README.md`. Commit all files.

## Session: 2026-11-22

### 10. Automatic tests
**Decision:** Add `tests/tests.html`, a page that loads `script.js` and runs every acceptance check in `SPEC.md`, listing PASS or FAIL for each. It uses no test framework, so it still needs nothing installed. The README gives the commands to open the site and the tests.

### 11. problem.md as the first commit
**Decision:** Rewrite the repository's history so the first commit contains only `problem.md` (the owner's text, unchanged), dropping GitHub's auto-created `.gitattributes` commit and the commit that later deleted it. Force-pushed.
