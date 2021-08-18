import css from "./searchResult.css";
import imgIconoMX from "../../assets/iconoMX.png";

document.querySelector('#iconoMX').src= imgIconoMX;


var search = "chicken";

var favs = document.getElementsByClassName("card fav");
console.log(favs);
var ourFav = [52854, 52858, 52895, 53014, 53013, 52765];
// favoritos: pancakes, cheesecake, english breakfast, pizza, big mac, enchilada


var indexF = 0;
while (indexF < 6)
{
    assignById(ourFav[indexF], indexF);
    indexF++;
}

function assignById (id, index) {
    var baseUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    baseUrl += search;
    getMealbyId (baseUrl)
    .then(function (data) {
        console.log(data);
        //Imagen
        favs[index].children[0].children[0].src = data.meals[index].strMealThumb;
        //Título = Nombre platillo
        favs[index].children[1].children[0].innerHTML = data.meals[index].strMeal;
        //Tags
        favs[index].children[1].children[1].innerHTML = getTags(data.meals[index].strTags);
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