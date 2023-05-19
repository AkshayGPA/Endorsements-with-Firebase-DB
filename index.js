
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

  let toValue = toTextEl.value;
  let fromValue = fromTextEl.value;
  let commentValue = inputTextEl.value;


  let endorsementObj = {
    "to": toValue,
    "text": commentValue,
    "from": fromValue
  }

  // * Added own code to push endorsements to database and display them only when the values are not empty strings or null value.

  if (toValue !== "" || fromValue !== "" || commentValue !== "") {

    if (commentValue.length < 15){
      alert("The endorsement has to be at least 15 characters long");
      return;
    }
    else {
      push(endorsement, endorsementObj);
    
      clearInput();
    }
  }
  else {
    alert("Please write a comment(min 15 characters) and mention the names in the fields 'To' and 'From'");
  }

})

// ***************************************************** //


onValue(endorsement, function(snapshot) {
  if (snapshot.exists()) {

    let endorsementArr = Object.entries(snapshot.val());
  
    clearEndorsements();
  
    for (let i=endorsementArr.length-1 ; i>=0 ; i--) {
      let newEndorsementArr = endorsementArr[i];
      
      let newEndorsementObj = newEndorsementArr[1];

      let newEndorsementObjID = newEndorsementArr[0];
      // console.log(newEndorsementObjID);
      
      appendEndorsementsToEndorsementListEl(newEndorsementObj, newEndorsementObjID);
    }
  }
  else {
    endorsementListEl.innerHTML = "No endorsements here... yet";
  }
})  

function appendEndorsementsToEndorsementListEl(endorsementObj, endorsementObjectID) {

  let newListEl = document.createElement("li");
  newListEl.setAttribute("class", "endorsement-list-item");
  
  newListEl.innerHTML = 
  `
    <div class="endorsement-flex">
      <p id="disp-to">${endorsementObj.to}</p>
      <p id="disp-text">${endorsementObj.text}</p>
      <p id="disp-from">${endorsementObj.from}</p>
    </div>
  ` 

  newListEl.addEventListener("click", function() {
    let endorsementLocationinDB = ref(database, `endorsements/${endorsementObjectID}`);
    // console.log(endorsementLocationinDB);

    remove(endorsementLocationinDB);
  })

  endorsementListEl.append(newListEl);

  /*
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
  */
}

function clearEndorsements() {
  endorsementListEl.innerHTML = "";
}

function clearInput() {
  inputTextEl.value = "";
  fromTextEl.value = "";
  toTextEl.value = "";
}