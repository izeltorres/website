# Handoff

Where the project stands at the end of session 1 (2026-11-21), and what to do next.

## Project
A website where people write their thoughts on books and films, rate them, and read others' reviews. It's a CSC 299 class project in the `izeltorres/website` repository.

- Local folder: `C:\Users\iztor\OneDrive\CSC 299 final\website\website`
- Read first: `problem.md` (the owner writes it; never edit it), `SPEC.md`, `decision.md`, `CLAUDE.md`

## Git status
- Pushed to GitHub: `problem.md` (commits up to `d97091a`).
- Committed locally but **not pushed**: "Add spec", "Update spec", and the commit with the website and docs.
- Pushing works through the GitHub CLI login (`gh auth setup-git` was run).

## What is built
The website is in `index.html`, `style.css` and `script.js`, built from the current `SPEC.md`:
- Add a book or film; duplicate titles of the same type are rejected.
- Review with first name, last name, a clickable animated 5-star rating, and thoughts.
- One review per person (first + last name, case-insensitive) per title.
- Shows all reviews, the average rating (partly filled stars), and the review count.
- Filter by All/Books/Films, search by title, alphabetical order.
- Data saved in the browser's `localStorage` (key `book-film-thoughts-v2`). That's free and works offline, as the spec requires.

**Not tested yet:** no one has opened it in a browser and run the acceptance checks. Node isn't installed, so the JavaScript hasn't been syntax-checked either.

## Open questions for the owner
1. The spec doesn't say whether a rating is required. The site requires one, because the average needs it.
2. Reviews are visible only in the same browser on the same device. Sharing across devices would need a database, which conflicts with the spec's "no databases" and "no internet connection" constraints.

## Next steps
1. Open `index.html` and run the acceptance checks in `SPEC.md`.
2. Answer the open questions and record the answers in `decision.md`.
3. Push to GitHub when the owner asks.
4. Optionally turn on GitHub Pages (steps are in `README.md`).
