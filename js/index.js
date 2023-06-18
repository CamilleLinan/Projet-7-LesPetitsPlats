import { recipes } from './recipes.js';

const displayRecipes = () => {
    createRecipesCard(recipes);
}

const onInit = () => {
    displayRecipes();
}

onInit();