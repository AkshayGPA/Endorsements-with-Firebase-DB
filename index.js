
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

// let endorsementArr = [];

publishBtnEl.addEventListener("click", function() {

  // if()

  // let inputText = inputTextEl.value;
  // let toTextEl = toTextEl.value;
  // let fromTextEl = fromTextEl.value;

  let endorsementObj = {
    "to": toTextEl.value,
    "text": inputTextEl.value,
    "from": fromTextEl.value
  }
  // endorsementArr.push(endorsementObj);
  push(endorsement, endorsementObj);
  
  let endorsementListEl = document.getElementById("endorsement-list");

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
})