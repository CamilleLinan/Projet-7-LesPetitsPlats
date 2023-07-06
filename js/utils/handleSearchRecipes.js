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

const handleSearchRecipes = (recipes, selectedItem) => {
    const ingredientsList = document.querySelector('.dropdown-menu-ingredients .dropdown-list');
    const appliancesList = document.querySelector('.dropdown-menu-appliances .dropdown-list');
    const utensilsList = document.querySelector('.dropdown-menu-utensils .dropdown-list');

    let searchValue;
    if (selectedItem.textContent) {
        searchValue = selectedItem.textContent.toLowerCase()
    } else {
        searchValue = selectedItem;
    }
    
    const searchResults = recipes.filter(recipe => {
        const recipeName = recipe.name.toLowerCase();
        const recipeDescription = recipe.description.toLowerCase();
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
        const recipeAppliances = recipe.appliance.toLowerCase()
        const recipeUtensils = recipe.ustensils.filter(ustensil => ustensil !== undefined).map(ustensil => ustensil.toLowerCase());
        return (
            recipeName.includes(searchValue) ||
            recipeDescription.includes(searchValue) ||
            recipeIngredients.includes(searchValue) ||
            recipeAppliances.includes(searchValue) ||
            recipeUtensils.includes(searchValue)
        );
    });

    let filteredIngredients = [];
    let filteredAppliances = [];
    let filteredUtensils = [];
  
    searchResults.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            if (!filteredIngredients.includes(ingredient.ingredient)) {
            filteredIngredients.push(ingredient.ingredient);
            }
        });
    
        if (!filteredAppliances.includes(recipe.appliance)) {
            filteredAppliances.push(recipe.appliance);
        }
    
        recipe.ustensils.forEach(utensil => {
            if (!filteredUtensils.includes(utensil)) {
            filteredUtensils.push(utensil);
            }
        });
    });

    console.log(searchResults)
  
    // Mettre à jour les listes des filtres d'ingrédients, d'appareils et d'ustensiles
    updateTagList(filteredIngredients, ingredientsList);
    updateTagList(filteredAppliances, appliancesList);
    updateTagList(filteredUtensils, utensilsList);
    
    if (searchResults.length > 0) {
        displayRecipesCards(searchResults);
    } else {
        displayRecipesCards([]);
        recipesContainer.innerHTML = `<p class="no-result">Aucune recette ne contient "${searchValue}". Vous pouvez chercher «
        tarte aux pommes », « poisson », etc.</p>`
    }
    
    displayNbrRecipes(searchResults);
}
