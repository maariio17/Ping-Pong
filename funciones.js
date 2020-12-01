import {bola, pala} from './clases.js';

var palas, bolas;
var svg = document.getElementById("svg");
var rect;
var score1 = 0;
var score2 = 0;
var posicionX, posicionY;
var keydown = [];

window.onload = function(){
    crearBola();
    crearPalas();
  }
  
  function crearBola(){
    let velocidadX = 0;
    let velocidadY = 0;
    let random = parseInt(Math.random()* (5-1) + 1);
  
    switch(random){
      case 1:
        velocidadX = -10;
        velocidadY = -10;
        break;
      case 2:
        velocidadX = -10;
        velocidadY = 10;
        break;
      case 3:
        velocidadX = 10;
        velocidadY = -10;
        break;
      case 4:
        velocidadX = 10;
        velocidadY = 10;
        break;
    }
  
    posicionX = parseInt(svg.getAttribute("width"));
    posicionY = parseInt(svg.getAttribute("height"));
  
    bolas = [];
      bolas.push(new bola(10, "white", posicionX/2, posicionY/2, velocidadX, velocidadY));
  }
  
  function crearPalas(){
    palas = [];
      palas.push(new pala(20, 130, 20, 10, "black"));
      palas.push(new pala(20, 130, posicionX-40, posicionY-145, "red"));
  }
  
  
  var playGame;
  window.game = function(){
    borrarElementos();
    crearBola();
    crearPalas();
    dibujarRect();
    dibujarMarcador();
    playGame= setInterval(animaTodasBolas, 30);
  }
  
  function borrarElementos(){
    let borrar = document.getElementById("svg");
    
    while(borrar.firstElementChild){
      borrar.removeChild(borrar.firstElementChild);
    }
  }
  
  window.borrarBola = function(){
    let bola = document.getElementsByTagName("circle")[0];
    svg.removeChild(bola);
    crearBola();
  }
  
  window.dibujarRect = function(){
    for (let i=0; i<palas.length; i++){
      palas[i].dibuja();
    }
  }
  
    window.animaTodasBolas = function(){
    
    for (let i=0; i<bolas.length; i++){
         let choque = bolas[i].dibuja();
        if (choque == 1){
          score2++;
          borrarBola();
          marcador2.innerHTML = score2;
        } else if(choque == 2){
          score1++;
          borrarBola();
          marcador1.innerHTML = score1;
        }
    }
    movePlayers();
    ganador();
  }
  
  var marcador1, marcador2;
  window.dibujarMarcador = function(){
    //Marcador Player 1
    marcador1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let x = 25;
    let y = 50;
    let color = "white";
    marcador1.setAttributeNS(null, "x", x+"%");
    marcador1.setAttributeNS(null, "y", y);
    marcador1.setAttributeNS(null, "fill", color);
    marcador1.setAttributeNS(null, "text-align", "center");
    marcador1.setAttributeNS(null, "font-size", "32");
    marcador1.innerHTML = score1;
    document.getElementById("svg").appendChild(marcador1);
  
    //Marcador Player 2
    marcador2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let x2 = 75;
    let y2 = 50;
    let color2 = "white";
    marcador2.setAttributeNS(null, "x", x2+"%");
    marcador2.setAttributeNS(null, "y", y2);
    marcador2.setAttributeNS(null, "fill", color2);
    marcador2.setAttributeNS(null, "text-align", "center");
    marcador2.setAttributeNS(null, "font-size", "32");
    marcador2.innerHTML = score2;
    document.getElementById("svg").appendChild(marcador2);
  
  }
  
  window.addEventListener('keydown', function(e){
    keydown[e.keyCode] = true;
  },false);
    
  window.addEventListener('keyup',function(e) {
      keydown[e.keyCode] = false;
  },false);
  
  function movePlayers(){
    //Mover Player 1
    var posYrect1 = parseInt(document.getElementsByTagName('rect')[0].getAttribute('y'));
    if (keydown[65]){
      posYrect1-=10;
      document.getElementsByTagName('rect')[0].setAttribute('y', posYrect1);
    }
    if (keydown[90]){
      posYrect1+=10;
      document.getElementsByTagName('rect')[0].setAttribute('y', posYrect1);
    }
  
    //Mover Player 2
    var posYrect2 = parseInt(document.getElementsByTagName('rect')[1].getAttribute('y'));
    if (keydown[38]){
      posYrect2-=10;
      document.getElementsByTagName('rect')[1].setAttribute('y', posYrect2);
    }
    if (keydown[40]){
      posYrect2+=10;
      document.getElementsByTagName('rect')[1].setAttribute('y', posYrect2);
    }
  }
  
  window.ganador = function(){
    if (score2==10){
      clearInterval(playGame);
  
      let ganador1 = document.createElementNS("http://www.w3.org/2000/svg", "image");
      let x = 55;
      let y = 50;
      ganador1.setAttributeNS(null, "x", x+"%");
      ganador1.setAttributeNS(null, "y", y);
      ganador1.setAttributeNS(null, "href", "winner2.jpg");
      document.getElementById("svg").appendChild(ganador1);
  
      score1 = 0;
      score2 = 0;
    }
  
    if (score1==10){
      clearInterval(playGame);
  
      let ganador2 = document.createElementNS("http://www.w3.org/2000/svg", "image");
      let x = 10;
      let y = 50;
      ganador2.setAttributeNS(null, "x", x+"%");
      ganador2.setAttributeNS(null, "y", y);
      ganador2.setAttributeNS(null, "href", "winner1.jpg");
      document.getElementById("svg").appendChild(ganador2);
  
      score1 = 0;
      score2 = 0;
    }
  }