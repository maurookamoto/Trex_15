var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var obstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6, grupodeobstaculos;
var pontuacao=0;
var nuvem, grupodenuvens, imagemdanuvem;
var JOGAR=1;
var ENCERRAR=0;
var estadodojogo=JOGAR
var reiniciar, fim, reiniciarimagem, fimimagem

var novaimagem;

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
 obstaculo1 = loadImage("obstacle1.png");
 obstaculo2 = loadImage("obstacle2.png");
 obstaculo3 = loadImage("obstacle3.png");
 obstaculo4 = loadImage("obstacle4.png");
 obstaculo5 = loadImage("obstacle5.png"); 
 obstaculo6 = loadImage("obstacle6.png");
  
 reiniciar = loadImage("restart.png");
 fim = loadImage("gameOver.png")
  
  somPulo = loadSound("jump.mp3");
  somCheck = loadSound("checkPoint.mp3");
  somMorte = loadSound("die.mp3");
  
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided",trex_colidiu)
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;

  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  
  
  grupodeobstaculos = new Group();
  
  grupodenuvens = new Group();
  
  
  trex.setCollider("circle",0,0,40)
  //trex.debug=true
  
  reiniciarimgem = createSprite(300,100,10,10)
  reiniciarimgem.addImage ("reinicio",reiniciar)
  reiniciarimgem.scale = 0.6
  
  fimimagem = createSprite(300,80,10,10)
  fimimagem.addImage ("final",fim)
  fim.scale = 0.7
}
function draw() {
  background(180);
  
  fill("white");
  text("Pontuação: "+ pontuacao, 500,15);

  trex.collide(soloinvisivel);
  
  
  if(estadodojogo===JOGAR){

    solo.velocityX = -(4+3*pontuacao/100);
    
   pontuacao = pontuacao + Math.round(getFrameRate()/60);
    //som do checkpoint 
    if(pontuacao >0 && pontuacao %100 === 0){
      somCheck.play();
    }
    
   if(keyDown("space")&& trex.y >= 150) {
    trex.velocityY = -10;
     //som do salto
      somPulo.play();
  }  
  trex.velocityY = trex.velocityY + 0.8   
  
  if (solo.x < 0){
    solo.x = solo.width/2;
  }
    
  //gerar as nuvens
  gerarNuvens();
  gerarObstaculos();

  
  fimimagem.visible = false
  reiniciarimgem.visible = false
  
  if (trex.isTouching(grupodeobstaculos)){
    estadodojogo=ENCERRAR
    somMorte.play()
  }
    
  }else if(estadodojogo===ENCERRAR){
    solo.velocityX = 0;
    trex.velocityX = 0;
    trex.velocityY = 0
    
    grupodeobstaculos.setLifetimeEach(-1);
    grupodenuvens.setLifetimeEach(-1);
    grupodeobstaculos.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
    
    trex.changeAnimation("collided", trex_colidiu);
    
    reiniciarimgem.visible = true;
    fimimagem.visible = true;
  
  }
  
    if(mousePressedOver(reiniciarimgem)){
     resetar()
    }
  
  drawSprites();
}
function resetar (){
  estadodojogo=JOGAR
    reiniciarimgem.visible = false;
    fimimagem.visible = false;
  grupodeobstaculos.destroyEach();
  grupodenuvens.destroyEach();
  trex.changeAnimation("running", trex_correndo)
  pontuacao=0
}
function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage(imagemdanuvem)
    nuvem.y = Math.round(random(10,60))
    nuvem.scale = 0.4;
    nuvem.velocityX = -3;
    
    
    //atribuir tempo de duração à variável
    nuvem.lifetime = 180
    
    //ajustando a profundidade
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    grupodenuvens.add(nuvem)
    }
}

function gerarObstaculos(){
   if(frameCount % 60 === 0) {
    obstaculo = createSprite(600,160,40,10);
    var rand = Math.round(random(1,6))
     switch(rand) {
       case 1: obstaculo.addImage(obstaculo1); 
         obstaculo.scale = 0.4;
       break;
       case 2: obstaculo.addImage(obstaculo2); 
         obstaculo.scale = 0.4;
       break;
       case 3: obstaculo.addImage(obstaculo3);
         obstaculo.scale = 0.4;
       break;
       case 4: obstaculo.addImage(obstaculo4); 
         obstaculo.scale = 0.4;
       break;
       case 5: obstaculo.addImage(obstaculo5); 
         obstaculo.scale = 0.4;
       break; 
       case 6: obstaculo.addImage(obstaculo6); 
         obstaculo.scale = 0.4;
       break;
       default:
       break;
     }

    obstaculo.velocityX = -4;
     
    //atribuir tempo de duração à variável
    obstaculo.lifetime = 200
    
    //ajustando a profundidade
    obstaculo.depth = trex.depth
    trex.depth = trex.depth + 1;
    grupodeobstaculos.add(obstaculo)
   }
  
}