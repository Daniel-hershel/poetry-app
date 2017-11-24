function creator(poem) {
  var everythingSelector = $("#stage");
  everythingSelector.append(poem.stanzas);
}



function editorCreator(poem) {
  // console.log(quill.root.innerHTML)
  // let toDom = quill.root.innerHTML;
  let toDom = poem;
	// console.log(poem)

  // console.log(toDom)
  // console.log(poem)
  // live view of what's being typed in editor
  var everythingSelector = $("#stage");
  everythingSelector.empty();
  everythingSelector.append(toDom);
}



function showThePoem(poem) {

	// console.log(poem.title)

	// create an h1 element for the title
	// append stanzas to the stage
	 var everythingSelector = $("#stage");
	 everythingSelector.empty()
  let theTitle =$('<h1>' + poem.title+ '</h1>' );
   
  everythingSelector.append(theTitle);
  everythingSelector.append(poem.stanzas);

}