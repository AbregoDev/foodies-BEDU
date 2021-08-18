//#region IMPORTACIONES
import css from "../styles.css";

//Header principal
import imgMain from "../assets/Main.png";

//Our favs


//Países
import countryFlags from './flags';

//Footer
import imgBreakfast from "../assets/Breakfast.png"
 
import imgIconoMX from "../assets/iconoMX.png";
//#endregion

//#region ASIGNAR RECURSOS IMPORTADOS

//Header principal 
document.querySelector("#background-main-img").src = imgMain;


//Footer
document.querySelector('#breakfast').src= imgBreakfast;
document.querySelector('#iconoMX').src = imgIconoMX;


//#endregion

//#region METODOS
//Iniciador de Carrusel

var slideIndex = 0;

document.getElementById('prev').addEventListener("click", prevSlide);
document.getElementById('next').addEventListener("click", nextSlide);

showSlides(slideIndex);

// Next/previous controls
function nextSlide() {
    showSlides(slideIndex += 1);
}
function prevSlide() {
    showSlides(slideIndex += -1);
}


function showSlides(n) {
    var i = 0;
    var slides = document.getElementsByClassName("c-item");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (n > slides.length-1) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length-1}
    slides[slideIndex].style.display = "block";
}
//#endregion

//#region API

//#region FAVORITES
var favs = document.getElementsByClassName("card fav");
console.log(favs);
var ourFav = [52854, 52858, 52895, 53014, 53013, 52765];
// favoritos: pancakes, cheesecake, english breakfast, pizza, big mac, enchilada


var indexF = 0;
while (indexF < ourFav.length)
{
    assignById(ourFav[indexF], indexF);
    indexF++;
}

function assignById (id, index) {
    var baseUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    baseUrl += ourFav[index];
    getMealbyId (baseUrl)
    .then(function (data) {
        console.log(data);
        //Imagen
        favs[index].children[0].children[0].src = data.meals[0].strMealThumb;
        //Título = Nombre platillo
        favs[index].children[1].children[0].innerHTML = data.meals[0].strMeal;
        //Tags
        favs[index].children[1].children[1].innerHTML = getTags(data.meals[0].strTags);
        console.log(getTags(data.meals[0].strTags));
    });
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
//#endregion

//#region REGIONS
var regions = document.getElementsByClassName("card horizontal");
getRegions ()
    .then(function (data) {

        var indexR = 0;
        data.meals.forEach(function(data) {
            regions[indexR].children[1].children[0].children[0].innerHTML = data.strArea;
            //card horizontal > card-stacked > card-content > flow-text >txt = string Area
            regions[indexR].children[0].children[0].src = countryFlags[data.strArea];
            //card horizontal > card-image > responsive-img > src = string Area
            indexR++;
        }) 
        
});


function getRegions (){
    return fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then(function(response) {
            return response.json();
        })
}

console.log('Chingue a su madre el recipeDetails');

//#endregion

//#endregion
