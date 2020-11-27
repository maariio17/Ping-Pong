var palas, bolas;
var svg = document.getElementById("svg");
var rect;
var score1 = score2 = 0;
var posicionX, posicionY;
var keydown = [];

class bola{
  constructor (radio, color, x, y, velX, velY){
      this.r = radio;
      this.color = color;
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;

      //Crear su representacion en pantalla
      this.circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.circ.setAttributeNS(null, "cx", this.x);
      this.circ.setAttributeNS(null, "cy", this.y);
      this.circ.setAttributeNS(null, "r", this.r);
      this.circ.setAttributeNS(null, "fill", this.color);
      document.getElementsByTagName("svg")[0].appendChild(this.circ);
  }

  dibuja(bola){
    //Si choqueBorde devuelve 0 si no hay choque, 1 si choca en la izquierda y 2 si choca en la derecha

      let choqueBorde = 0;
      let posXact = parseInt(this.circ.getAttribute("cx"))+this.velX;
      this.circ.setAttribute("cx", posXact);
  
      let posYact = parseInt(this.circ.getAttribute("cy"))+this.velY;
      this.circ.setAttribute("cy", posYact);
  
      //Detectar Colisiones SVG
      let tamanoSVG = document.getElementsByTagName("svg")[0].getBoundingClientRect();
      if ((posXact-this.r) <=0){
          this.velX*= -1;
          choqueBorde = 1;
      }

      if ((posXact+this.r) >= tamanoSVG.width){
        this.velX*=-1;
        choqueBorde = 2;
      }
  
      if ((posYact - this.r) <=0 || (posYact + this.r) >= tamanoSVG.height){
          this.velY*= -1;
      }

      //Detectar Colisiones Pala
      var bX = parseInt(document.getElementsByTagName('rect')[0].getAttribute('x'));
      var bxAncho = parseInt(document.getElementsByTagName('rect')[0].getAttribute('x'))+parseInt(document.getElementsByTagName('rect')[0].getAttribute('width'));
      var bY = parseInt(document.getElementsByTagName('rect')[0].getAttribute('y'));
      var bYAlto = parseInt(document.getElementsByTagName('rect')[0].getAttribute('y'))+parseInt(document.getElementsByTagName('rect')[0].getAttribute('height'));
      
      var bXrect2 = parseInt(document.getElementsByTagName('rect')[1].getAttribute('x'));
      var bxAnchorect2 = parseInt(document.getElementsByTagName('rect')[1].getAttribute('x'))+parseInt(document.getElementsByTagName('rect')[1].getAttribute('width'));
      var bYrect2 = parseInt(document.getElementsByTagName('rect')[1].getAttribute('y'));
      var bYAltorect2 = parseInt(document.getElementsByTagName('rect')[1].getAttribute('y'))+parseInt(document.getElementsByTagName('rect')[1].getAttribute('height'));

      if (posXact <= (bxAncho+this.r) && posYact>=bY && posYact <= bYAlto || posXact >= (bXrect2-this.r) && posYact >= bYrect2 && posYact <= bYAltorect2){
        this.velX*= -1;
      }

      //Choque Inferior Pala
      if (this.y-this.r <= bYAlto && this.y-this.r >= bY && this.x-this.r >= bX && this.x-this.r <= bxAncho){
        this.velY*= -1;
      }

      if(this.y-this.r <= bYAltorect2 && this.y-this.r >= bYrect2 && this.x+this.r >= bXrect2 && this.x+this.r <= bxAncho){
        this.velY*= -1;
      }

      //Choque Superior Pala
      if (this.y+this.r >= bY && this.y+this.r < bYAlto && this.x-this.r >= bX && this.x-this.r <= bxAncho){
        this.velY*= -1;
      }

      if(this.y+this.r >= bYrect2 && this.y+this.r < bYAltorect2 && this.x-this.r >= bXrect2 && this.x-this.r <= bxAnchorect2){
        this.velY*= -1;
      }


      //Movimiento Barra No Ocultarse
      if (bY<=0){
        document.getElementsByTagName('rect')[0].setAttribute('y', 0);
      }

      if (bYrect2 <= 0){
        document.getElementsByTagName('rect')[1].setAttribute('y', 0);
      }

      if (bYAlto >= tamanoSVG.height){
        document.getElementsByTagName('rect')[0].setAttribute('y', 570);
      }

      if (bYAltorect2 >= tamanoSVG.height){
        document.getElementsByTagName('rect')[1].setAttribute('y', 570);
      }

      return choqueBorde;
  }
}

class pala{
  constructor (ancho, alto, px, py, color){
    this.ancho = ancho;
    this.alto = alto;
    this.px = px;
    this.py = py;
    this.color = color;

    //Crear su representacion en pantalla
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rect.setAttributeNS(null, "x", this.px);
    this.rect.setAttributeNS(null, "y", this.py);
    this.rect.setAttributeNS(null, "width", this.ancho);
    this.rect.setAttributeNS(null, "height", this.alto);
    this.rect.setAttributeNS(null, "fill", this.color);
    document.getElementsByTagName("svg")[0].appendChild(this.rect);
  }

  dibuja(pala){
    let posX = parseInt(this.rect.getAttribute("x"));
    let posY = parseInt(this.rect.getAttribute("y"));
    let anc = parseInt(this.rect.getAttribute("width"));
    let lar = parseInt(this.rect.getAttribute("height"));

    this.rect.setAttribute("x", posX);
    this.rect.setAttribute("y", posY);
    this.rect.setAttribute("width", anc);
    this.rect.setAttribute("height", lar);

  }
}

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
function game(){
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

function borrarBola(){
  let bola = document.getElementsByTagName("circle")[0];
  svg.removeChild(bola);
  crearBola();
}

function dibujarRect(){
  for (i=0; i<palas.length; i++){
    palas[i].dibuja();
  }
}

function animaTodasBolas(){
  
  for (i=0; i<bolas.length; i++){
      choque = bolas[i].dibuja();
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
function dibujarMarcador(){
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

function ganador(){
  if (score2==10){
    clearInterval(playGame);

    ganador1 = document.createElementNS("http://www.w3.org/2000/svg", "image");
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

    ganador2 = document.createElementNS("http://www.w3.org/2000/svg", "image");
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
