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

let filteredItems = [];
const handleSearchRecipes = (recipes, selectedItem) => {
    const ingredientsList = document.querySelector('.dropdown-menu-ingredients .dropdown-list');
    const appliancesList = document.querySelector('.dropdown-menu-appliances .dropdown-list');
    const utensilsList = document.querySelector('.dropdown-menu-utensils .dropdown-list');

    let searchValue;

    if (!selectedItem.textContent) {
        searchValue = selectedItem;
        filteredItems = [searchValue];

        // if (searchValue === '') {

        // }
    } else {
        searchValue = selectedItem.textContent.toLowerCase();

        if (filteredItems.includes(searchValue)) {
            const index = filteredItems.indexOf(searchValue);
            filteredItems.splice(index, 1);
        } else {
            filteredItems = [...filteredItems, searchValue];
        }
    }

    const searchResults = recipes.filter(recipe => {
        const recipeName = recipe.name.toLowerCase();
        const recipeDescription = recipe.description.toLowerCase();
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
        const recipeAppliances = recipe.appliance.toLowerCase()
        const recipeUtensils = recipe.ustensils.filter(ustensil => ustensil !== undefined).map(ustensil => ustensil.toLowerCase());

        return filteredItems.every(filter => (
            recipeName.includes(filter) ||
            recipeDescription.includes(filter) ||
            recipeIngredients.includes(filter) ||
            recipeAppliances.includes(filter) ||
            recipeUtensils.includes(filter)
        ));
    });

    filteredItems = filteredItems.filter(item => item.length > 0);
    console.log('filteredItems', filteredItems);

    let filteredIngredientsList = [];
    let filteredAppliancesList = [];
    let filteredUtensilsList = [];

    // Update lists
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
        recipesContainer.innerHTML = `<p class="no-result">Aucune recette ne contient "${filteredItems}". Vous pouvez chercher «
        tarte aux pommes », « poisson », etc.</p>`
    }

    displayNbrRecipes(searchResults);
}

// Sélectionner un filtre + taper dans la barre (cet ordre) ?

// TESTS
    // let filteredSearchBar = [];
    // let filteredByTags = [];


    // filteredSearchBar.splice(0, 1, searchValue);
    // filteredItems.splice(0, 1, filteredSearchBar);

    // searchResults = recipes.filter(recipe => {
    //     const recipeName = recipe.name.toLowerCase();
    //     const recipeDescription = recipe.description.toLowerCase();
    //     const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
    //     return filteredSearchBar.find(filter => (
    //         recipeName.includes(filter) ||
    //         recipeDescription.includes(filter) ||
    //         recipeIngredients.includes(filter)
    //     ));
    // });


    // filteredByTags.push(searchValue);
    // filteredItems.push(filteredByTags);
    
    // searchResults = recipes.filter(recipe => {
    //     const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
    //     const recipeAppliances = recipe.appliance.toLowerCase()
    //     const recipeUtensils = recipe.ustensils.filter(ustensil => ustensil !== undefined).map(ustensil => ustensil.toLowerCase());
    //     return filteredByTags.find(filter => (
    //         recipeIngredients.includes(filter) ||
    //         recipeAppliances.includes(filter) ||
    //         recipeUtensils.includes(filter)
    //     ));
    // });