import css from "../styles.css";
import recipeJS from '../pages/recipeDetail/recipeDetail.js';
import imgGatito from "../assets/IMG_1321.jpg";
import imgGatito2 from "../assets/IMG_1321.jpg";
import imgGatito3 from "../assets/IMG_1321.jpg";
import imgGatito4 from "../assets/IMG_1321.jpg";
import imgGatito5 from "../assets/IMG_1321.jpg";
import imgGatito6 from "../assets/IMG_1321.jpg";

import imgFlag from "../assets/Flag.png"

import imgBreakfast from "../assets/Breakfast.png"

import imgIconoMX from "../assets/iconoMX.png";

document.querySelector('#gatito').src = imgGatito;
document.querySelector('#gatito2').src= imgGatito2;
document.querySelector('#gatito3').src= imgGatito3;
document.querySelector('#gatito4').src = imgGatito4;
document.querySelector('#gatito5').src= imgGatito5;
document.querySelector('#gatito6').src= imgGatito6;

document.querySelector('#flag').src= imgFlag; 

document.querySelector('#breakfast').src= imgBreakfast;

document.querySelector('#iconoMX').src=imgIconoMX;

//Iniciador de Carrusel
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel-slider');
    var instances = M.Carousel.init(elems);
});