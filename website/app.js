  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDl-vzXnvQg3ntJWJhVXQlwOGt3RdMEbOs",
    authDomain: "poetry-environment.firebaseapp.com",
    databaseURL: "https://poetry-environment.firebaseio.com",
    projectId: "poetry-environment",
    storageBucket: "",
    messagingSenderId: "1085587884408"
  };



  /*  initialize firebase app */

let firebaseApp = firebase.initializeApp(config);

let db = firebaseApp.database();

let databaseUrl = db.ref("poems");

var app = new Vue({
  el: "#app",

  data() {
    // let delta = quill.getText(),
    return {
      title: "",
      // message: delta,
      newPoem: {
        title: "",
        stanza: ""
      }
    };
  },
  firebase: {
    poems: databaseUrl
  },
  methods: {

     showPoem: function(poem){
      var everythingSelector = $("#stage");
      // reset the stage
      // everythingSelector.empty();
      //set the editor contents to be the text of the current poem
        // how to get the contents of the current poem
        console.log(poem)
        // how to set the contents of quill editor
          //I might want to create another entry in each for database with just the plain text from the quill editor? Rather then strip the html
  

      showPoem(poem)
      quill.setText(poem.text+ '\n')
      quill.formatText("false")
//and then create a div that holds the revise button and it clears thatDiv.empty() & create this button for the poem shown 
//so instead for poems in poem -- how with vue do i just access the current poem
 // <button @click="revisePoem(poem)" id = "revise" type="submit" class="btn"> Revise Poem </button>


//       quill.setContents([
//   { insert: poem.stanzas },
//   { insert: 'World!', attributes: { bold: true } },
//   { insert: '\n' }
// ]);


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

  // let message = quill.getContents();


      // console.log(newThing)
      console.log(quill.getContents().ops[0].insert)




      databaseUrl.push(newThing);
    },
     removePoem: function(poem) {
      databaseUrl.child(poem[".key"]).remove();
    },

    revisePoem:function(poem){
      //if 
      // console.log(poem)
      // //update the entry of the button that `show` was pressed on
      // console.log(poem)
      // console.log(this)
        let newStanzas = quill.root.innerHTML;
      let newText = quill.getContents().ops[0].insert
      databaseUrl.child(poem['.key']).child('text').set(newText);
      databaseUrl.child(poem['.key']).child('stanzas').set(newStanzas);
      //set poem.stanzas to quill.html
      // how to overwrite the contents of a db entry with vuefire
      //set poem.text to quill.text


    }
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


quill.on("text-change", function(delta, oldDelta, source) {
  // let message = quill.getContents();
      let message = quill.root.innerHTML;

  // console.log(message)
  // let poem = message.ops[0].insert;

  editorCreator(message);
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
