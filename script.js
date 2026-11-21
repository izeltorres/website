// Book and Film Thoughts. See SPEC.md for how this should behave.
// All data is kept in the browser's localStorage, so it is free and works offline.

const STORAGE_KEY = "book-film-thoughts-v2";

const RATING_WORDS = {
  1: "Hated it",
  2: "Didn't like it",
  3: "It was OK",
  4: "Liked it",
  5: "Loved it",
};

let data = loadData();
let currentFilter = "all";
let searchText = "";
// A message shown on one card after the list re-renders: { id, text, kind }
let cardMessage = null;

// ---------- Saving and loading ----------

function loadData() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed && Array.isArray(parsed.items)) return parsed;
  } catch (e) {
    // Storage unavailable or corrupted: start empty.
  }
  return { items: [] };
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}

// ---------- Helpers ----------

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function normalize(text) {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
}

function fullName(review) {
  return review.first + " " + review.last;
}

// Read-only stars; rating can be a decimal (for averages).
function stars(rating) {
  const span = document.createElement("span");
  span.className = "stars";
  span.style.setProperty("--fill", (rating / 5) * 100 + "%");
  span.setAttribute("role", "img");
  span.setAttribute("aria-label", rating.toFixed(1).replace(".0", "") + " out of 5 stars");
  return span;
}

function setMessage(el, text, kind) {
  el.textContent = text;
  el.className = "message" + (kind ? " " + kind : "");
}

// ---------- Feature 1: add a book or film ----------

const addForm = document.getElementById("add-form");
const addMessage = document.getElementById("add-message");

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = addForm.elements.type.value === "film" ? "film" : "book";
  const title = addForm.elements.title.value.trim();

  if (!title) {
    setMessage(addMessage, "Please enter a title.", "error");
    return;
  }

  const exists = data.items.some(
    (item) => item.type === type && normalize(item.title) === normalize(title)
  );
  if (exists) {
    setMessage(addMessage, `"${title}" is already in the list as a ${type}.`, "error");
    return;
  }

  data.items.push({ id: makeId(), type, title, reviews: [] });
  if (!saveData()) {
    data.items.pop();
    setMessage(addMessage, "Could not save. Your browser may be blocking storage.", "error");
    return;
  }

  addForm.elements.title.value = "";
  setMessage(addMessage, `Added "${title}".`, "ok");
  render();
});

// ---------- Feature 5: filters and search ----------

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === button));
    render();
  });
});

document.getElementById("search").addEventListener("input", (event) => {
  searchText = normalize(event.target.value);
  render();
});

// ---------- Features 2 and 3: write a review, once per person ----------

function addReview(item, form) {
  const first = form.elements.first.value.trim();
  const last = form.elements.last.value.trim();
  const thoughts = form.elements.thoughts.value.trim();
  const checked = form.querySelector('input[name="rating"]:checked');
  const rating = checked ? parseInt(checked.value, 10) : 0;

  if (!first || !last) {
    return { text: "Please enter your first and last name.", kind: "error" };
  }
  if (!(rating >= 1 && rating <= 5)) {
    return { text: "Please click the stars to give a rating.", kind: "error" };
  }
  if (!thoughts) {
    return { text: "Please write your thoughts.", kind: "error" };
  }

  const name = first + " " + last;
  const alreadyReviewed = item.reviews.some((r) => normalize(fullName(r)) === normalize(name));
  if (alreadyReviewed) {
    return { text: `${name} has already reviewed this ${item.type}. Only one review per person.`, kind: "error" };
  }

  item.reviews.push({ first, last, rating, thoughts, date: new Date().toISOString() });
  if (!saveData()) {
    item.reviews.pop();
    return { text: "Could not save. Your browser may be blocking storage.", kind: "error" };
  }
  return { text: "Thanks! Your review was added.", kind: "ok" };
}

// The clickable, animated 5-star rating.
function renderStarInput(item) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "rating-field";

  const legend = document.createElement("legend");
  legend.textContent = "Your rating";
  fieldset.append(legend);

  const row = document.createElement("div");
  row.className = "rating-row";

  const starBox = document.createElement("div");
  starBox.className = "star-input";

  const text = document.createElement("span");
  text.className = "rating-text";
  text.textContent = "Click a star";

  // Built from 5 down to 1; CSS reverses them so 1 shows on the left.
  for (let n = 5; n >= 1; n--) {
    const id = `${item.id}-star-${n}`;
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "rating";
    input.value = String(n);
    input.id = id;

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = "★";
    label.title = `${n} star${n === 1 ? "" : "s"}`;
    label.setAttribute("aria-label", `${n} out of 5 stars`);

    input.addEventListener("change", () => {
      text.textContent = `${n} out of 5 · ${RATING_WORDS[n]}`;
      animateStars(starBox, n);
    });

    starBox.append(input, label);
  }

  row.append(starBox, text);
  fieldset.append(row);
  return fieldset;
}

// Pop the filled stars one after another, left to right.
function animateStars(starBox, rating) {
  const labels = Array.from(starBox.querySelectorAll("label")).reverse(); // 1..5
  labels.forEach((label, i) => {
    label.classList.remove("pop");
    if (i < rating) {
      void label.offsetWidth; // restart the animation
      label.style.animationDelay = i * 70 + "ms";
      label.classList.add("pop");
    }
  });
}

// ---------- Feature 4: show everyone's thoughts ----------

function renderReview(review) {
  const li = document.createElement("li");
  li.className = "review";

  const head = document.createElement("div");
  head.className = "review-head";
  const name = document.createElement("strong");
  name.textContent = fullName(review);
  const time = document.createElement("time");
  time.dateTime = review.date;
  time.textContent = new Date(review.date).toLocaleDateString();
  head.append(name, stars(review.rating), time);

  const thoughts = document.createElement("p");
  thoughts.textContent = review.thoughts;

  li.append(head, thoughts);
  return li;
}

function field(labelText, name, maxLength) {
  const label = document.createElement("label");
  label.textContent = labelText;
  const input = document.createElement("input");
  input.type = "text";
  input.name = name;
  input.maxLength = maxLength;
  input.required = true;
  label.append(input);
  return label;
}

function renderReviewForm(item) {
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  summary.textContent = "Write a review";
  details.append(summary);

  const form = document.createElement("form");
  form.className = "review-form";

  const nameRow = document.createElement("div");
  nameRow.className = "row";
  nameRow.append(field("First name", "first", 40), field("Last name", "last", 40));

  const thoughtsLabel = document.createElement("label");
  thoughtsLabel.textContent = "Your thoughts";
  const textarea = document.createElement("textarea");
  textarea.name = "thoughts";
  textarea.maxLength = 2000;
  textarea.required = true;
  thoughtsLabel.append(textarea);

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Post review";

  form.append(nameRow, renderStarInput(item), thoughtsLabel, button);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = addReview(item, form);
    cardMessage = { id: item.id, ...result };
    render();
  });

  details.append(form);
  return details;
}

function renderItem(item) {
  const li = document.createElement("li");
  li.className = "card";

  const head = document.createElement("div");
  head.className = "card-head";
  const title = document.createElement("h3");
  title.textContent = item.title;
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = item.type === "film" ? "Film" : "Book";
  head.append(title, badge);

  const summary = document.createElement("p");
  summary.className = "summary";
  const count = item.reviews.length;
  if (count === 0) {
    summary.textContent = "No reviews yet.";
  } else {
    const avg = item.reviews.reduce((sum, r) => sum + r.rating, 0) / count;
    summary.append(stars(avg));
    summary.append(`${avg.toFixed(1)} average · ${count} review${count === 1 ? "" : "s"}`);
  }

  li.append(head, summary);

  if (count > 0) {
    const reviews = document.createElement("ul");
    reviews.className = "reviews";
    item.reviews.forEach((r) => reviews.append(renderReview(r)));
    li.append(reviews);
  }

  const form = renderReviewForm(item);
  li.append(form);

  if (cardMessage && cardMessage.id === item.id) {
    const msg = document.createElement("p");
    msg.setAttribute("role", "status");
    setMessage(msg, cardMessage.text, cardMessage.kind);
    if (cardMessage.kind === "error") form.open = true;
    li.append(msg);
  }

  return li;
}

function render() {
  const list = document.getElementById("items");
  const empty = document.getElementById("empty");

  const visible = data.items
    .filter((item) => currentFilter === "all" || item.type === currentFilter)
    .filter((item) => !searchText || normalize(item.title).includes(searchText))
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));

  list.replaceChildren(...visible.map(renderItem));

  if (data.items.length === 0) {
    empty.textContent = "Nothing here yet. Add a book or film above.";
    empty.hidden = false;
  } else if (visible.length === 0) {
    empty.textContent = "No titles match.";
    empty.hidden = false;
  } else {
    empty.hidden = true;
  }

  cardMessage = null;
}

render();
