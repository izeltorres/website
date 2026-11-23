# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project
A website for writing and reading thoughts and ratings on books and films. This is a CSC 299 class project.

- `problem.md`: the problem and initial requirements. **The owner writes this file. Never edit it.**
- `SPEC.md`: the specification, written and edited by the owner. Build from it. If the code needs to differ from it, ask the owner first.
- `decision.md`: every decision the owner makes. Add each new decision to the end, under a heading for the current session.
- `handoff.md`: where the project stands and what to do next. Read it at the start of a session and update it at the end.
- `index.html`, `style.css`, `script.js`: the website.
- `README.md`: overview and how to run the site and the tests. Keep it up to date.
- `tests/tests.html`: the automatic tests.

## Rules
- Everything must be free: no paid hosting, databases, APIs, or accounts. Hosting is GitHub Pages.
- The site must work by opening `index.html`, with no internet connection.
- Written in HTML, CSS, and JavaScript.
- Data is stored in `localStorage` under the key `book-film-thoughts-v2`. If the data shape changes, use a new key or migrate old data.
- Show user-typed text with `textContent` or `createElement`, never through `innerHTML` (spec acceptance check 7).
- Keep the code simple and readable; this is a student project.
- Do not commit or push unless the owner asks.

## Testing
`tests/tests.html` holds the automatic tests (no framework). Run them with `start tests/tests.html` (Windows)
and check that the top line says all tests passed. Each check is named after the `SPEC.md` feature or
acceptance check it tests. Its markup is a copy of `index.html`'s, so update it when `index.html` changes.
Add a check for every new feature or acceptance check.
