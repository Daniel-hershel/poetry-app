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

let db = firebaseApp.database();

let databaseUrl = db.ref("poems");

/* Initialize Vue app */

var app = new Vue({
  el: "#app",
  data() {
    return {
      title: "",
      newPoem: {
        title: "",
        stanza: "",
        text: ""
      }
    };
  },

  firebase: {
    poems: databaseUrl
  },

  methods: {

    showPoem: function(poem){

      /* Setup */

      // this.key -- connects scope to paricular instance in db
      let poemKey = poem['.key']

      /* Set View */

      // Clear the stage 
      let everythingSelector = $("#stage");
      everythingSelector.empty()
      // Clear any previous save revisions button
      let revisionSelector = $('#revisions')
      revisionSelector.empty()

      //remove the old blank page button--so maybe this should be a hide/show situation instead of remove and create?
      $('#reset').remove()
      

      // $('.poemTitle').remove()

      // Hide the add poem button and title input
      $('#add').hide()
      $('#titleInput').hide()

      /* Exercise */

      // 1) Set Stage: Create title and body for selected poem

      let = poemTitle = $('<div id ="poemTitle"></div>')
      poemTitle.append(poem.title)

      let poemBody = $('<div id = "poemBody"></div>')
      poemBody.append(poem.stanzas)

      // Append title and body to stage

      everythingSelector.append(poemTitle);
      everythingSelector.append(poemBody);

    

      // 2) Set the text of the quill editor to be the text of selected poem
  
      quill.setText(poem.text+ '\n')
      quill.formatText("false")

      
      // 3) Create the blank page button 
      let resetButtonMaker = $('<button class = "option" id = "reset">Blank Page</button>')
      let writerComponentSelector = $('#writerComponent')
      // writerComponentSelector.append(resetButtonMaker)
      $('#titleHolder').append(resetButtonMaker)
      
      $(resetButtonMaker).click(function(thing){
        // 
        
        $('#add').show()
        $('#titleInput').val('')
        $('#titleInput').show()
        
        //revise button dissapears
        
        $('#revisionMaker').hide()
        everythingSelector.empty()
        //title element dissapears
        // $('#poemTitle').hide()
        //quill editor is reset to blank
        quill.setText('\n')
        quill.formatText("false")
        $('#reset').remove()
        
      })


      // 4) Create the save revisions button
      let buttonMaker = $('<button class = "option" id = "revisionMaker">Save Revisions</button>')
      // Add button to the revisions element at the bottom of the writing component 
      revisionSelector.append(buttonMaker)

      $(buttonMaker).click(function(thing){
        // Setup
        let newStanzas = quill.root.innerHTML;
        let newText = quill.getContents().ops[0].insert

        // Exercise - overwrite the db entry for this.stanzas and this.text
        databaseUrl.child(poem['.key']).child('text').set(newText);
        databaseUrl.child(poem['.key']).child('stanzas').set(newStanzas);
      
      })

    },

    addPoem: function(title) {
      // consol.log()
      let delta = quill.root.innerHTML;
      let plainText = quill.getContents().ops[0].insert
      // console.log(delta);
      // console.log(quill.root.innerHTML)
      let newThing = {
      title: title,
      stanzas: delta,
      text: plainText
      };
     
      console.log(quill.getContents().ops[0].insert)
      
      databaseUrl.push(newThing);
    },

    removePoem: function(poem) {
      databaseUrl.child(poem[".key"]).remove();
    },

  },

  created: function() {
    console.log(this.poems)

  }

}) // end app



/*Quill stuff */

// does this need to be in the vue app?
var quill = new Quill('#editor', {
theme: 'bubble',
placeholder: 'go...',
// debug: 'info'
});


quill.on("editor-change", function(delta, oldDelta, source) {
// let message = quill.getContents();
  let titleSelector = $('#poemTitle') 
  let poem = quill.root.innerHTML;
  var poemBodySelector = $("#poemBody");
  // 
  poemBodySelector.empty();
  // titleSelector.empty();

  poemBodySelector.append(poem);
  // titleSelector.append(poem);
// editorCreator(message);
});



/* quill function to get selected/highlighted text */

// quill.on("editor-change", function(delta, oldDelta, source) {

//   var range = quill.getSelection();
//   if (range) {
//     if (range.length == 0) {
//       console.log("User cursor is at index", range.index);
//     } else {
//       var text = quill.getText(range.index, range.length);
//       console.log("User has highlighted: ", text);
//     }
//   } else {
//     console.log("User cursor is not in editor");
//   }
// });
