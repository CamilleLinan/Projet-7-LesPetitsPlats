import { recipes } from './recipes.js';

const displaySortBar = () => {
    createSortBarByTag(recipes);
    displayNbrRecipes(recipes);
}

const displayRecipes = () => {
    displayRecipesCards(recipes);
}

const onInit = () => {
    displaySortBar();
    displayRecipes();
}

onInit();