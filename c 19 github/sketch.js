//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var restart,r;
var gameover,g;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud , c 
var o,o1,o2,o3,o4,o5,o6;
var cloudsgroup,obstaclesgroup;

var score;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  g = loadImage("gameOver.png"); 
  
  r = loadImage("restart.png");
  
  c = loadImage("cloud.png"); 
  
  o1 = loadImage("obstacle1.png");
  
  o2 = loadImage("obstacle2.png");
  
  o3 = loadImage("obstacle3.png");
  
  o4 = loadImage("obstacle4.png");
  
  o5 = loadImage("obstacle5.png");
  
  o6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  //set collision radius for the trex
trex.setCollider("circle",0,0,30);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;

  gameover=createSprite(300,100);
  gameover.addImage("gameover",g);
  gameover.scale=0.5;
  restart=createSprite(300,150);
  restart.addImage("restart",r);
  restart.scale=0.5;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsgroup= new Group();
  
  obstaclesgroup = new Group();
  
  score=0;
  
}

function draw() {
  background(120);
  text("score"+score,390,10);
  if(gameState===PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if(keyDown("space")&&trex.y>156) {
    trex.velocityY = -10;
  }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
    spawnclouds();
  
    spawnobs();
  
    gameover.visible=false;
    restart.visible=false;
    
    if(obstaclesgroup.isTouching(trex)){
    gameState=END;
  }
    
     } 
  else if(gameState===END){
          gameover.visible=true;
          restart.visible=true;
     //setvelocities of each game object to zero
    ground.velocityX=0;
    obstaclesgroup.setVelocityXEach(0);
    trex.velocityY=0;
    cloudsgroup.setVelocityXEach(0);
    // change the trex animation
    trex.changeAnimation("collided",trex_collided);
    //reset lifetime so the gameobjects are not desstroyed
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
          }
  
  trex.collide(invisibleGround);
  drawSprites();
  
  
}

function spawnclouds(){
  var rand = Math.round(random(20,180));
  if(frameCount%60===0){
    cloud = createSprite(600,20,40,10);
    cloud.y = Math.round(random(20,160));
    cloud.addImage("cloud1",c);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    trex.depth=obstaclesgroup.depth;
  cloudsgroup.add(cloud);  
  }
}

function spawnobs(){
  var r = Math.round(random(1,6));
  if(frameCount%80===0){
  o = createSprite(600,170,10,10);
    o.scale=0.5;
  o.velocityX = -5 ; 
  o.lifetime=120;  
   
  switch(r){
    case 1:o.addImage("i1",o1);
    break;
    case 2:o.addImage("i2",o2);
    break;
    case 3:o.addImage("i3",o3);
    break;
    case 4:o.addImage("i4",o4);
    break;
    case 5:o.addImage("i5",o5);
    break;
    case 6:o.addImage("i6",o6);
    break;
    default:break;
  }
    obstaclesgroup.add(o); 
  }
}

function reset(){
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score=0
}
