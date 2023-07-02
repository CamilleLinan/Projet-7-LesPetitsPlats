const sortBarContainer = document.querySelector('.sort-bar-section');

// Create buttons for sort by tag
const createSortBarByTag = (recipes) => {
    const container = document.createElement('div');
    container.classList.add('sort-container');
    sortBarContainer.appendChild(container);

    const createSortBtn = (text, btnClass) => {
        const button = document.createElement('button');
        button.classList.add('sort-button', btnClass);
        button.innerHTML = `${text} <i class="fa-solid fa-chevron-down"></i>`;

        return button;
    }

    const ingredientsBtn = createSortBtn('Ingrédients', 'sort-button-ingredients');
    const devicesBtn = createSortBtn('Appareils', 'sort-button-devices');
    const utensilsBtn = createSortBtn('Ustensiles', 'sort-button-utensils');

    container.appendChild(ingredientsBtn);
    container.appendChild(devicesBtn);
    container.appendChild(utensilsBtn);

    const recipesIngredients = [...new Set(
        recipes.map(recipe => recipe.ingredients)
          .flat()
          .map(ingredient => ingredient.ingredient)
    )];
    console.log('Ingrédients: ', recipesIngredients);
    
    const recipesAppliances = [...new Set(
        recipes.map(recipe => recipe.appliance)
    )]
    console.log('Appareils: ', recipesAppliances);
    
    const recipesUtensils = [...new Set(
        recipes.map(recipe => recipe.ustensils)
          .flat()
          .filter(ustensil => ustensil !== undefined)
          .map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.slice(1))
    )];
    console.log('Ustensiles: ', recipesUtensils); 
}

// Create container for number of recipes
const nbrContainer = document.createElement('div');
nbrContainer.classList.add('sort-container-number');
const displayNbrRecipes = (recipes) => {
    let result;
    if (recipes.length > 1) {
        result = 'recettes'
    } else {
        result = 'recette'
    }
    nbrContainer.innerHTML = `<p>${recipes.length} ${result}</p>`;
    sortBarContainer.appendChild(nbrContainer);
}
