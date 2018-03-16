

let db;
function setup(){
/* Firebase Configuration*/
var config = {
apiKey: "AIzaSyDl-vzXnvQg3ntJWJhVXQlwOGt3RdMEbOs",
authDomain: "poetry-environment.firebaseapp.com",
databaseURL: "https://poetry-environment.firebaseio.com",
projectId: "poetry-environment",
storageBucket: "",
messagingSenderId: "1085587884408"
};

/* Initialize firebase app */

let firebaseApp = firebase.initializeApp(config);

 db = firebaseApp.database();

// let databaseUrl = db.ref("poems");
 loadFirebase();
}
 function loadFirebase() {
  const ref = db.ref("poems");
  ref.on("value", gotData, errData);
}
function errData(error) {
  console.log("Something went wrong.");
  console.log(error);
}

// The data comes back as an object
function gotData(data) {
console.log(data)
  var poems = data.val();
  // Grab all the keys to iterate over the object
  var keys = Object.keys(poems);

let stage = $('#holdEverything')
let holder = $('<div id = "holder"></div>')
stage.append(holder)

  var key = keys[keys.length-1];
    var poem = poems[key];
    // console.log(poem.text.length)
    // let newPoem = createElement('div', poem.stanzas)

    let pPoem = $('<div class = "poemHolder">'+ poem.stanzas + '</div>')
    holder.append(pPoem)
    // holder.html(newPoem)
  // Loop through array
//   for (var i = 0; i < keys.length; i++) {
//     var key = keys[i];
//     var poem = poems[key];
//     console.log(poem.text)

//     // let newPoem = $(poem.text)
//     // let newPoem = $('<p>treaty</p>')
// // newPoem.addClass('thing')
// // stage.append(newPoem)
    $poem = $("p")
console.log($poem)
var durTime = 3200;
var setUpTime = 50;
var sequence = [

{ e: $poem, p:'fertilizer', o: { duration: 3000, delay: 250, stagger: 2500, complete: function(){
	console.log('animation ended')
}}},
// { e: $poem, p:'entrancePoster', o: { duration: 1000, delay: 250, stagger: 1500}},
// { e: $poem, p:'out', o: { duration: 1000, delay: 250, stagger: 1500}},

]

$.Velocity.RunSequence(sequence);
//   }
}

// Clear everything
// function clearList() {
//   for (var i = 0; i < listItems.length; i++) {
//     listItems[i].remove();
//   }
// }

// make a div "retreat"

// $poem = $('.poemHolder')


//link to poem database code here
