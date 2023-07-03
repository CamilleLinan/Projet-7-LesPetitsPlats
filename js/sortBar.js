import { recipes } from './recipes.js';

const recipesContainer = document.querySelector('.recipes-section');
const clearBtn = document.querySelector('.header-input-clear-icon');
const searchBar = document.getElementById('search');

searchBar.addEventListener('input', (event) => {
  clearBtn.style.display = 'block';
  const searchValue = event.target.value.toLowerCase().trim();

  if (searchValue.length >= 3) {
    setTimeout(() => {
      handleSearch(searchValue);
    }, 300);
  }

  if (searchValue === '') {
    clearBtn.style.display = 'none';
    displayRecipesCards(recipes);
    displayNbrRecipes(recipes);
  }
});

clearBtn.addEventListener('click', () => {
  searchBar.value = '';
  clearBtn.style.display = 'none';
});

const handleSearch = (searchValue) => {
  const searchResults = recipes.filter(recipe => {
    const recipeName = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
    const recipeDescription = recipe.description.toLowerCase();
    return (
      recipeName.includes(searchValue) ||
      recipeIngredients.includes(searchValue) ||
      recipeDescription.includes(searchValue)
    );
  });

  if (searchResults.length > 0) {
    displayRecipesCards(searchResults);
  } else {
    displayRecipesCards([]);
    recipesContainer.innerHTML = `<p class="no-result">Aucune recette ne contient "${searchValue}". Vous pouvez chercher «
    tarte aux pommes », « poisson », etc.</p>`
  }

  displayNbrRecipes(searchResults);
}
