
/*function to create text elements and any class*/
function createWords (thing, thingClass, holder) {
// create a new element
var newDiv = document.createElement("div");
//create a text node from the parameter passed to the function
// var newContent = document.createTextNode(thing);
// //add the text node to the newly created  element
// newDiv.appendChild(newContent);
$(newDiv).html(thing)
//add class passed to function 
newDiv.className += thingClass;
//add an id
newDiv.id += thing;
//select the holder created for the element passed as an argument
$holder = $(holder);
//append the newly created div to its holder
$holder.append(newDiv);
};

function createMedia (thing, thingClass, holder){

var newDiv = document.createElement("div");
newDiv.className += thingClass

var content = $(thing).appendTo(newDiv)
$holder.append(newDiv);

}


function setStage(index){
console.log(json.projects[0]);
  json.projects.forEach(function(element, index){
      // console.log(element)

    })
}