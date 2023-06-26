import { recipes } from '../recipes.js';

const recipesContainer = document.querySelector('.recipes-section');
const clearBtn = document.querySelector('.header-input-clear-icon');
const searchBar = document.getElementById('search');

searchBar.addEventListener('input', (event) => {
  clearBtn.style.display = 'block';
  const searchValue = event.target.value.toLowerCase();

  setTimeout(() => {
    handleSearch(searchValue);
  }, 1000);

  if (searchValue === '') {
    clearBtn.style.display = 'none';
  }
});

clearBtn.addEventListener('click', () => {
  searchBar.value = '';
  clearBtn.style.display = 'none';
  displayRecipesCards(recipes);
});

const handleSearch = (searchValue) => {
  const searchResults = recipes.filter(recipe => {
    const recipeName = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
    const recipeDescription = recipe.description.toLowerCase();
    const recipeAppliance = recipe.appliance.toLowerCase();
    const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
    return (
      recipeName.includes(searchValue) ||
      recipeIngredients.includes(searchValue) ||
      recipeDescription.includes(searchValue) ||
      recipeAppliance.includes(searchValue) ||
      recipeUstensils.includes(searchValue)
    );
  });

  if (searchResults.length > 0) {
    displayRecipesCards(searchResults);
  } else {
    displayRecipesCards([]);
    recipesContainer.innerHTML = `<p class="no-result">Aucune recette ne contient "${searchValue}" vous pouvez chercher «
    tarte aux pommes », « poisson », etc.</p>`
  }
}
