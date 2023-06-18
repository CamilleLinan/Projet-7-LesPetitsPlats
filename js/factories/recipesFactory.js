const createRecipes = (recipes) => {
    const recipesContainer = document.querySelector('.recipes-section');

    recipes.forEach((recipe) => {
        const recipeCard = document.createElement('article');
        recipeCard.setAttribute('id', recipe.id);
        recipeCard.classList.add('recipe');

        recipeCard.innerHTML = `
            <img src="assets/images/${recipe.image}" alt="${recipe.name}" class="recipe-cover">
            <div class="recipe-container">
                <h2 class="recipe-title">${recipe.name}</h2>
                
                <h3 class="recipe-subtitle">RECETTE</h3>
                <p class="recipe-description">${recipe.description}</p>
                
                <h3 class="recipe-subtitle">INGRÉDIENTS</h3>
                <ul class="recipe-ingredients">
                    ${recipe.ingredients.map((ingredient) => `
                        <li class="recipe-ingredients-item">
                            <div>${ingredient.ingredient}</div>
                            <div class="recipe-ingredients-qty">${ingredient.quantity || ''} ${ingredient.unit || ''}</div>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <span class="recipe-time">${recipe.time}min</span>
        `;

        recipesContainer.appendChild(recipeCard);
    });
}