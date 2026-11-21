# Book and Film Thoughts

A website where people write down their thoughts on books and films, rate them with stars, and read what others have written.

See `problem.md` for the problem, `SPEC.md` for how the site works, and `decision.md` for the decisions behind it.

## Features
- Add books and films to the list. The same title can't be added twice.
- Write a review with your first and last name, a 5-star rating you click to fill in, and your thoughts.
- Each person can review each book or film only once.
- See every review, plus the average rating and number of reviews, for each title.
- Filter by books or films, and search by title.

## How to run it
No installs and no internet connection needed:

1. Download or clone this repository.
2. Open `index.html` in any web browser.

## Hosting it online for free (GitHub Pages)
1. On GitHub, open this repository and go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Pick the `main` branch and the `/ (root)` folder, then click **Save**.
4. After a minute or two, the site is live at `https://<your-username>.github.io/website/`.

## Files
| File | What it is |
|------|------------|
| `index.html` | The page layout |
| `style.css` | The look of the page, including the star animation and dark mode |
| `script.js` | Adding titles and reviews, the star rating, filters, and saving |
| `problem.md` | The problem and initial requirements |
| `SPEC.md` | The specification |
| `decision.md` | Decisions made for the project |
| `handoff.md` | Where the project stands and what to do next |
| `CLAUDE.md` | Instructions for Claude Code |

## Cost
Everything is free: no paid services, libraries, or accounts.

## Where reviews are saved
Reviews are saved in your browser, so they stay after you close the page. They are only visible in the same browser on the same device, and clearing your browser data erases them.
