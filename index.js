/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, collection, addDoc, getDocs, query, where, orderBy, getDocFromCache, limit} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOPtIOhbV79fG5x24u8V1HuQSVpc212AM",
  authDomain: "strawberraroll.firebaseapp.com",
  projectId: "strawberraroll",
  storageBucket: "strawberraroll.appspot.com",
  messagingSenderId: "754781073444",
  appId: "1:754781073444:web:e59f0b805a70fdc256e8b1",
  measurementId: "G-TR9GSJC5F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendScore(username) {
    // console.log("in send score")
    // let username = id('UserName').value;
    // console.log(username)
    try {
        const docRef = await addDoc(collection(db, "players"), {
          username: username,
          score: score,
        });
        console.log("Document written with ID: ", docRef.id);
        let btn = id("submit-button");
        btn.disabled=true;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
*/
let roll, clouds, strawberry, poison, flour, cake;
let rollImg, cloudsImg, strawberryImg, poisonImg, flourImg, cakeImg;
let gameFont, regFont;
let strawberries, flours, poisons;
let cakeVid;
let collectSound, overSound, themeSound;
let x1 = 0;
let x2;
let scrollSpeed = 20;
let score = 0;
let screen = 0;
let velocity = -10;

/*function createLi(name, score){
    let li = document.createElement("li");
    // creates HTML ordered list for leaderboard
    // TODO: STYLE
    li.innerHTML = name + " : " + score;
    return li;
}

const id = (name) => {
    return document.getElementById(name);
}

window.addEventListener('load',() => {
    screen == 2;
    id("submit").addEventListener('submit', (e) => {
        e.preventDefault()
        
        let username = id('user-name').value;
        // console.log(username);
        sendScore(username)

    })
})
*/
function preload() {
    rollImg = loadImage("images/roll.png");
    cloudsImg = loadImage("images/clouds.png");
    strawberryImg = loadImage("images/strawberry.png");
    poisonImg = loadImage("images/poison.png");
    flourImg = loadImage("images/flour.png");
    cakeImg = loadImage("images/cake.png");
    cakeVid = loadAni('images/cake_making.gif');
    collectSound = loadSound('assets/collect.wav');
    overSound = loadSound('assets/over.mp3');
    themeSound = loadSound('assets/theme.mp3');
    gameFont = loadFont('assets/RubikIso.ttf');
    regFont = loadFont('assets/FredokaOne.ttf');
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
    textFont(regFont);
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

  if (frameCount % 20 == 0) {
    createStrawberry();
  }
  
  if (frameCount % 50 == 0) {
    createPoison();
  }
  
  if (frameCount % 40 == 0) {
    createFlour();
  }

  roll.overlaps(strawberries, collect);
  roll.overlaps(flours, collect);
  roll.overlaps(poisons, endGame);

  
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
  textFont(gameFont);
  text("GAME OVER", windowWidth/2 - 50, windowHeight/2 - 160);  
  textFont(regFont);
  textSize(30);
  text("FINAL SCORE: " + score, windowWidth/2 - 20, windowHeight/2 - 110);
  textSize(20);
  text("nice cake ;) click to restart", windowWidth/2, windowHeight/2 + 200);
  //getScore();
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
  let poison = new Sprite(random(width/3, width), random(height), 20, 20);
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

function endGame(roll, poison) {
    strawberries.removeAll();
    flours.removeAll();
    poisons.removeAll();
    themeSound.stop();
    overSound.play();
    screen=2;
}

// changes screen based on mouse click
function mousePressed(){
    if (screen==0) {
  	screen=1;
    themeSound.loop();
  } else if(screen==2) {
  	screen=0;
  }
}
/*
async function getScore() {
    const q = query(collection(db, "players"), orderBy("score", "desc"), limit(8));
    const querySnapshot = await getDocs(q);
    const data = {allScores: []};

    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        data.allScores.push(doc.data());
        // console.log(doc.data());
    });
    // console.log(data);
    // return data;
    let leaderboard = id("LB-list");
    data.allScores.forEach(({username, score}) => {
        let li = createLi(username, score);
        leaderboard.appendChild(li);
    });
}
*/