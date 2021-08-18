import recipeDetailcss from "./recipeDetail.css"
import enchiladas from "../../assets/enchilada.jpg";
import beef from "../../assets/Beef.png";

document.getElementById('recipeImage').src = enchiladas;
document.getElementById('ing1').src = beef;
document.getElementById('ing2').src = beef;
document.getElementById('ing3').src = beef;
document.getElementById('ing4').src = beef;
document.getElementById('ing5').src = beef;

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

function replaceTextChild(parentComponent, text, replace = true) {
    const textNode = document.createTextNode(text);
    // Remove children if replace is true and if children exist
    if(replace && parentComponent.hasChildNodes()) {
        deleteChildren(parentComponent);
    }
    // Add text
    parentComponent.appendChild(textNode);
}

function populateTags(parentComponent, tagsArray, replaceChildren = true) {
    if(replaceChildren) {
        deleteChildren(parentComponent);
    }

    for(const tag of tagsArray) {
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
    if(replaceChildren) {
        deleteChildren(parentComponent);
    }

    // Create row element
    const row = document.createElement('div');
    row.className = 'row';

    // Add every card column to row
    for(let k = 0; k < ingredientsArray.length; k++) {
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

console.log('Chingue a su madre el index');

// Take id from URL params
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id') ?? 52765;

// Populate page
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
        };
        
        // Get elements to set
        const recipeImage = document.getElementById('recipeImage');
        const recipeTitle = document.getElementById('recipe-details-title');
        const recipeCategory = document.getElementById('recipe-details-category');
        const recipeRegion = document.getElementById('recipe-details-region');

        // Set recipe image
        recipeImage.src = recipe.imageUrl;

        // Set elements text
        replaceTextChild(recipeTitle, recipe.title);
        replaceTextChild(recipeCategory, recipe.category);
        replaceTextChild(recipeRegion, recipe.region);

        // Set recipe tags
        // Get categories container
        const tagsContainer = document.getElementById('categories');
        populateTags(tagsContainer, recipe.tags);

        // Set ingredients tags
        // Get ingredients container
        const ingredientsContainer = document.getElementsByClassName('ingredientsGrid')[0];
        populateIngredientsAndMeasures(ingredientsContainer, recipe.ingredients, recipe.measures);
    });
