"use strict";

export { getRecipe, getRecipes };

// ! get recipes from api
const getRecipes = async (input) => {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${input}`
  );
  const data = await res.json();
  const { recipes } = data.data;
  return recipes;
};

// ! get the selected recipe from the list
const getRecipe = async (recipeID) => {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeID}`
  );
  const data = await res.json();
  const { recipe } = data.data;
  return recipe;
};
