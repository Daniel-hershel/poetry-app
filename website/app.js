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
      // console.log(poem.stanzas)

      showPoem(poem)

      //call the function to create a dom instance of the selected poem
      // creator(poem);

      //to create poem on dom of most recent input
      // var daPoem = app.poems[app.poems.length - 1];

      // console.log(poem)
    },

    addPoem: function(title) {
      // consol.log()
      let delta = quill.root.innerHTML;
      console.log(delta);
      // console.log(quill.root.innerHTML)
      let newThing = {
        title: title,
        stanzas: delta
      };

      console.log(newThing)



      databaseUrl.push(newThing);

      // databaseUrl.push(this.newPoem);

      // this.newPoem.title = "";
      // this.newPoem.stanza = "";
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


quill.on("text-change", function(delta, oldDelta, source) {
  let message = quill.getContents();
  // console.log(message)
  let poem = message.ops[0].insert;

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
