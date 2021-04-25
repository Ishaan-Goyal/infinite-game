var backGround,backGroundImage;
var player1,player1Image,player2,player2Image;
var cone,coneImage;
var inviGround;
gameState="play"
score=0
var gameOver,gameoverImage;
var restart,restartImage;
var boyfalls;
function preload(){
backGroundImage=loadImage("istockphoto-1136945165-612x612.jpg");
player1Image=loadImage("opponent.png");
player2Image=loadImage("boy.png");
coneImage=loadImage("download-removebg-preview.png");
gameoverImage=loadImage("gameOver-removebg-preview.png");
  restartImage=loadImage("restart-removebg-preview.png")
  boyfalls=loadImage("Runner-1-removebg-preview-removebg-preview-removebg-preview-removebg-preview.png")
}


function setup() {
  createCanvas(400,400)
 backGround=createSprite(200,200,400,400)
backGround.addImage(backGroundImage)
  
  backGround.scale=1.2
  
  player1=createSprite(50,275,20,20)
  player1.addImage(player1Image)
  player1.scale=0.3
  
  player2=createSprite(150,275,20,20)
    player2.addImage("boyImage",player2Image)
  player2.scale=0.15
  
  inviGround=createSprite(200,310,400,1)
  inviGround.visible=false
  
  conesGroup=new Group()
  
    player1.setCollider("rectangle",0,0,280,260)
    
   gameOver=createSprite(200,200);
  gameOver.addImage(gameoverImage)
    
    restart=createSprite(200,350)
    restart.addImage(restartImage)
    restart.scale=0.3
}

function draw() {
  if(gameState==="play"){
    if (backGround.x < 100){
      backGround.x = backGround.width/2;
    }
if(keyDown("space") && player2.y===267.275) {
  player2.velocityY=player2.velocityY-14
}
  player2.velocityY=player2.velocityY+0.8
  player2.collide(inviGround)
  backGround.velocityX=-4
   spawnCones();
    
  score = score + Math.round(getFrameRate()/60); 
    
   gameOver.visible=false
    restart.visible=false
    
    backGround.velocityX = -(6 + 3*score/80);
    cone.velocityX = -(6 + 3*score/80);
    
  if(conesGroup.isTouching(player1)) {
 player1.velocityY=player1.velocityY-15
}
  player1.velocityY= player1.velocityY+0.8
  player1.collide(inviGround)
  
    if(player2.isTouching(conesGroup)){
      gameState="end"
    }
  }else if(gameState==="end"){
    conesGroup.destroyEach();
    player1.velocityY=0
    player2.velocityY=0
   
    backGround.velocityX=0
   
    score=0
    
    player2.addImage("boyImage",boyfalls);
    player2.scale=0.5
    player1.visible=false
    player2.x=70
  
    if(mousePressedOver(restart)){
      reset();
      
    }
    gameOver.visible=true
    restart.visible=true
  }
 
  
  
 drawSprites();
  
  textSize(20)
  text("Score:",20,40)
 text(score,80,40)
}
function spawnCones(){
  if(frameCount%100===0){
   cone=createSprite(450,300,20,20);
    cone.addImage(coneImage);
    cone.scale=0.2
    cone.velocityX=-4
    cone.leifeTime=150
    conesGroup.add(cone)
    cone.setCollider("rectangle",0,0,5,5);
  }
}


function reset(){
  gameState="play";
  
  player1.visible=true
  player2.addImage("boyImage",player2Image)
  player2.scale=0.15
  player2.x = 150
gameOver.visible=false
    restart.visible=false
}