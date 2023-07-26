import { recipes } from './recipes.js';

const clearBtn = document.querySelector('.header-input-clear-icon');
const searchBar = document.getElementById('search');

searchBar.addEventListener('input', (event) => {
  clearBtn.style.display = 'block';
  const searchValue = event.target.value.toLowerCase().trim();

  if (searchValue.length >= 3) {
    setTimeout(() => {
      handleSearchRecipes(recipes, searchValue);
    }, 300);
  }

  if (searchValue === '') {
    clearBtn.style.display = 'none';
    handleSearchRecipes(recipes, '');
  }
});

clearBtn.addEventListener('click', () => {
  searchBar.value = '';
  handleSearchRecipes(recipes, '');
  clearBtn.style.display = 'none';
});
