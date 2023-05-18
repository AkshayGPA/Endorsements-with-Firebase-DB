
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = 
{
  databaseURL: "https://championsendorsements-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
// console.log(app);

const database = getDatabase(app);
const endorsement = ref (database, "endorsements");

const inputTextEl = document.getElementById("textbox");
const fromTextEl = document.getElementById("from-text");
const toTextEl = document.getElementById("to-text");
const publishBtnEl = document.getElementById("publish-btn");

let endorsementListEl = document.getElementById("endorsement-list");

publishBtnEl.addEventListener("click", function() {

  // if()

  let endorsementObj = {
    "to": toTextEl.value,
    "text": inputTextEl.value,
    "from": fromTextEl.value
  }

  push(endorsement, endorsementObj);

  appendEndorsementsToEndorsementListEl(endorsementObj);
})

onValue(endorsement, function(snapshot) {
  let endorsementArr = Object.entries(snapshot.val());
  // console.log(endorsementArr);

  for (let i=0 ; i<endorsementArr.length ; i++) {
    console.log(endorsementArr[i]);
  }
})  

function appendEndorsementsToEndorsementListEl(endorsementObj) {
  endorsementListEl.innerHTML += 
  `
    <li class="endorsement-list-item">
      <div class="endorsement-flex">
        <p id="disp-to">${endorsementObj.to}</p>
        <p id="disp-text">${endorsementObj.text}</p>
        <p id="disp-from">${endorsementObj.from}</p>
      </div>
    </li>
  `
}