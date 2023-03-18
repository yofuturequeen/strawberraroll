
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

/*
async function sendScore(username) {
    // console.log("in send score")
    // let username = id('UserName').value;
    // console.log(username)
    try {
        const docRef = await addDoc(collection(db, "players"), {
          name: name,
          score: score,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
*/
/*
async function sendScore() {
    // console.log("in send score")
    // let username = id('UserName').value;
    // console.log(username)
    const name = document.getElementById("name").value;
        firebase.firestore().collection("leaderboard").add({
            name: name,
            score: score,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log("score added to leadeboard");
        })
       .catch ((e) => {
        console.error("Error adding document: ", e);
      });
}
function showLeaderboard() {
    // Query the leaderboard collection and order by score (descending) and timestamp (ascending)
    firebase.firestore().collection("leaderboard")
      .orderBy("score", "desc")
      .orderBy("timestamp", "asc")
      .get()
      .then((querySnapshot) => {
        // Loop through the query snapshot and create a table row for each score
        const tableBody = document.getElementById("leaderboard");
        tableBody.innerHTML = "";
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const row = document.createElement("tr");
          row.innerHTML = `<td>${data.name}</td><td>${data.score}</td>`;
          tableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error getting leaderboard: ", error);
      });
  }
*/
/*
function createLi(name, score){
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
    if (screen == 2) {
        id("submit").addEventListener('submit', (e) => {
            e.preventDefault()
            
            let username = id('user-name').value;
            // console.log(username);
            sendScore(username)
        })
    }
})
*/
// Get a reference to the "scores" collection
const scoresCollection = firebase.firestore().collection('scores');

// Get references to DOM elements
const leaderboardList = document.querySelector('#leaderboard-list');
const nameInput = document.querySelector('#name-input');
const submitButton = document.querySelector('#submit-button');

const leaderboardDiv = document.getElementById('leaderboard');

// Add event listener to the submit button
submitButton.addEventListener('click', () => {

  // Add the user's score to the "scores" collection
  if (screen == 2) {
    const name = nameInput.value;
    scoresCollection.add({
        name: name,
        score: score,
      })
      .then(() => {
        console.log('Score added successfully!');
      })
      .catch(error => {
        console.error('Error adding score:', error);
      });
  }
});

// Get the top 10 scores from the "scores" collection
scoresCollection.orderBy('score', 'desc').limit(10).onSnapshot(snapshot => {
  leaderboardList.innerHTML = ''; // clear the leaderboard list

  snapshot.forEach(doc => {
    const scoreData = doc.data();
    const listItem = document.createElement('li');
    listItem.textContent = `${scoreData.name}: ${scoreData.score}`;
    leaderboardList.appendChild(listItem);
  });
});
