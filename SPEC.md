# Spec: Book and Film Thoughts Website

Based on `problem.md`.

## Purpose
A website where people can write down their thoughts on books and films they have watched or read, rate them, and read what others have written.

## Constraints
- Written in plain HTML, CSS, and JavaScript. No frameworks, libraries, or build step.
- Everything is free: no paid hosting, databases, APIs, or accounts. Free hosting option: GitHub Pages.
- Works by opening `index.html` in a browser, with no internet connection required.

## Data storage
- All data is saved in the browser's `localStorage`.
- Because of this, reviews are shared only between people using the same browser on the same device. Sharing between devices would need a server or database, which is out of scope (see below).

## Features

### 1. Add a book or film (requirement: intake books and films)
- The user chooses a type (Book or Film) and enters a title.
- The title is required and is trimmed of extra spaces.
- The same title cannot be added twice for the same type (case-insensitive). The user sees a message if they try.

### 2. Write thoughts and a rating (requirement: intake a description of thoughts)
- On any book or film, a person enters:
  - their name (required),
  - a rating from 1 to 5 stars (required),
  - a description of their thoughts (required).
- The review is saved with the date it was written.

### 3. One review per person per book or film (requirement: write and rate once per film or book)
- A person (identified by name, case-insensitive) can write only one review for each book or film.
- If the same name tries to review the same title again, the review is rejected and a message explains why.

### 4. Read others' thoughts (problem: allow others to write their thoughts)
- Every book and film shows all of its reviews: name, star rating, thoughts, and date.
- Each book and film shows its average rating and number of reviews.

### 5. Browse
- The list can be filtered to All, Books, or Films.
- The list can be searched by title.
- Titles are shown in alphabetical order.

## Out of scope
- User accounts and passwords.
- Sharing reviews across different devices or browsers.
- Editing or deleting reviews.
- Book or film details from outside sources (covers, authors, release dates).

## Acceptance checks
1. Adding "Dune" as a Book shows it in the list; adding "dune" as a Book again shows an error.
2. Adding "Dune" as a Film is allowed (different type).
3. Submitting a review with a name, rating, and thoughts shows it under that title, and the average rating updates.
4. Submitting a second review on the same title with the same name (any capitalization) is rejected.
5. Reloading the page keeps all titles and reviews.
6. The Books/Films filter and the title search narrow the list correctly.
7. Text typed by users is shown as plain text, never run as HTML.
