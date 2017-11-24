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


/* components */
// define
var MyComponent = Vue.extend({
  props: ["poems"],
  template: '<div>A custom component! {{poem.title}} <button class = "show" @click="showPoem(poem)">Show</button> <button class = "delete" @click="removePoem(poem)">Delete</button></div>'

})
// register
Vue.component('my-component', MyComponent)
var app = new Vue({
  el: "#app",

  data() {
    // let delta = quill.getText(),
    return {
      seen: false,
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
        let poemKey = poem['.key']

        $('#add').hide()
        $('#titleInput').hide()

        //select class poemTitle and delete that element
        $('.poemTitle').remove()



        let = poemTitle = $('<div class = "poemTitle">' + poem.title + '</div>')

        let editorSelector = $('#writerComponent')
        editorSelector.prepend(poemTitle)
     
      showPoem(poem)
      reviseWords(poemKey)
      quill.setText(poem.text+ '\n')
      quill.formatText("false")

      function resetEditor (){

          $('#add').show()
        $('#titleInput').show()

        //revise button dissapears
        //title element dissapears
        //quill editor is reset to blank
        // add poem reappears
      }


      function reviseWords(whichPoem){

        console.log(whichPoem)

             let buttonMaker = $('<button id = "revisionMaker">Revise</button>')
                 let revisionSelector = $('#revisions')
                 revisionSelector.empty()
       revisionSelector.append(buttonMaker)
       $(buttonMaker).click(function(thing){

        console.log(whichPoem)
      // //update the entry of the button that `show` was pressed on
      // console.log(poem)
      // console.log(this)
        let newStanzas = quill.root.innerHTML;
      let newText = quill.getContents().ops[0].insert
      let dataSelector = app.poems
            databaseUrl.child(poem['.key']).child('text').set(newText);
      databaseUrl.child(poem['.key']).child('stanzas').set(newStanzas);




   
         })

      }


  
      // console.log(databaseUrl.child(poem['.key']).child('text'))
      // console.log(poem)



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
      console.log("poem")
      // //update the entry of the button that `show` was pressed on
      // console.log(poem)
      // console.log(this)
        let newStanzas = quill.root.innerHTML;
      let newText = quill.getContents().ops[0].insert
      // databaseUrl.child(poem['.key']).child('text').set(newText);
      // databaseUrl.child(poem['.key']).child('stanzas').set(newStanzas);
      // 
      // 
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
