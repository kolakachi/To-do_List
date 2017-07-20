/*
 * simple todo list application written in pure java script.

*/

var ListItems = [];// variable to hold list items.


//if temporary storage is not set, set it
if( JSON.parse( localStorage.getItem( 'ListItems' ))){
	ListItems = JSON.parse( localStorage.getItem( 'ListItems' ));
}
else{
	localStorage.setItem("ListItems", JSON.stringify( ListItems ));
}

updateList();//update todo list

//add new item to the todo list
function addItem(){
    
    var value = document.getElementById('newItem').value; //get the added item
    
    if(value.length>0 && !checkForDuplicates( value )){

	    ListItems.push({
		name: value,

	    });

	    updateList();
     
	    localStorage.setItem('ListItems', JSON.stringify( ListItems ));
	    document.querySelector('#newItem').value = '';
       
    }else{
            document.querySelector('#newItem').value = '';
	}
	
}

//function to update todo list
function updateList() {
	
    var ul = document.getElementById('lst');
	ul.innerHTML = '';

    ListItems.forEach(function( value ) {
	var li = document.createElement('li'),
	span = document.createElement('span'),
	br = document.createElement('br');
        
	span.appendChild(document.createTextNode(value.name));
        li.appendChild(span);
        li.appendChild(br);
        li.appendChild(document.createTextNode('click to delete'));
        li.id = ListItems.indexOf( value ); 
        li.onclick = deleteThisItem;       
        ul.appendChild(li);

    });
}

//check for duplicates
function checkForDuplicates( listitem ) {
    
    var match = false;
    ListItems.forEach(function( t ) {
        if( t.name === listitem )
		match = true;
	});

    return match;
}

//delete item from todo list
function deleteThisItem(e) {
    
    ListItems.splice( e.target.id, 1 );
    localStorage.setItem("ListItems", JSON.stringify( ListItems ));
    location.reload();
}

//delete  all items from todo list
function deleteAll() {
    if(( ListItems.length > 0 )) {
        var ul = document.getElementById('lst');
	ul.innerHTML = '';
	ListItems = [];
	localStorage.setItem("ListItems", JSON.stringify( ListItems ));
        location.reload();
    }
}

