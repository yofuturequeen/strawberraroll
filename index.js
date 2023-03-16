let player;
let strawberry, poison;
let strawberries, poisons;
let cakeVid;
let collectSound, overSound, themeSound;
let screen = 0;

function preload() {
  collectSound = loadSound('audio/collect.wav');
  overSound = loadSound('audio/over.mp3');
  themeSound = loadSound('audio/theme.mp3');
  cakeVid = loadAni('images/cake_making.gif');
}

function setup() {
  new Canvas(windowWidth, windowHeight);
  
  strawberries = new Group();
  poisons = new Group();
  
  player = new Sprite(200, 200, 40, 40);
  player.color = 'white';
  player.textColor = 'blue';
  player.text = 'player';
  
}

function draw() {
  clear();
  background(209, 240, 255);
  
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
    textSize(20);
    text("Collect strawberries and flour to make a yummy cake! Avoid the poison X.X", windowWidth/2 - 350, windowHeight/2 - 80);
    text("Click to start game", windowWidth/2 - 80, windowHeight/2);
}

// start game upon click
function playGame() {
  
  if (frameCount % 30 == 0) {
    createStrawberry();
  }
  
  if (frameCount % 80 == 0) {
    createPoison();
  }
  
  player.overlaps(strawberries, collect);

   if (player.overlaps(poisons)) {
    themeSound.stop();
    overSound.play();
    screen = 2;
    strawberries.removeAll();
    poisons.removeAll();
    //image(cakeVid, 0, 0);
  }
  // player.overlap(strawberries, collect);
  
  player.moveTowards(mouse, 1);
}

// game over screen + click to restart
function gameOver() {
  animation(cakeVid, windowWidth/2 + 100, windowHeight/2 + 80);
  cakeVid.play();
  textSize(50);
  text("GAME OVER", windowWidth/2 - 50, windowHeight/2 - 100);
  textSize(20);
  text("nice cake ;) click to restart", windowWidth/2, windowHeight/2 + 260);
}

function createStrawberry() {
  strawberries = new Group();
  let strawberry = new Sprite(random(width), random(height));
  strawberry.d = 10;
  strawberry.velocity.x = -3;
  strawberry.color = 'red';
  strawberries.add(strawberry);
}

function createPoison() {
  poisons = new Group();
  let poison = new Sprite(random(width), random(height), 20, 20);
  poison.velocity.x = -3;
  poison.color = 'green';
  poisons.add(poison);
}

function collect(player, strawberry) {
  collectSound.play();
  strawberry.remove();
}

// changes screen based on mouse click
function mousePressed(){
	if(screen==0){
  	screen=1
    themeSound.play();
  }else if(screen==2){
  	screen=0
  }
}
