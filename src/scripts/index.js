"use strict";

import {
  renderList,
  renderRecipeAbout,
  renderBookmark,
} from "./renderFunctions.js";

// dom elements
const userInput = document.querySelector(".user-input");
const searchButton = document.querySelector(".search-btn");
const recipeAbout = document.querySelector(".recipe-about");
const recipes = document.querySelector(".side-bar");
const dropdown = document.querySelector(".dropdown");

const bookmarksList = [];

// ---EVENT LISTENERS---

// search button
searchButton.addEventListener("click", (e) => {
  const input = userInput.value;
  renderList(input);
});

// !enter key search
document.addEventListener("keydown", (e) => {
  const input = userInput.value;
  if (e.key === "Enter") renderList(input);
});

// !recipe list click handler
recipes.addEventListener("click", (e) => {
  const selectedRecipe = e.target.closest(".recipe-item");
  const { id } = selectedRecipe.dataset;
  renderRecipeAbout(id, bookmarksList);
});

// !bookmark icon click handler
recipeAbout.addEventListener("click", (e) => {
  if (e.target.classList.contains("recipe-bookmark")) {
    // change icon if recipe is bookmarked
    e.target.classList.toggle("far");
    e.target.classList.toggle("fas");

    const { id } = e.target.dataset;
    renderBookmark(id, bookmarksList);
  }
});

// !dropdown click handler
dropdown.addEventListener("click", (e) => {
  const { id } = e.target.dataset;
  if (id) renderRecipeAbout(id, bookmarksList);
});
