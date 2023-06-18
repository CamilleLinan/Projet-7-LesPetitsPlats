const createSortBar = (recipes) => {
    const sortBarContainer = document.querySelector('.sort-bar-section');

    const container = document.createElement('div');
    container.classList.add('sort-bar-container');
    sortBarContainer.appendChild(container);

    const sortBtn1 = document.createElement('button');
    sortBtn1.innerHTML = 'Ingrédients <i class="fa-solid fa-chevron-down"></i>';
    sortBtn1.classList.add('sort-bar-button');
    container.appendChild(sortBtn1);

    const sortBtn2 = document.createElement('button');
    sortBtn2.innerHTML = 'Appareils <i class="fa-solid fa-chevron-down"></i>';
    sortBtn2.classList.add('sort-bar-button');
    container.appendChild(sortBtn2);

    const sortBtn3 = document.createElement('button');
    sortBtn3.innerHTML = 'Ustensiles <i class="fa-solid fa-chevron-down"></i>';
    sortBtn3.classList.add('sort-bar-button');
    container.appendChild(sortBtn3);
}