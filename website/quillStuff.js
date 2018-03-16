
/*Quill stuff */
var toolbarOptions = 
['bold', 'italic', 'underline', 'strike', { "header": '2' }, { 'color': [] }, { 'background': [] }];
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
  console.log(delta)
  // set the stage to show the quill editor content on every text change
  var poemBodySelector = $("#stage");
  poemBodySelector.empty();

  let poem = quill.root.innerHTML;
  poemBodySelector.append(poem);



});