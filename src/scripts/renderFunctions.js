"use strict";

import { getRecipe, getRecipes } from "./apiCalls.js";
import { textSize, glowingCricle, message } from "./helpers.js";

export { renderList, renderRecipeAbout, renderBookmark };

const recipeAbout = document.querySelector(".recipe-about");
const recipes = document.querySelector(".side-bar");
const dropdown = document.querySelector(".dropdown");

// ! RENDER LIST OF RECIPES WHEN SEARCHING FOR RECIPE
const renderList = async (input) => {
  // if this is not first search, remove the list rendered before
  while (recipes.firstElementChild) recipes.firstElementChild.remove();

  glowingCricle(true, recipes);

  const fetchedRecipes = await getRecipes(input);

  glowingCricle(false, recipes);

  // if no recipes are found
  if (fetchedRecipes.length === 0) {
    message("No recipes found", recipes);
  }

  // and then create an unordered list where all recipes will be rendered
  const recipesList = document.createElement("ul");
  recipesList.classList.add("recipes-list");
  recipes.append(recipesList);

  // render each recipe on the list created before
  fetchedRecipes.forEach((recipe) => {
    const recipeElement = ` <li class="recipe-item" data-id="${recipe.id}
    ">
    <img src="${recipe.image_url}" alt="" />
    <h3 class="recipe-title">${textSize(recipe.title, 20)}</h3>
    <small class="recipe-desc"></small>
  </li>`;
    recipesList.insertAdjacentHTML("beforeend", recipeElement);
  });
};

// ! RENDER SELECTED RECIPE AND DISPLAY IN RECIPE-ABOUT SECTION
const renderRecipeAbout = async (recipeID, bookmarksList) => {
  // if there is already a recipe rendered on recipe-info panel -- delete it
  if (recipeAbout.firstElementChild) recipeAbout.firstElementChild.remove();

  // create a div where the recipe about(title, servings ingridients) will be rendered
  const recipeAboutInner = document.createElement("div");
  recipeAboutInner.classList.add("recipe-about__inner");
  recipeAbout.append(recipeAboutInner);

  // get data about recipe from api
  const recipeData = await getRecipe(recipeID);

  // create a list of ingridients
  const ingredientsList = recipeData.ingredients.map(
    (ingredient, index) =>
      `<li class="ingredient">
        <span class="number-circle">${index + 1}</span>
        <strong>${ingredient.quantity ?? ""} ${ingredient.unit ?? ""}</strong> 
        ${ingredient.description}
      </li>`
  );
  // create the html element then append it to aboutInner
  const recipeAboutElement = `
  <div class="recipe-about__overview" ">
    <img class="recipe-image" src="${recipeData.image_url}" alt="" />
    <h1 class="title">
      ${recipeData.title}
      <span class="author">by ${recipeData.publisher}</span>
    </h1>
    <div class="row">
    <p class="row-item">
      <i class="far fa-clock"></i>
      <strong>${recipeData.cooking_time}</strong> min
    </p>
    <p class="row-item">
      <i class="fas fa-users"></i>
      <strong>${recipeData.servings}</strong> servings
    </p>
    <a class="row-item" href=${recipeData.source_url}>
      <i class="fas fa-book-open"></i>
      Link to recipe
    </a>
    </div>
    <i class="${
      bookmarksList.includes(recipeID) ? "fas" : "far"
    } fa-heart fa-2x recipe-bookmark"
    data-id="${recipeID}"></i>
  </div>
  <ul class="recipe-ingredients">
    ${ingredientsList.join("")}
  </ul>
 </div>
  `;
  recipeAboutInner.insertAdjacentHTML("beforeend", recipeAboutElement);
};

// ! RENDER LIST OF BOOKMARKS
const renderBookmark = async (id, bookmarksList) => {
  // add or remove the recipe from bookmarksList
  const index = bookmarksList.indexOf(id);
  index > -1 ? bookmarksList.splice(index, 1) : bookmarksList.push(id);

  const nodes = bookmarksList.map(async (id) => {
    try {
      const { image_url: image, title } = await getRecipe(id);
      return `<li class="bookmark-item" data-id="${id}"><img src="${image}"/>${textSize(
        title,
        15
      )}</li>`;
    } catch (err) {
      console.log(err);
    }
  });

  // Remove all the bookmarks from dropdown
  while (dropdown.firstElementChild) {
    dropdown.removeChild(dropdown.firstElementChild);
  }

  // Create a list that will consume the promises. This list will be then rendered on bookmarks' dropdown
  const nodesList = await Promise.all(nodes);
  dropdown.insertAdjacentHTML("afterbegin", nodesList.join(""));

  // if bookmarksList is empty display message
  const dropdownMessage = `<div class="message">There is no bookmark. Find one recipe and bookmark it</div>`;
  if (!bookmarksList.length)
    dropdown.insertAdjacentHTML("beforeend", dropdownMessage);
};
