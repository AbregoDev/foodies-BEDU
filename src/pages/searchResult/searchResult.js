import css from "./searchResult.css";
import imgIconoMX from "../../assets/iconoMX.png";

document.querySelector('#iconoMX').src= imgIconoMX;

// variable obtenida en index.html
var search = localStorage.getItem("search");
search = "chicken";

//Cambiar nombres
const titulo = document.getElementsByTagName('h4');
titulo[0].innerHTML = search + " recipes";
titulo[2].innerHTML = "Made with " + search;

const byName = document.querySelector('#byName');
const madeWith = document.querySelector('#madeWith');

//Recetas que coincidan con la búsqueda
getMealByName()
  .then(function (data) {
    console.log(data);
    if (data.meals == null)
    {
        noMeals(byName)
    }
    else 
    {
        data.meals.forEach(function (data) {
            var baseUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
            baseUrl += data.idMeal;
            getMealbyId (baseUrl)
            .then(function (data) {
                
                console.log(data);
                
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
  getMealByIngredient()
  .then(function (data) {
    console.log(data);
    if (data.meals == null)
    {
        noMeals(madeWith);
    }
    else 
    {
        data.meals.forEach(function (data) {
            var baseUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
            baseUrl += data.idMeal;
            getMealbyId (baseUrl)
            .then(function (data) {
                
                console.log(data);
                
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

function getMealByName() {
    return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+search)
    .then(function (response) {
      return response.json();
    })
}

function getMealByIngredient() {
    return fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+search)
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

function noMeals (parent){
    console.log("sad");
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