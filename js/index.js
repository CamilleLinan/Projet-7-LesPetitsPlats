import { recipes } from './recipes.js';

const displayRecipes = () => {
    createRecipes(recipes);
}

const onInit = () => {
    displayRecipes();
}

onInit();