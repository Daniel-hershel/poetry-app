/* Setup */

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
    

// set boolean for two-way butons
let flag = true;
let everythingSelector = $("#stage");

/* Initialize Vue app */
var app = new Vue({
  el: "#app",
  data() {
    return {
      title: "",
      addPoemSeen: true,
      titleSeen: true,
      revisionSeen: true,
      showOptionButtons:false,
      newPoem: {
        title: "",
        stanza: "",
        richText: "",
        text: ""
      }
    };
  },

  firebase: function () {

    return {
    poems: databaseUrl

  }
  },

  methods: {
      showButtons: function(event){

      // let buttonGrabber = $(event.srcElement).siblings().filter('button')
      let elemParent = $(event.srcElement).parents('.poemHolder')

        let buttonGrabber = $(event.srcElement).parents('.poemHolder').find('button')

        console.log(buttonGrabber)

        let flagGrabber = $(event.srcElement).parents('.poemHolder').find('.flag')
        // let flagGrabber = $(event.srcElement).parents('.poemHolder').find('.iconFlag')

        console.log(flagGrabber)
      let elem = $(this)
        // console.log($(this))
      if (flag){
        elemParent.velocity({
          p:{height: '+=1.8em', marginBottom: '+=1.8em', boxShadowX: '+=1em',boxShadowBlur: '+=1em', backgroundColor:'rgba(0, 0, 0, 0.7)', opacity: .7 }
        })

         // app.showOptionButtons = true;
        buttonGrabber.velocity({
          p: 'transition.slideRightIn'
        })

        flagGrabber.velocity({
          p: {rotateX: 180, rotateY: 45},
          o: {}
        })
        flag = !flag
      }
      else {

        elemParent.velocity('reverse')
           // app.showOptionButtons= false;
        // buttonGrabber.velocity('reverse')
          buttonGrabber.velocity({
          p: 'transition.slideRightOut'
        })
        flagGrabber.velocity('reverse')
        flag = !flag
      }
    },

    showPoem: function(poem){
      console.log(poem)
      /* Setup */
      // this.key -- connects scope to paricular instance in db
      let poemKey = poem['.key']
      // Clear the stage 
      everythingSelector.empty()
      // Clear any previous save revisions button
      let revisionSelector = $('#revisions')
      revisionSelector.empty()
      // Hide the add poem button and title input
      app.addPoemSeen = false
      app.titleSeen = false
      /* Exercise */
      // Set contents of quill editor to contents of selected. poem
      if(poem.hasOwnProperty('richText')){
        quill.setContents(poem.richText)
      }

      else {
        // This would strip stanzas of html tags but also lose line breaks
        let strippedPoem = $(poem.stanzas).text()
        quill.setText(poem.text + '\n')
      }

      // Create revision button for poem being staged

      let buttonMaker = $('<button class = "option" id = "revisionMaker">Save Revisions</button>')
      // Append button 
      revisionSelector.append(buttonMaker)
      // Exercise Button
      $(buttonMaker).click(function(thing){
        // Setup
        let newStanzas = quill.root.innerHTML;
        let newText = quill.getContents().ops[0].insert
        let newRichText = quill.getContents()
        // Exercise - overwrite the db entry for this.stanzas and this.text
        databaseUrl.child(poem['.key']).child('text').set(newText);
        databaseUrl.child(poem['.key']).child('stanzas').set(newStanzas);
        databaseUrl.child(poem['.key']).child('richText').set(newRichText);
        //Confirm
        alert('Poem Updated')
      })
    },
    removePoem: function(poem, event) {
      let visibleChecker = $(event.srcElement)
      console.log(visibleChecker)
      console.log('deactivated delete button danger')
      //set an alert to make sure you want to save poem--
      // alert/model with a conditional to delete entry
      if(visibleChecker.is(":hidden")){
        console.log('not visible')
      }
      else {
        console.log('visible')
      }
      databaseUrl.child(poem[".key"]).remove();
    },

    blankPage: function (){
        /* reset editor */
        app.addPoemSeen = true
        // jQuery - ('#titleInput').val('')- could make velocity animation
        app.title = ''
        // jQuery - could make velocity animation - $('#titleInput').show()
        app.titleSeen = true
        //revise button dissapears-native vue not working i think because I creatd dynamically
        // app.revisionSeen = false
        $('#revisionMaker').hide()
        // set quill editor contents to be just an empty line
        quill.setText('\n')

    },
    addPoem: function(title) {

      // Setup
      let delta = quill.root.innerHTML;
      let getRichText = quill.getContents()
      let plainText = quill.getText()
      console.log(getRichText)
      // not working because of style test
      // let plainText = quill.getContents().ops[0].insert
      let newThing = {
      title: title,
      stanzas: delta,
      richText: getRichText,
      text: plainText
      };

      // Exercise
      databaseUrl.push(newThing);

      // Verify
      console.log(newThing)

      // Teardown
      app.title = ''
      // reset quill
      quill.setText('\n')
    },


  createGallery: function(){
  // console.log(this.poems)


    // for (var i=0;i< this.poems.length;i++){
    //   console.log(this.poems.text[i])
    // }
    
}

  }, // End methods

  created: function() {
    // console.log(this._data)
    // could/should I make these native vue seen true/flase
    $('.show').hide()
    $('.delete').hide()
    // this.createGallery()
  console.log(this.firebase)

    // console.log(this.poems)

    // first just create gallery here and then try to refactor out to its own function
  
   
   // console.log(Quill.imports);
  }
}) // end app




var toolbarOptions = 
['bold', 'italic', 'underline', 'strike', { "header": '2' }, { 'color': [] }, { 'background': [] }];
// does this need to be in the vue app?
var quill = new Quill('#editor', {
// theme: 'bubble',
placeholder: 'poem...',
// modules:{
//   toolbar: toolbarOptions
// }
// debug: 'info'
});


quill.on("text-change", function(delta, oldDelta, source) {
  
  let deltaHolder = delta.ops[1]
  console.log(delta)
  // set the stage to show the quill editor content on every text change
  var poemBodySelector = $("#stage");
  poemBodySelector.empty();

  let poem = quill.root.innerHTML;
  poemBodySelector.append(poem);



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
