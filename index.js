//DOM element
const taskForm = document.getElementById("todo-form"); 
const addBtn =document.getElementById('add-task'); 
const input =document.getElementById('input'); 
const  taskContainer = document.getElementById('todolist');
const removeTask =document.getElementById('remove-task');
const editTaskBtn =document.getElementById('edit-task');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const totalTask = document.getElementById('total-task') ; 
const completedTask = document.getElementById('Completed-task') ;
const activeTask = document.getElementById('active-task') ;



let tasks =[]

taskForm.addEventListener('submit' , addTask);
const searchTasks = (searchTask)=>{
  const text = searchTask.toLowerCase().trim();
  console.log(searchTask);
  const filter =tasks.filter((task) =>task.includes(text));
  listTodo(filter)
}
searchInput.addEventListener('keyup' , (event)=>{
  searchTasks(event.target.value)
})
function addTask(event){
  event.preventDefault();
  const detailsTask = input.value;
  const newTask = {
     titleTask :detailsTask,
     completed :false
  }
  tasks.push(newTask)
  console.log(tasks) //test
  taskForm.reset();
  listTodo()
  saveData()
}
const listTodo= () => {
  let doneTask = 0
let unDoneTask = 0
  taskContainer.innerHTML = '' //reset container 
  for ( let index = 0 ; index<tasks.length ; index++) {
    const taskItem = document.createElement("div");
    taskItem.className = 'task bg-light gap-5 '
    const checkBox = document.createElement("input");
    checkBox.type = 'checkbox'
    checkBox.classList = 'checked'
    checkBox.checked = tasks[index].completed
    checkBox.addEventListener('change' , () =>{toggleComplete(index)})
    taskItem.appendChild(checkBox)
    const description = document.createElement('p');
    description.textContent = tasks[index].titleTask;
    description.classList.toggle('done' ,tasks[index].completed );
    taskItem.appendChild(description);
     const div = document.createElement('div')
     div.className = 'icon'
    const edit_btn = document.createElement("button");
    edit_btn.classList ="bg-transparent  "
    edit_btn.innerHTML = `<i class="fa-solid fa-pen fa-lg  "></i>`
    edit_btn.addEventListener('click' , () =>{editTask(index)})
    div.appendChild(edit_btn)
    const del_btn = document.createElement("button");
    del_btn.classList ="bg-transparent"
    del_btn.innerHTML = innerHTML = ` <i class="fa-solid fa-circle-xmark fa-lg  "></i>`;
    del_btn.addEventListener('click' , () =>{deleteTask(index)})
    div.appendChild(del_btn)
    //display date 
    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    const displayDate = document.createElement('p');
    displayDate.className = 'date'
    taskItem.appendChild(displayDate);
    displayDate.textContent =currentDate
    taskItem.appendChild(div)
    taskContainer.appendChild(taskItem);  

   
    if (tasks[index].completed) {
      doneTask++
     // console.log(doneTask)
    }
    else {
      unDoneTask ++
     
    }
  }
  totalTask.textContent = tasks.length ;
  completedTask.textContent = doneTask;
  activeTask.textContent = unDoneTask ;

  const filterTasks = tasks.filter(task => task.completed  ==  unDoneTask.value )
  const p = document.createElement('p')
  p.textContent = filterTasks
  taskContainer.appendChild(p)
  listTodo(filterTasks)

}

const editTask = (index) =>{
  const newTask = prompt(tasks[index])
     if(newTask){
     
      tasks[index] = newTask.value
      listTodo()
      saveData()
     } else{
      alert ('The Task not be Empty !')
     }
}
const deleteTask = (index)=> {
  try{
    if (index >= 0 && index < tasks.length){
      tasks.splice(index , 1)
      listTodo()
      saveData()

    } else {
      throw Error('invalid index number ')
    }
  }
  catch(error){
    console.error(error)
  }
} 
const toggleComplete = (index)=>{
   tasks[index].completed = !tasks[index].completed
   saveData()
   listTodo()
}
const saveData = () =>{
  localStorage.setItem('tasks' , JSON.stringify(tasks)); 
}
const getData = JSON.parse(localStorage.getItem('tasks'))
 if(getData){
  tasks = getData ;
  listTodo()
 }


        
       
      
        
     


   

    

  








