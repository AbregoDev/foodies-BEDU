import css from "./searchResult.css";
import imgIconoMX from "../../assets/iconoMX.png";

document.querySelector('#iconoMX').src= imgIconoMX;

// Take id from URL params
const urlParams = new URLSearchParams(window.location.search);
const searchParam = urlParams.get('q');

//Cambiar nombres
function searchTitles(searchQuery) {
    const searchTitle = document.getElementById('searchTitle');
    searchTitle.innerHTML = `\"${searchQuery}\" recipes`;
    const madeWithtitle = document.getElementById('madeWithTitle');
    madeWithtitle.innerHTML = `Made with \"${searchQuery}\"`;
}

const byName = document.querySelector('#byName');
const madeWith = document.querySelector('#madeWith');

// Add event listener to button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', updateSearch);

populateRecipes(searchParam);

//Recetas que coincidan con la búsqueda
function populateRecipes(searchQuery) {
    searchTitles(searchQuery)

    getMealByName(searchQuery)
    .then(data => {
        // Delete loader if exists
        const loader = document.getElementById('loaderContainer');
        if(loader) {
            byName.removeChild(byName.firstChild);
        }

        // console.log(data);
        if (data.meals == null)
        {
            noMeals(byName, searchQuery)
        }
        else 
        {
            data.meals.forEach(data => {
                var baseUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
                baseUrl += data.idMeal;
                getMealbyId (baseUrl)
                .then(function (data) {
                    
                    // console.log(data);
                    
                    let article = document.createElement('article');
                    article.className = 'col s4';

                    let div1 = document.createElement('div');
                    div1.className = "card fav";

                    let div2 = document.createElement('div');
                    div2.className = "card-image";
                    
                    let img = document.createElement('img');
                    img.className = "responsive-img";
                    img.src = data.meals[0].strMealThumb; // Link Imagen receta

                    let a = document.createElement('a');
                    a.className = "btn-floating halfway-fab waves-effect waves-light red";
                    // Link to recipe details
                    const recipeId = data.meals[0].idMeal
                    const recipeLink = `recipeDetail.html?id=${recipeId}`;
                    a.href = recipeLink;

                    let i = document.createElement('i');
                    i.className = "material-icons";
                    i.textContent = "arrow_forward";

                    let div3 = document.createElement('div');
                    div3.className = "card-content";

                    let span = document.createElement('span');
                    span.className = "card-title";
                    span.textContent = data.meals[0].strMeal; // Nombre receta

                    let p = document.createElement('p');
                    p.textContent = getTags(data.meals[0].strTags); // Tags receta

                    a.appendChild(i);
                    div2.appendChild(img);
                    div2.appendChild(a);
                    div3.appendChild(span);
                    div3.appendChild(p);
                    div1.appendChild(div2);
                    div1.appendChild(div3);
                    article.appendChild(div1);

                    byName.appendChild(article);

                }); 
            })
        }    
    })

    //Recetas que contengan el ingrediente
  getMealByIngredient(searchQuery)
  .then(function (data) {
    // console.log(data);
    if (data.meals == null)
    {
        noMeals(madeWith, searchQuery);
    }
    else 
    {
        data.meals.forEach(function (data) {
            var baseUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
            baseUrl += data.idMeal;
            getMealbyId (baseUrl)
            .then(function (data) {
                
                // console.log(data);
                
                let article = document.createElement('article');
                article.className = 'col s4';

                let div1 = document.createElement('div');
                div1.className = "card fav";

                let div2 = document.createElement('div');
                div2.className = "card-image";
                
                let img = document.createElement('img');
                img.className = "responsive-img";
                img.src = data.meals[0].strMealThumb; // Link Imagen receta

                let a = document.createElement('a');
                a.className = "btn-floating halfway-fab waves-effect waves-light red";
                // Link to recipe details
                const recipeId = data.meals[0].idMeal
                const recipeLink = `recipeDetail.html?id=${recipeId}`;
                a.href = recipeLink;

                let i = document.createElement('i');
                i.className = "material-icons";
                i.textContent = "arrow_forward";

                let div3 = document.createElement('div');
                div3.className = "card-content";

                let span = document.createElement('span');
                span.className = "card-title";
                span.textContent = data.meals[0].strMeal; // Nombre receta

                let p = document.createElement('p');
                p.textContent = getTags(data.meals[0].strTags); // Tags receta

                a.appendChild(i);
                div2.appendChild(img);
                div2.appendChild(a);
                div3.appendChild(span);
                div3.appendChild(p);
                div1.appendChild(div2);
                div1.appendChild(div3);
                article.appendChild(div1);

                madeWith.appendChild(article);

            }); 
        }) 
    }
  })
}

function getMealByName(searchQuery) {
    return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchQuery)
    .then(function (response) {
      return response.json();
    })
}

function getMealByIngredient(searchQuery) {
    return fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + searchQuery)
    .then(function (response) {
      return response.json();
    })
}

function getMealbyId (urlId){
    return fetch(urlId)
        .then(function(response) {
            return response.json();
        })
}

function getTags (stringTags) {
    var tags = "";
    if (stringTags == null) {return tags = "No tags."}
    var arrayTags = stringTags.split(',');
    for (var i = 0; i < arrayTags.length; i++)
    {
        if (i == arrayTags.length-1) {tags+= "#"+ arrayTags[i];}
        else {tags+= "#" + arrayTags[i] + ", ";}
        
    }
    return tags;
}

function noMeals (parent, search){
    // console.log("sad");
    let article = document.createElement('article');
    article.className = "col s10 center";
    let h4 = document.createElement('h4');
    h4.className = "title-no-found";
    h4.textContent = "No results found for " + search + ".";
    let i = document.createElement('i');
    i.id = "sad-face";
    i.className = "material-icons";
    i.textContent = "sentiment_dissatisfied";
    i.style.fontSize = 60;

    article.appendChild(h4);
    article.appendChild(i);
    parent.appendChild(article);
}

function deleteChildren(parentComponent) {
    while (parentComponent.firstChild) {
        parentComponent.removeChild(parentComponent.firstChild);
    }
}

function updateSearch() {
    // Delete previous recipe results
    const byName = document.getElementById('byName');
    const madeWith = document.getElementById('madeWith');
    deleteChildren(byName);
    deleteChildren(madeWith);
    // Loader
    // <div class="preloader-wrapper big active">
    //     <div class="spinner-layer spinner-blue-only">
    //         <div class="circle-clipper left">
    //             <div class="circle"></div>
    //         </div>
    //         <div class="gap-patch">
    //             <div class="circle"></div>
    //         </div>
    //         <div class="circle-clipper right">
    //             <div class="circle"></div>
    //         </div>
    //     </div>
    // </div>

    // Create elements
    const container = document.createElement('div');
    const divWraper = document.createElement('div');
    const spinner = document.createElement('div');
    const circleClipperLeft = document.createElement('div');
    const circleClipperRight = document.createElement('div');
    const gapPatch = document.createElement('div');
    const circle = document.createElement('div');
    // Nest
    container.appendChild(divWraper);
    divWraper.appendChild(spinner);
    spinner.appendChild(circleClipperLeft);
    spinner.appendChild(gapPatch);
    spinner.appendChild(circleClipperRight);
    circleClipperLeft.appendChild(circle);
    gapPatch.appendChild(circle);
    circleClipperRight.appendChild(circle);
    // Classes
    divWraper.className = 'preloader-wrapper big active';
    spinner.className = 'spinner-layer spinner-blue-only';
    circleClipperLeft.className = 'circle-clipper left';
    gapPatch.className = 'gap-patch';
    circleClipperRight.className = 'circle-clipper right';
    circle.className = 'circle';
    // Append to parent
    container.id = 'loaderContainer';
    byName.appendChild(container);

    // Get search query
    const newSearch = document.getElementById('autocomplete-input').value;
    // Re-populate with search results
    populateRecipes(newSearch);
}