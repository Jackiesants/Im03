var diryJ, dirxJ, jog, velJ, pjx, pjy; //teclas de direção
var jogo;
var velT;
var frames; 
var tamTelaW, tamTelaH;
var contBombas, painelContBombas, tmpCriaBomba;
var bombasTotal;
var velB;
var vida, barra;

function teclaDw() {
    var tecla = event.keyCode;
    
    if (tecla == 37 ) { //esquerda
        dirxJ = -1;
    }
    else if (tecla == 39){ //direita
        dirxJ = 1;
    }
    
    else if (tecla == 38){ //cima
        diryJ=-1;
    }
    
    else if (tecla == 40) { //baixo
        diryJ = 1
    }
   else if (tecla == 32) { //espaço para atirar 
        atira(pjx+17 , pjy); //centralizar o tiro, add no X
    } 
}


function teclaUp() {
        var tecla = event.keyCode;
    
        if (tecla == 38 || tecla == 40){
            diryJ = 0;
        }
        if (tecla == 37 || tecla == 39){
            dirxJ = 0;
        }
}

function atira(x, y){
    var t=document.createElement("div");
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    
    att1.value="tiroJog";
    att2.value="top:" + y + "px; left:" + x + "px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    
    document.body.appendChild(t);
}

function controleTiros() {
    var tiros = document.getElementsByClassName("tiroJog");
    var tam = tiros.length;
    
    for(let i=0; i<tam; i++){
        if(tiros[i]){
           var pt = tiros[i].offsetTop;
            pt -= velT;
            tiros[i].style.top = pt+"px";
            colisaoTiroBomba(tiros[i]);  
            if(pt<0){
                tiros[i].remove();
            }
           }
    }
    
}


function criaBomba(){
      --contBombas;
    if(jogo && contBombas>0) {
        var y = 0;
        var x = Math.random()*tamTelaW;
        
        var bomba = document.createElement("div"); 
        var att1 = document.createAttribute("class");
        var att2 = document.createAttribute("style");
         var opcoesCelulas = ["bomba antig","saudavel antig"];
        att1.value = opcoesCelulas[Math.random() < 0.5 ? 0 : 1];
        att2.value = "top:"+y+"px; left:" + x + "px;";
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        document.body.appendChild(bomba);
    }
}

function ControlaBomba(){
    bombasTotal = document.getElementsByClassName("antig");
    var tam = bombasTotal.length;

    for (let i = 0; i<tam; i++){
        if(bombasTotal[i]) {
            var pi = bombasTotal[i].offsetTop;
            pi+=velB;
            
            bombasTotal[i].style.top = pi+"px";
            if (pi>tamTelaH){
                if(bombasTotal[i].className == "bomba antig"){
               vida -= 10; }
                    gerenciaSaude();

                bombasTotal[i].remove();
               
               
            }
        }
    }
    
    if (contBombas<50){
  
        velB=7;
    }
}

function colisaoTiroBomba(tiro){
    var tam = bombasTotal.length;
     for (let i=0; i<tam; i++) {
         if (bombasTotal[i]) {
                if ( (tiro.offsetTop <= bombasTotal[i].offsetTop+50) && (tiro.offsetTop+6>= bombasTotal[i].offsetTop) && (tiro.offsetLeft<=bombasTotal[i].offsetLeft+50)&& (tiro.offsetLeft+6 >= bombasTotal[i].offsetLeft)){
                          if(bombasTotal[i].className == "saudavel antig"){
                                vida -= 20;
                              gerenciaSaude(bombasTotal[i]);

                   }
                    
                    bombasTotal[i].remove();
                    tiro.remove();
                    }
         }
     }
}


function controlaJogador(){
    pjy+=diryJ*velJ;
    pjx+=dirxJ*velJ;
    jog.style.top = pjy+"px";
    jog.style.left = pjx+"px";
}


function gameLoop(){
    if (jogo) { 
    controlaJogador();
    controleTiros();
    ControlaBomba();
    }
    
    frames = requestAnimationFrame(gameLoop);
    
}

function gerenciaSaude(){
    barra.style.width = vida + "px";
        
    if (contBombas <= 0) {
        jogo = false;
        document.class
        clearInterval(tmpCriaBomba);
            if (vida>0){
                alert("você ganhou o jogo!");
            }
        else if (vida<=0){
            alert ("você perdeu");
        }
        
    }
    
    else if (contBombas > 0 && vida <=0){
                jogo = false;
        alert("você perdeu");
    }
    
}

function inicia(){
    jogo = true;
    
    //inicia tela
    tamTelaH = window.innerHeight;
    tamTelaW = window.innerWidth;
    
    //inicia ogador
    dirxJ = diryJ = 0;
    pjx = tamTelaW/2;
    pjy = tamTelaH/2;
    velJ = 10*1,1;
    velT = 6; //velocidade do tiro
    jog = document.getElementById("naveJog");
    jog.style.top = pjy+"px";
    jog.style.left = pjx+"px";
    
    //bombas
    clearInterval(tmpCriaBomba);
    contBombas = 100; 
    velB = 6; //velocidade da bomba
    tmpCriaBomba = setInterval(criaBomba, 2000);
    //corpo 
    vida = 300;
    barra = document.getElementById("barraSaude");
    barra.style.width = vida + "px";
    gameLoop();
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);