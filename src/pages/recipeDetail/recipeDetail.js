import recipeDetailcss from "./recipeDetail.css"
import imgIconoMX from "../../assets/iconoMX.png";

document.querySelector('#iconoMX').src = imgIconoMX;

// Get a random recipe Id
function getRandomRecipe() {
    const apiUrl = new URL('https://www.themealdb.com/api/json/v1/1/random.php');
    return fetch(apiUrl)
        .then(response => response.json());
}

// Get a recipe by Id
function getRecipeById(id) {
    const apiUrl = new URL('https://www.themealdb.com/api/json/v1/1/lookup.php');
    // Add id (i) param
    const idKey = 'i'
    apiUrl.searchParams.set(idKey, id);

    return fetch(apiUrl)
        .then(response => {
            return response.json();
        });
}

function getIngredients(meal) {
    const keys = Object.keys(meal);
    const ingredientsKeys = keys.filter(key => /^strIngredient/.test(key) && meal[key])
    const ingredientsArray = ingredientsKeys.map(ingredientKey => meal[ingredientKey]);
    return ingredientsArray;
}

function getMeasures(meal) {
    const keys = Object.keys(meal);
    const measuresKeys = keys.filter(key => /^strMeasure/.test(key) && meal[key])
    const measuresArray = measuresKeys.map(measureKey => meal[measureKey]);
    return measuresArray;
}

function deleteChildren(parentComponent) {
    while (parentComponent.firstChild) {
        parentComponent.removeChild(parentComponent.firstChild);
    }
}

function setTextChild(parentComponent, text, replace = true) {
    const textNode = document.createTextNode(text);
    // Remove children if replace is true and if children exist
    if (replace && parentComponent.hasChildNodes()) {
        deleteChildren(parentComponent);
    }
    // Add text
    parentComponent.appendChild(textNode);
}

function populateTags(parentComponent, tagsArray, replaceChildren = true) {
    if (replaceChildren) {
        deleteChildren(parentComponent);
    }

    for (const tag of tagsArray) {
        // Create elements
        const anchor = document.createElement("a");
        const span = document.createElement("span");
        const textNode = document.createTextNode(tag);

        // Nest elements
        anchor.appendChild(span);
        span.appendChild(textNode);

        // Set link
        anchor.href = "#";

        // Append tag to container
        parentComponent.appendChild(anchor);
    }
}

function populateIngredientsAndMeasures(
    parentComponent, ingredientsArray, measuresArray, replaceChildren = true) {
    if (replaceChildren) {
        deleteChildren(parentComponent);
    }

    // Create row element
    const row = document.createElement('div');
    row.className = 'row';

    // Add every card column to row
    for (let k = 0; k < ingredientsArray.length; k++) {
        // Create elements
        const divCol = document.createElement('div');
        const divContainer = document.createElement('div');
        const ingredientImage = document.createElement('img');
        const divider = document.createElement('hr');
        const ingredientName = document.createElement('h5');
        const ingredientNameText = document.createTextNode(ingredientsArray[k]);
        const ingredientQuantity = document.createElement('h5');
        const ingredientQuantityText = document.createTextNode(measuresArray[k]);

        // Nest elements
        divCol.appendChild(divContainer);
        divContainer.appendChild(ingredientImage);
        divContainer.appendChild(divider);
        divContainer.appendChild(ingredientName);
        ingredientName.appendChild(ingredientNameText);
        divContainer.appendChild(ingredientQuantity);
        ingredientQuantity.appendChild(ingredientQuantityText);

        // Set classes
        divCol.className = 'col s4';
        divContainer.className = 'ingredientContainer';
        ingredientName.className = 'ingredientName';
        ingredientQuantity.className = 'ingredientQuantity';

        // Set image
        const encodedIngredientName = ingredientsArray[k].replace(' ', '%20');
        const imageUrl = `https://www.themealdb.com/images/ingredients/${encodedIngredientName}.png`;
        ingredientImage.src = imageUrl;

        // Append card colum to row
        row.appendChild(divCol);
    }

    // Add row (cards) to parent
    parentComponent.appendChild(row);
}

function populateInstructions(parentComponent, instructionsRaw, replaceChildren = true) {
    if (replaceChildren) {
        deleteChildren(parentComponent);
    }

    // Separate by new line (\r\n) and delete white spaces
    const instructionsArray = instructionsRaw.split('\r\n').filter(s => s);

    for (const instruction of instructionsArray) {
        // Create elements
        const h3 = document.createElement('h3');
        const icon = document.createElement('i');
        const iconName = document.createTextNode('fiber_manual_record');
        const instructionText = "\t" + instruction;
        const instructionTextNode = document.createTextNode(instructionText);

        // Nest elements
        h3.appendChild(icon);
        h3.appendChild(instructionTextNode);
        icon.appendChild(iconName);

        // Set class
        icon.className = 'material-icons'

        // Append tag to container
        parentComponent.appendChild(h3);
    }
}

function populateFromRecipeId(id) {
    getRecipeById(id)
        .then(response => {
            // Get recipe object
            const meal = response.meals[0];

            // Create object just with the needed information
            const recipe = {
                imageUrl: meal.strMealThumb,
                title: meal.strMeal,
                category: meal.strCategory,
                region: meal.strArea,
                tags: meal.strTags ? meal.strTags.split(',') : [],
                ingredients: getIngredients(meal),
                measures: getMeasures(meal),
                instructions: meal.strInstructions,
            };
            const title = document.getElementsByTagName('title')[0];
            const newTitle = `${recipe.title} in Foodies!`;
            setTextChild(title, newTitle);

            // Get elements to set
            const imageWraper = document.getElementById('imageContainer');
            const loader = document.getElementById('main-loader');
            const recipeTitle = document.getElementById('recipe-details-title');
            const recipeCategory = document.getElementById('recipe-details-category');
            const recipeRegion = document.getElementById('recipe-details-region');

            // Create image and set source
            const recipeImage = document.createElement('img');
            recipeImage.id = 'recipeImage';
            recipeImage.src = recipe.imageUrl;
            // Replace loader with recipe image
            imageWraper.replaceChild(recipeImage, loader);

            // Set elements text
            setTextChild(recipeTitle, recipe.title);
            setTextChild(recipeCategory, recipe.category);
            setTextChild(recipeRegion, recipe.region);

            // Set recipe tags
            // Get categories container
            const tagsContainer = document.getElementById('categories');
            populateTags(tagsContainer, recipe.tags);

            // Set ingredients cards
            // Get ingredients container
            const ingredientsContainer = document.getElementById('ingredientsGrid');
            populateIngredientsAndMeasures(ingredientsContainer, recipe.ingredients, recipe.measures);

            // Set instructions
            // Get instructions container
            const instructionsContainer = document.getElementById('recipeText');
            populateInstructions(instructionsContainer, recipe.instructions);
        });
}

function init() {
    // Get a random recipe Id
    getRandomRecipe()
        .then(resp => {
            // Random Id
            const randomId = resp.meals[0].idMeal;

            // Take id from URL params
            const urlParams = new URLSearchParams(window.location.search);
            const idParam = urlParams.get('id')

            populateFromRecipeId(idParam ?? randomId);
        });
}

init();