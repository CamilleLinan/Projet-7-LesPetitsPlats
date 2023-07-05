const sortBarContainer = document.querySelector('.sort-section');

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
                            id="input-ingredients" 
                            class="dropdown-menu-input" 
                        />
                        <button id="button-clear-ingredients" class="dropdown-menu-input-clear">
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
                            id="input-appliances"  
                            class="dropdown-menu-input" 
                        />
                        <button id="button-clear-appliances" class="dropdown-menu-input-clear">
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
                            id="input-utensils" 
                            class="dropdown-menu-input" 
                        />
                        <button id="button-clear-utensils" class="dropdown-menu-input-clear">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <i class="fa-solid fa-magnifying-glass dropdown-menu-input-icon"></i>
                    </div>
                    <ul class="dropdown-list"></ul>
                </div>
            </div>
        </div>
        <div class="sort-container-number"></div>
    `

    // Add Lists
    const ingredientsList = document.querySelector('.dropdown-menu-ingredients .dropdown-list');
    const appliancesList = document.querySelector('.dropdown-menu-appliances .dropdown-list');
    const utensilsList = document.querySelector('.dropdown-menu-utensils .dropdown-list');

    const recipesIngredients = [...new Set(
        recipes.map(recipe => recipe.ingredients)
            .flat()
            .map(ingredient => ingredient.ingredient.toLowerCase())
            .map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1))
    )];

    const recipesAppliances = [...new Set(
        recipes.map(recipe => recipe.appliance.toLowerCase())
            .map(recipe => recipe.charAt(0).toUpperCase() + recipe.slice(1))
    )];

    const recipesUtensils = [...new Set(
        recipes.map(recipe => recipe.ustensils)
          .flat()
          .filter(ustensil => ustensil !== undefined)
          .map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.slice(1))
    )];
    
    const createTagList = (recipesTags, tagList) => {
        recipesTags.forEach((tag, index) => {
            const li = document.createElement('li');
            const id = `${tag}_${index}`;
            li.setAttribute('id', id);
            li.classList.add('sort-list-item');
            li.textContent = tag;
            tagList.appendChild(li);
        })
    }

    createTagList(recipesIngredients, ingredientsList);
    createTagList(recipesAppliances, appliancesList);
    createTagList(recipesUtensils, utensilsList);

    const addEventForTagList = (tagList) => {
        tagList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const selectedItem = event.target;
                selectedItem.classList.add('selected');
                // le "selected" doit aussi apparaitre en haut de la liste

                const button = document.createElement('button');
                button.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
                button.classList.add('list-item-icon');
                button.addEventListener('click', () => {
                    selectedItem.classList.remove('selected');
                    selectedItem.removeChild(button);
                    selectedItemsList.removeChild(selectedItem);
                    tagList.appendChild(selectedItem);
                })
                selectedItem.appendChild(button);
    
                const selectedItemsList = document.querySelector('.selected-items-list');
                selectedItemsList.appendChild(selectedItem);
            }
        })
    }

    addEventForTagList(ingredientsList);
    addEventForTagList(appliancesList);
    addEventForTagList(utensilsList);

    // Dropdown Menu & buttons
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

    // Search item in List
    const inputIngredients = document.getElementById('input-ingredients')
    const inputAppliances = document.getElementById('input-appliances')
    const inputUtensils = document.getElementById('input-utensils')
    
    const clearBtnIngredients = document.getElementById('button-clear-ingredients')
    const clearBtnAppliances = document.getElementById('button-clear-appliances')
    const clearBtnUtensils = document.getElementById('button-clear-utensils')

    const addEventForInput = (clearBtn, input, list) => {
        input.addEventListener('input', (event) => {
            clearBtn.style.display = 'block';
            const searchValue = event.target.value.toLowerCase().trim();
    
            if (searchValue.length >= 3) {
                setTimeout(() => {
                    handleSearch(searchValue, list);
                }, 300);
            }

            if (searchValue === '') {
                clearBtn.style.display = 'none';
                handleSearch('', list);
            }
        });

        clearBtn.addEventListener('click', () => {
            input.value = '';
            clearBtn.style.display = 'none';
            handleSearch('', list);
        });

        const handleSearch = (searchValue, itemList) => {
            itemList.querySelectorAll('li').forEach((item) => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        };
    }

    addEventForInput(clearBtnIngredients, inputIngredients, ingredientsList);
    addEventForInput(clearBtnAppliances, inputAppliances, appliancesList);
    addEventForInput(clearBtnUtensils, inputUtensils, utensilsList);
}

// Create container for number of recipes
const displayNbrRecipes = (recipes) => {
    const nbrContainer = document.querySelector('.sort-container-number')
    let result;
    if (recipes.length > 1) {
        result = 'recettes'
    } else {
        result = 'recette'
    }
    nbrContainer.innerHTML = `<p>${recipes.length} ${result}</p>`;
}
