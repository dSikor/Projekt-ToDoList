var $taskList;
var $newTask;
var $confirmButton;

var $input_edit_in_List;
var $button_edit_task;
var $button_complete;

function main(){
    // debugger;
	$taskList = document.getElementById("task_list");	
	$newTask = document.getElementById("edit_task");
	$confirmButton = document.getElementById("confirm_button");
	
	$taskList.addEventListener('click', listClickManager);
	$confirmButton.addEventListener('click',addTaskButtonClickHandler);
    
    // getTodos();
}

function getTodos(){
    axios('http://195.181.210.249:3000/todo/')
    .then(response =>response.data)
    .then(data=>{
        data.forEach(element => {
            addUpdateListTask($taskList, element.title, element.id)
        // data.addUpdateListTask($taskList, element.title);


        
        });
    })
}


function addTaskButtonClickHandler(){

	var newTask=$newTask.value;

	if(newTask) {
        // addUpdateListTask($taskList,newTask)
        axios.post('http://195.181.210.249:3000/todo/', {
            title: newTask,
            author: 'Damian-Mechanik'
          })
          .then(function () {
            $taskList.innerHTML = '';
            // console.log(response);
            getTodos();
          });
		newTask="";		
	}
}

function addUpdateListTask(list,task_tekst,id){

    var $newItemsList= document.createElement('li');
    $newItemsList.dataset.id=id;

    var checkbox_element = document.createElement('INPUT');
    checkbox_element.setAttribute("type", "checkbox");


	var textElement = document.createElement('span');

	 textElement.textContent = task_tekst;

	var editButton = document.createElement('button');

	editButton.textContent = 'Edycja';
    editButton.classList.add('button_to_edit_element_list');

    var cancelElement = document.createElement('button');
    cancelElement.textContent = 'Usuń';
    cancelElement.classList.add('cancel');


    var acceptButton = document.createElement('button');

    acceptButton.textContent = 'Zatwierdz';
    acceptButton.classList.add('accept');
	acceptButton.style.display = 'none';

	var changeInput = document.createElement('input');
    changeInput.style.display = 'none';

    $newItemsList.appendChild(checkbox_element);
    $newItemsList.appendChild(textElement);
    $newItemsList.appendChild(changeInput);

    $newItemsList.appendChild(acceptButton);
    $newItemsList.appendChild(editButton);
    $newItemsList.appendChild(cancelElement);

	debugger;
	list.appendChild($newItemsList);
 }

function editClickHandler(event) {
    debugger;
    var $textElement = event.target.parentElement.getElementsByTagName('span')[0];
    var $changeInput = event.target.parentElement.getElementsByTagName('input')[1];
    var $acceptButton = event.target.parentElement.getElementsByClassName('accept')[0];
    var oldName = $textElement.textContent;
    $textElement.style.display = 'none';
    event.target.style.display = 'none';
    $changeInput.value = oldName;
    $changeInput.style.display = 'inline-block';
    $acceptButton.style.display = 'inline-block';


}

function acceptChangeHandler(event) {
    var $changeInput = event.target.parentElement.getElementsByTagName('input')[1];
    var $acceptButton = event.target.parentElement.getElementsByClassName('accept')[0];
    $changeInput.style.display = 'none';
    $acceptButton.style.display = 'none';

    var $textElement = event.target.parentElement.getElementsByTagName('span')[0];
    var $editButton = event.target.parentElement.getElementsByClassName('button_to_edit_element_list')[0];
    $textElement.textContent = $changeInput.value;
    $textElement.style.display = '';
    $editButton.style.display = 'inline-block';
}

function canelTaskHandler(event) {

	var elementLI=event.target.parentElement;
	elementLI.remove();
    debugger;
    
    // axios.delete('http://195.181.210.249:3000/todo/', {
            // id: elementLI.id,
            // author: 'Damian-Mechanik'
        //   });

        //   elementLI.remove();

         
}

function listClickManager(event) {

	if(event.target.classList.contains('button_to_edit_element_list')) {
        editClickHandler(event);
    } else if(event.target.classList.contains('accept')) {

    	acceptChangeHandler(event);

    } else if(event.target.classList.contains('cancel')){
    
    	canelTaskHandler(event);

    }else{

	    if(event.target.getAttribute('type') === 'checkbox') {
	       debugger;
	     	 event.target.parentElement.classList.toggle('one_list_task_accept');
        }

	}
}


document.addEventListener('DOMContentLoaded', main);



