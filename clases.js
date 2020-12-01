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
  
  export {bola, pala};