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
      everythingSelector.empty()
      // Clear any previous save revisions button
      let revisionSelector = $('#revisions')
      revisionSelector.empty()

      //remove the old blank page button--so maybe this should be a hide/show situation instead of remove and create?
      // $('#reset').remove()
      
      // Hide the add poem button and title input
      $('#add').hide()
      $('#titleInput').hide()

      /* Exercise */

      // 1) Set Stage: Create title and body for selected poem

      let = poemTitle = $('<div id ="poemTitle"></div>')
      poemTitle.append(poem.title)

      let poemBody = $('<div id = "poemBody"></div>')
      poemBody.append(poem.text)

      // Append title and body to stage

      everythingSelector.append(poemTitle);
      everythingSelector.append(poemBody);

    

      // 2) Set the text of the quill editor to be the text of selected poem
  
      quill.setText(poem.text+ '\n')
      quill.formatText("false")

      
      // 3) Create the blank page button 



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

        alert('Poem Updated')

      
      })

    },

    blankPage: function (){
        
        $('#add').show()

      
        // could replace with native vue app.title = ''
        $('#titleInput').val('')
        $('#titleInput').show()
        
        //revise button dissapears
        $('#revisionMaker').hide()
        everythingSelector.empty()
        // set quill editor contents to be just an empty line
        quill.setText('\n')

        //is this still neccessary?
        quill.formatText("false")
        
      // })

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
     
      // console.log(quill.getContents().ops[0].insert)
      
      databaseUrl.push(newThing);
      
      app.title = ''

       everythingSelector.empty()
        // set quill editor contents to be just an empty line
        quill.setText('\n')

        //is this still neccessary?
        quill.formatText("false")
      // this.blankPage()
    },

    removePoem: function(poem) {
      databaseUrl.child(poem[".key"]).remove();
    },

    showButtons: function(event){
      //how to make it so that only the button that was pressed's element shows the buttons
      let buttonGrabber = $(event.srcElement).siblings().filter('button')
      let elemParent = $(event.srcElement).parent()
        // console.log($(this))
        // console.log($(this))

      if (flag){
        //velocity to animate show and marginBottom and height grow to encompass elements
        //grab parent elemnt and increase it's margin-bottom and height
        elemParent.velocity({
          p:{height: '+=1.8em', marginBottom: '+=1.8em', boxShadowX: '+=1em',boxShadowBlur: '+=1em'}
        })
        buttonGrabber.velocity({
          p: 'transition.slideRightIn'
        })
        // buttonGrabber.show()
        flag = !flag
      }
      else {


        elemParent.velocity('reverse')
        buttonGrabber.velocity('reverse')
        flag = !flag
        // console.log('not flag')
      }
    },

    mouseEnter: function(){
      let thing = $(event.srcElement)
      console.log(thing)

      
      console.log('in')
    },

    mouseLeave: function(){
      console.log('out')
    }

  }, // End methods

  created: function() {
    console.log(this._data)
    // console.log($('.archiveTitle').toArray())

          $('.show').hide()
      $('.delete').hide()






  }

}) // end app



/*Quill stuff */
// var toolbarOptions = [{ 'header': '3' }];
var toolbarOptions = ['bold', 'italic', 'underline', 'strike', 'h1'];
// does this need to be in the vue app?
var quill = new Quill('#editor', {
theme: 'bubble',
placeholder: 'poem...',
modules:{
  toolbar: toolbarOptions
}
// debug: 'info'
});


quill.on("text-change", function(delta, oldDelta, source) {
  let deltaHolder = delta.ops[1]
  // console.log(deltaHolder.insert)
  // console.log(delta)
  // console.log(source)
  // console.log(oldDelta)
  // let text = quill.getText(0, 10);
  // console.log(text)
  var poemBodySelector = $("#stage");

  poemBodySelector.empty();

// let message = quill.getContents();
  let titleSelector = $('#poemTitle') 
  let poem = quill.root.innerHTML;
  // console.log(poem)

  // let poemHolder = $('<div class ="invisible"></div>')
  // poemHolder.append(poem)
  // poemHolder.html(poem)
  // poemHolder.append(deltaHolder.insert)
  poemBodySelector.append(poem);

  // $('p').velocity({
  //   p: {opacity: 1},
  //   o: {duration:1000}
  // })
  // console.log(poem)
  //set class to something with opacity 0
  // then animate opacity and like height
  //if that works then try other animate to stage
  // maybe like transformZ either/noth direction?


});



// $(document).ready(function() {

// });
// hide show and delete and show on title press--then add velocity animations


// 
// $( document ).ready(function() {

// })


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
