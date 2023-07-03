const sortBarContainer = document.querySelector('.sort-bar-section');

// Create buttons for sort by tag
const createSortBarByTag = (recipes) => {
    sortBarContainer.innerHTML = `
        <div class="sort-container">
            <div class="sort-container-button">
                <button class="sort-button sort-button-ingredients">Ingrédients <i class="fa-solid fa-chevron-down"></i></button>
                <div class="dropdown-menu dropdown-menu-ingredients">
                    <label></label>
                    <div class="dropdown-menu-container-input">
                        <input 
                            type="text" 
                            class="dropdown-menu-input" 
                        />
                        <button class="dropdown-menu-input-clear">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <i class="fa-solid fa-magnifying-glass dropdown-menu-input-icon"></i>
                    </div>
                    <ul class="dropdown-list"></ul>
                </div>
            </div>
            <div class="sort-container-button">
                <button class="sort-button sort-button-appliances">Appareils <i class="fa-solid fa-chevron-down"></i></button>
                <div class="dropdown-menu dropdown-menu-appliances">
                    <label></label>
                    <div class="dropdown-menu-container-input">
                        <input 
                            type="text" 
                            class="dropdown-menu-input" 
                        />
                        <button class="dropdown-menu-input-clear">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <i class="fa-solid fa-magnifying-glass dropdown-menu-input-icon"></i>
                    </div>
                    <ul class="dropdown-list"></ul>
                </div>
            </div>
            <div class="sort-container-button">
                <button class="sort-button sort-button-utensils">Ustensiles <i class="fa-solid fa-chevron-down"></i></button>            
                <div class="dropdown-menu dropdown-menu-utensils">
                    <label></label>
                    <div class="dropdown-menu-container-input">
                        <input 
                            type="text" 
                            class="dropdown-menu-input" 
                        />
                        <button class="dropdown-menu-input-clear">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <i class="fa-solid fa-magnifying-glass dropdown-menu-input-icon"></i>
                    </div>
                    <ul class="dropdown-list"></ul>
                </div>
            </div>
        </div>
    `

    const recipesIngredients = [...new Set(
        recipes.map(recipe => recipe.ingredients)
          .flat()
          .map(ingredient => ingredient.ingredient)
    )];
    
    const recipesAppliances = [...new Set(
        recipes.map(recipe => recipe.appliance)
    )]
    
    const recipesUtensils = [...new Set(
        recipes.map(recipe => recipe.ustensils)
          .flat()
          .filter(ustensil => ustensil !== undefined)
          .map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.slice(1))
    )];

    const ingredientsList = document.querySelector('.dropdown-menu-ingredients .dropdown-list');
    const appliancesList = document.querySelector('.dropdown-menu-appliances .dropdown-list');
    const utensilsList = document.querySelector('.dropdown-menu-utensils .dropdown-list');

    recipesIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });

    recipesAppliances.forEach(appliance => {
        const li = document.createElement('li');
        li.textContent = appliance;
        appliancesList.appendChild(li);
    });

    recipesUtensils.forEach(utensil => {
        const li = document.createElement('li');
        li.textContent = utensil;
        utensilsList.appendChild(li);
    });

    // Dropdown Menu
    const dropdownMenuIngredients = document.querySelector('.dropdown-menu-ingredients');
    const dropdownMenuAppliances = document.querySelector('.dropdown-menu-appliances');
    const dropdownMenuUtensils = document.querySelector('.dropdown-menu-utensils');

    const btnIngredients = document.querySelector('.sort-button-ingredients');
    const btnAppliances = document.querySelector('.sort-button-appliances');
    const btnUtensils = document.querySelector('.sort-button-utensils');

    const toggleDropdownMenuIngredients = () => {
        dropdownMenuIngredients.classList.toggle('show');
    }
    const toggleDropdownMenuAppliances = () => {
        dropdownMenuAppliances.classList.toggle('show');
    }
    const toggleDropdownMenuUtensils = () => {
        dropdownMenuUtensils.classList.toggle('show');
    }
    
    btnIngredients.addEventListener('click', toggleDropdownMenuIngredients);
    btnAppliances.addEventListener('click', toggleDropdownMenuAppliances);
    btnUtensils.addEventListener('click', toggleDropdownMenuUtensils);
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
