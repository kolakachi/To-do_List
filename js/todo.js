/*
 * simple todo list application written in pure Javascript.

*/

var ListItems = [];// variable to hold list items.



if( JSON.parse( localStorage.getItem( 'ListItems' ))){
	//set listItems to Items in local storage
	ListItems = JSON.parse( localStorage.getItem( 'ListItems' ));
}
else{
	//if temporary storage to hold listItems is not set
	localStorage.setItem("ListItems", JSON.stringify( ListItems ));
}

updateList();//update todo list

//add new item to the todo list
function addItem(){
    
    var value = document.getElementById('newItem').value; //get the added item
    
    if(value.length>0 && !checkForDuplicates( value )){//if the length is greater than 0 and item doesnt exist on the list

	    ListItems.push({
		name: value,

	    });

	    updateList();//refresh the list
     
	    localStorage.setItem('ListItems', JSON.stringify( ListItems ));//update storage
	    document.querySelector('#newItem').value = '';//set the input value to empty string
       
    }else{
            document.querySelector('#newItem').value = '';//set the input value to empty string
	}
	
}

//function to update todo list
function updateList() {
	
    var ul = document.getElementById('lst');//get the unordered list
	ul.innerHTML = '';// clear current unordered list

    ListItems.forEach(function( value ) {//for each item add the item to the list
	var li = document.createElement('li'),//create an li, span and br tag.
	    span = document.createElement('span'),
	    br = document.createElement('br');
        
	span.appendChild(document.createTextNode(value.name));//set span text to current item
        li.appendChild(span);//set span to li child
        li.appendChild(br);//set span to li child 
        li.appendChild(document.createTextNode('click to delete'));//set li text to instruction
        li.id = ListItems.indexOf( value ); //set li #id to current item index 
        li.onclick = deleteThisItem; //set onclick event to fire the function deleteThisItem            
        ul.appendChild(li);//add li to the unordered list

    });
}

//check for duplicates
function checkForDuplicates( listitem ) {
    
    var match = false;//variabl to hold boolean value of dupicate result
    ListItems.forEach(function( item ) {
        if( item.name === listitem )//if item exist set match to true
		match = true;
	});

    return match;
}

//delete item from todo list
function deleteThisItem(event) {
    
    ListItems.splice( event.target.id, 1 );//get the listitem that was clicked
    localStorage.setItem("ListItems", JSON.stringify( ListItems ));//update the listItems in local storage.
    updateList();
}

//delete  all items from todo list
function deleteAll() {
    if(( ListItems.length > 0 )) {
        var ul = document.getElementById('lst');
	ul.innerHTML = '';//clear listitems in unordered list
	ListItems = [];// clear listItem variable
	localStorage.setItem("ListItems", JSON.stringify( ListItems ));//save new listitems
        updateList();
    }
}

