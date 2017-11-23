function creator(poem) {
  var everythingSelector = $("#stage");
  everythingSelector.append(poem.stanzas);
}



function editorCreator(poem) {
  // console.log(quill.root.innerHTML)
  let toDom = quill.root.innerHTML;
  // console.log(toDom)
  // console.log(poem)
  // live view of what's being typed in editor
  var everythingSelector = $("#stage");
  everythingSelector.empty();
  everythingSelector.append(toDom);
}



function showPoem(poem) {

	console.log(poem.title)

	// create an h1 element for the title
	let theTitle =$('<h1>' + poem.title+ '</h1>' );
	// append stanzas to the stage
	 var everythingSelector = $("#stage");
	 everythingSelector.empty()
  everythingSelector.append(theTitle);
  everythingSelector.append(poem.stanzas);

}