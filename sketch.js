var canvas, backgroundImage, track, track_img;
var fastBoost, slowBoost, grandpa, robot, bison, beachhouse;
var score=0;
var car, car1_img;
var obstacleGroup, enemyG;
var obstacle, boost;
var PLAY=1;
var END=0;
var gameState=PLAY;
var restart, restart_img;
var gameOver, gameover_img;

function preload(){
    car1_img = loadImage("images/car1.png");
    grandpa = loadImage("images/grandpa.png");
    bison = loadImage("images/bison.png");
    robot = loadImage("images/robot.png");
    beachhouse = loadImage("images/beachhouse.png");
    track_img = loadImage("images/track.png");
    gameover_img = loadImage("images/gameOver.png");
    restart_img = loadImage("images/restart.png");
  }
  
  function setup(){
    canvas = createCanvas(600,600);
    car = createSprite(300,525);
    car.addImage("car", car1_img);
    track=createSprite(300,300)
    track.addImage("track", track_img);
    track.depth=car.depth;
    car.depth=car.depth+1
    enemyG=new Group();
    gameOver=createSprite(300,400);
    gameOver.addImage("over", gameover_img);
    gameOver.scale=0.1;
    restart=createSprite(300,300);
    restart.addImage("restart", restart_img);
    gameOver.visible=false;
    gameOver.depth=enemyG.depth
    gameOver.depth=enemyG.depth+1;
    restart.visible=false;
  }
  
  
  function draw(){
    background('red');

    if(gameState===PLAY){

      track.velocityY=(5+score/150);
      score=score+1;
      if(track.y>300){
      track.y=275
      
      }

      if(keyDown("right")){
        car.x+=7.5;
          }
      
          if(keyDown("left")){
            car.x-=7.5;
              }

              if(car.isTouching(enemyG)){
            gameState=END;
              }


              enemyGroup();

    }else if(gameState===END){
track.velocityY=0;
enemyG.setVelocityYEach(0);
gameOver.visible=true;
restart.visible=true;
    }
   
  if (mousePressedOver(restart)){
    reset();
  }
    drawSprites();
    textSize(28);
    fill("red");
    text("Score:"+score, 75, 75);
  }


function enemyGroup(){
  if(frameCount%100===0){

  
var enemy=createSprite(100,600,20,20);
enemy.velocityY=(3+score/150);
enemy.y=10;
enemy.x=Math.round(random(100,500));
var rand=Math.round(random(1,4))
switch(rand){
case 1:enemy.addImage(grandpa)
break;
case 2:enemy.addImage(bison)
break;
case 3:enemy.addImage(robot)
break;
case 4:enemy.addImage(beachhouse)
break;
default:break;
}
enemy.scale=0.2;
enemyG.add(enemy);
//enemy.setCollider("circle",0,0,110);
//enemy.debug=true;

}

}

function reset(){
gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
score=0;
enemyG.destroyEach();
}
        
  