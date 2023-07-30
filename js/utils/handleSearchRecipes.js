const recipesContainer = document.querySelector('.recipes-section');

const updateTagList = (filteredTags, tagList) => {
    tagList.innerHTML = '';
  
    filteredTags.forEach((tag, index) => {
      const li = document.createElement('li');
      const id = `${tag}_${index}`;
      li.setAttribute('id', id);
      li.classList.add('sort-list-item');
      li.textContent = tag;
      tagList.appendChild(li);
    });
};

let selectedFilters = [];
let searchValue = '';

const handleSearchRecipes = (recipes, selectedItem) => {
    const ingredientsList = document.querySelector('.dropdown-menu-ingredients .dropdown-list');
    const appliancesList = document.querySelector('.dropdown-menu-appliances .dropdown-list');
    const utensilsList = document.querySelector('.dropdown-menu-utensils .dropdown-list');

    const removeDiacritics = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // Add new searchValue or add value in filters
    if (!selectedItem.textContent) {
        searchValue = removeDiacritics(selectedItem);
    } else {
        let selectedValue = removeDiacritics(selectedItem.textContent.toLowerCase());
        if (selectedFilters.includes(selectedValue)) {
            const index = selectedFilters.indexOf(selectedValue);
            selectedFilters.splice(index, 1);
        } else {
            selectedFilters = [...selectedFilters, selectedValue];
        }
    }

    // Filter recipes
    const searchResults = [];
    for (const recipe of recipes) {
        const recipeName = removeDiacritics(recipe.name.toLowerCase().trim());
        const recipeDescription = removeDiacritics(recipe.description.toLowerCase().trim());
        const recipeIngredients = recipe.ingredients.map(ingredient => removeDiacritics(ingredient.ingredient.toLowerCase())).join(' ');
        const recipeAppliances = removeDiacritics(recipe.appliance.toLowerCase());
        const recipeUtensils = recipe.ustensils.filter(ustensil => ustensil !== undefined).map(ustensil => removeDiacritics(ustensil.toLowerCase()));

        const match = (
            selectedFilters.every(filter => (
                recipeIngredients.includes(removeDiacritics(filter)) ||
                recipeAppliances.includes(removeDiacritics(filter)) ||
                recipeUtensils.includes(removeDiacritics(filter))
            )) &&
            (searchValue === '' ||
                recipeName.includes(searchValue) ||
                recipeDescription.includes(searchValue) ||
                recipeIngredients.includes(searchValue)
            )
        );

        if (match) {
            searchResults.push(recipe);
        }
    }

    // Update lists
    let filteredIngredientsList = [];
    let filteredAppliancesList = [];
    let filteredUtensilsList = [];

    searchResults.forEach((recipe) => {
        recipe.ingredients.forEach(ingredient => {
            if (!filteredIngredientsList.includes(ingredient.ingredient)) {
            filteredIngredientsList.push(ingredient.ingredient);
            }
        });
    
        if (!filteredAppliancesList.includes(recipe.appliance)) {
            filteredAppliancesList.push(recipe.appliance);
        }
    
        recipe.ustensils.forEach(utensil => {
            if (!filteredUtensilsList.includes(utensil)) {
                filteredUtensilsList.push(utensil);
            }
        });
    });

    updateTagList(filteredIngredientsList, ingredientsList);
    updateTagList(filteredAppliancesList, appliancesList);
    updateTagList(filteredUtensilsList, utensilsList);

    // Display result
    if (searchResults.length > 0) {
        displayRecipesCards(searchResults);
    } else {
        displayRecipesCards([]);
        recipesContainer.innerHTML = `<p class="no-result">Aucune recette ne contient "${searchValue}, ${selectedFilters}". Vous pouvez chercher «
        tarte aux pommes », « poisson », etc.</p>`
    }

    displayNbrRecipes(searchResults);
}
