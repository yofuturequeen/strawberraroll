let roll, clouds, strawberry, poison, flour, cake;
let rollImg, cloudsImg, strawberryImg, poisonImg, flourImg, cakeImg;
let strawberries, flours, poisons;
let cakeVid;
let collectSound, overSound, themeSound;
let x1 = 0;
let x2;
let scrollSpeed = 20;
let score = 0;
let screen = 0;
let velocity = -10;

function preload() {
    rollImg = loadImage("images/roll.png");
    cloudsImg = loadImage("images/clouds.png");
    strawberryImg = loadImage("images/strawberry.png");
    poisonImg = loadImage("images/poison.png");
    flourImg = loadImage("images/flour.png");
    cakeImg = loadImage("images/cake.png");
    cakeVid = loadAni('images/cake_making.gif');
    collectSound = loadSound('audio/collect.wav');
    overSound = loadSound('audio/over.mp3');
    themeSound = loadSound('audio/theme.mp3');
}

function setup() {
  new Canvas(windowWidth, windowHeight);
  x2 = width;
  
  strawberries = new Group();
  poisons = new Group();
  flours = new Group();
  
  roll = new Sprite();
  roll.addImg(rollImg);
  roll.scale = 1.5;
  
}

function draw() {
  clear();
  background(209, 240, 255);
  image(cloudsImg, x1, 0, width, height);
  image(cloudsImg, x2 , 0, width, height);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }

  if (screen == 0) {
    startScreen();
  } else if (screen == 1) {
    playGame();
  } else if (screen == 2) {
    gameOver();
  }
}

// display at the beginning
function startScreen() {
    score = 0;
    textSize(20);
    fill (0);
    text("Collect strawberries and flour to make a yummy cake! Avoid the poison X.X", windowWidth/2 - 350, windowHeight/2 - 80);
    text("Click to start game", windowWidth/2 - 80, windowHeight/2);
}

// start game upon click
function playGame() {
    textSize(20);
    fill(0);
    text("Score: " + score, windowWidth - 150, 50)

  if (frameCount % 30 == 0) {
    createStrawberry();
  }
  
  if (frameCount % 60 == 0) {
    createPoison();
  }
  
  if (frameCount % 50 == 0) {
    createFlour();
  }

  roll.overlaps(strawberries, collect);
  roll.overlaps(flours, collect);

   if (roll.overlaps(poisons)) {
    themeSound.stop();
    overSound.play();
    screen = 2;
    strawberries.removeAll();
    poisons.removeAll();
    //image(cakeVid, 0, 0);
  }
  // player.overlap(strawberries, collect);
  
  if (frameCount % 400 == 0) {
    velocity -= 15;
  }
  roll.moveTowards(mouse, 1);
}

// game over screen + click to restart
function gameOver() {
  animation(cakeVid, windowWidth/2 + 100, windowHeight/2 + 60);
  cakeVid.play();
  textSize(50);
  text("GAME OVER", windowWidth/2 - 50, windowHeight/2 - 160);  
  textSize(30);
  text("FINAL SCORE: " + score, windowWidth/2 - 20, windowHeight/2 - 110);
  textSize(20);
  text("nice cake ;) click to restart", windowWidth/2, windowHeight/2 + 200);
}

function createStrawberry() {
  strawberries = new Group();
  let strawberry = new Sprite(random(width), random(height));
  strawberry.addImage(strawberryImg);
  strawberry.scale = 1.5;
  strawberry.velocity.x = velocity;
  strawberries.add(strawberry);
}

function createFlour() {
    flours = new Group();
    let flour = new Sprite(random(width), random(height));
    flour.addImage(flourImg);
    flour.scale = 1.5;
    flour.velocity.x = velocity;
    flours.add(flour);
  }

function createPoison() {
  poisons = new Group();
  let poison = new Sprite(random(width), random(height), 20, 20);
  poison.addImage(poisonImg);
  poison.scale = 1.5;
  poison.velocity.x = velocity;
  poisons.add(poison);
}

function collect(player, ingredient) {
  collectSound.play();
  score += 20;
  ingredient.remove();
}

// changes screen based on mouse click
function mousePressed(){
    if (screen==0) {
  	screen=1
    themeSound.loop();
  } else if(screen==2) {
  	screen=0
  }
}
