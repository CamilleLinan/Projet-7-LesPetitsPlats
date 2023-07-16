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

    let filteredSearchBar = [];
    let filteredByTags = [];

    if (!selectedItem.textContent) {
        searchValue = selectedItem;
        filteredItems = [searchValue];
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

    } else {
        searchValue = selectedItem.textContent.toLowerCase();
        filteredItems = [...filteredItems, searchValue];
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
    }

    let filteredIngredients = [];
    let filteredAppliances = [];
    let filteredUtensils = [];

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

    // Update lists
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

    updateTagList(filteredIngredients, ingredientsList);
    updateTagList(filteredAppliances, appliancesList);
    updateTagList(filteredUtensils, utensilsList);

    // Display result
    if (searchResults.length > 0) {
        displayRecipesCards(searchResults);
    } else {
        displayRecipesCards([]);
        recipesContainer.innerHTML = `<p class="no-result">Aucune recette ne contient "${filteredItems}". Vous pouvez chercher «
        tarte aux pommes », « poisson », etc.</p>`
    }

    displayNbrRecipes(searchResults);

    filteredItems = filteredItems.filter(item => item.length > 0);
    console.log('filteredItems', filteredItems);
}

// if (removeFilter) {
//     const filterType = selectedItem.classList[1];
//     const filterValue = selectedItem.textContent.toLowerCase();
//     console.log('filterValue', filterValue); 
//     if (filterType === 'ingredient') {
//         const index = filteredIngredients.indexOf(filterValue);
//         if (index !== -1) {
//             filteredIngredients.splice(index, 1);
//         }
//     } else if (filterType === 'appliance') {
//         const index = filteredAppliances.indexOf(filterValue);
//         if (index !== -1) {
//             filteredAppliances.splice(index, 1);
//         }
//     } else if (filterType === 'utensil') {
//         const index = filteredUtensils.indexOf(filterValue);
//         if (index !== -1) {
//             filteredUtensils.splice(index, 1);
//         }
//     }

//     console.log('remove', filteredIngredients)
//     return
// }
