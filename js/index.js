import { recipes } from './recipes.js';

const displaySortBar = () => {
    createSortBarByTag(recipes);
}

const displayRecipes = () => {
    displayRecipesCards(recipes);
}

const onInit = () => {
    displaySortBar();
    displayRecipes();
}

onInit();