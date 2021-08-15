//IMPORTACIONES
import css from "../styles.css";
//Header principal
import imgMain from "../assets/Main.png";

//Our favs
import imgFav1 from "../assets/IMG_1321.jpg";
import imgFav2 from "../assets/IMG_1321.jpg";
import imgFav3 from "../assets/IMG_1321.jpg";
import imgFav4 from "../assets/IMG_1321.jpg";
import imgFav5 from "../assets/IMG_1321.jpg";
import imgFav6 from "../assets/IMG_1321.jpg";


//Países
import imgFlag from "../assets/Flag.png"

//Footer
import imgBreakfast from "../assets/Breakfast.png"
 
import imgIconoMX from "../assets/iconoMX.png";


//ASIGNAR RECURSOS IMPORTADOS

//Header principal 
document.querySelector("#background-main-img").src = imgMain;

//Our favs
document.querySelector('#favorites1').src = imgFav1;
document.querySelector('#favorites2').src= imgFav2;
document.querySelector('#favorites3').src= imgFav3;
document.querySelector('#favorites4').src = imgFav4;
document.querySelector('#favorites5').src= imgFav5;
document.querySelector('#favorites6').src= imgFav6;

//Países
document.querySelector('#flag').src= imgFlag; 

//Footer
document.querySelector('#breakfast').src= imgBreakfast;

document.querySelector('#iconoMX').src=imgIconoMX;

//Iniciador de Carrusel
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel-slider');
    var instances = M.Carousel.init(elems);
});