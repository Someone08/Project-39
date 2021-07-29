//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife, fruit, monster, fruitGroup, monsterGroup, score, r, randomFruit, position;
var knifeImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var gameoverSound, knifeSwoosh;

function preload() {

  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("germ1.jpeg", "germ2.webp");
  fruit1 = loadImage("broccoli.jpeg");
  fruit2 = loadImage("corn.jpeg");
  fruit3 = loadImage("carrot.png");
  fruit4 = loadImage("onion.jpeg");
  gameOverImage = loadImage("gameover.png");

  //load sound here
  gameoverSound = loadSound("gameover.mp3");
  knifeSwoosh = loadSound("knifeSwoosh.mp3");

}



function setup() {
  createCanvas(displayWidth - 20,displayHeight - 30);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7

  //set collider for sword
  knife.setCollider("rectangle", 0, 0, 40, 40);

  // Score variables and Groups
  score = 0;
  fruitGroup = createGroup();
  monsterGroup = createGroup();

}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {

    //Call fruits and Monster function
    fruits();
    Monster();

    // Move sword with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    // Increase score if sword touching fruit
    if (fruitGroup.isTouching(knife)) {
       fruitGroup.destroyEach();
      
       knifeSwoosh.play();
       score = score + 2;
    } 
    else {
      // Go to end state if sword touching enemy
      if (monsterGroup.isTouching(knife)) {
        gameState = END;

        //add gameover sound here
        gameoverSound.play();
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);

        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale = 3;
        knife.x = 600;
        knife.y = 300;
      }
    }
  }

  drawSprites();
  //Display score
  textSize(25);
  text("Score : " + score, 100, 50);
}


function Monster() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(displayWidth - 20, displayHeight - 30, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 550));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;

    monsterGroup.add(monster);
  }
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    position = Math.round(random(1, 2));
    fruit = createSprite(displayWidth - 20, displayHeight - 30, 20, 20);

    //using random variable change the position of fruit, to make it more challenging

    if (position == 1) {
      fruit.x = displayWidth - 20;
      //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX = -7
    } 
    else {
      if (position == 2) {
        fruit.x = 0;

        //update below give line of code for increase fruitGroup speed by 4
        fruit.velocityX = (7+(score/4));
      }
    }

    fruit.scale = 0.4;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 550));


    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}