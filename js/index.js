import { recipes } from './recipes.js';

const displaySortBar = () => {
    createSortBar(recipes);
}

const displayRecipes = () => {
    createRecipesCard(recipes);
}

const onInit = () => {
    displaySortBar();
    displayRecipes();
}

onInit();