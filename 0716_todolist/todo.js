/*
=============== 
Selector
===============
*/
const todoForm = document.querySelector('.todoForm')
const todoInput = document.querySelector('.todoInput')
const todoButton = document.querySelector('.todoButton')
const todoList = document.querySelector('.todoList')
const filterOption = document.querySelector('.filterTodo')

/*
=============== 
Event Listeners
===============
*/
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo); // 可以不用直接把function打好打滿XD
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);

/*
=============== 
Functions
===============
*/
function addTodo (e){
    e.preventDefault();
    if (todoInput.value.trim() != ''){
    // li
    const newTodo = document.createElement('li');
    /*^很常忘記^*/
    newTodo.classList.add('todo');

    // div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoDiv');
    todoDiv.textContent = todoInput.value;
    // ADD todo to LOCALSTORAGE
    var test = { todoTitle:`${todoInput.value}`,
                 complete:false}
    saveLocalTodos(test); //todoInput.value

    todoForm.reset(); /*reset()只能用在form元素，且可以輸入完就reset!*/
    newTodo.appendChild(todoDiv);


    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></li>' ;
    completedButton.classList.add('completedBtn');
    newTodo.appendChild(completedButton);
    /*^每次都會忘記這個^*/

    // trash mark button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></li>' ;
    trashButton.classList.add('trashBtn');
    newTodo.appendChild(trashButton);
    /*^每次都會忘記這個^*/

    // !!! APPEND TO LIST !!! APPEND從父層下手
    todoList.appendChild(newTodo);
    }
    else{
        alert('keyin sth.')
    }    
}

//net ninja的方法 
/*function deleteCheck(e){
    刪除時常用到.target，每次都忘記 !!!
    if(e.target.className == 'trashBtn'){
        const li = e.target.parentElement;  //因為e.target找到的是btn，所以繼續往上才到li
        console.log(li);
        li.remove();  //或寫成 li.parentNode.removeChild(li); 
        console.log("^That;s it^, BIBI !!");
    }; 
} */

function deleteCheck(e){
    const item = e.target;
    const todo = item.parentElement;
    //刪除時常用到.target，每次都忘記 !!!
    //console.log(item.classList);    //0: "trashBtn"，length: 1，value: "trashBtn"
    if(item.classList[0] == 'trashBtn'){
        todo.classList.toggle('fall'); //設計刪除前的動畫
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }

    else if(item.classList[0] == 'completedBtn'){
        todo.classList.toggle('completed');

        //localStorage
        const todoDivText = todo.children[0].innerText; // todoLi.children[0]即div，innerText就是待辦的文字
        let todos = JSON.parse(localStorage.getItem('todos')); // localStorage
        const index = todos.findIndex(x => x.todoTitle === todoDivText); // 因為陣列中是物件，所以不用indexOf()，ps.也可用map()
        //console.log('findIndex >', index);
    
        todos[index].complete = !todos[index].complete; // 若打勾，物件中的complete:flase->true
        localStorage.setItem('todos', JSON.stringify(todos)); // 沒加的話，localStorage中的資料不會被做更動
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    //console.log('todos >',todos);
    
    todos.forEach(function (todo){ // 一定要用到foreach，不然只有第一個li有效
        switch(e.target.value){ // e.target.value = all/completed/uncompleted
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}

/*
=============== 
Functions_localStorage相關
===============
*/

function saveLocalTodos(todo){
    //CHECK --- Hey do I already have thing in there?
    // ps.可以localstorage.clear();清除
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []; //創造一個空陣列
        all = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));// JSON.parse(myJSON)：將資料由 JSON 格式字串轉回原本的資料內容及型別。
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));// JSON.stringify()：將資料轉為 JSON 格式的字串
}

function getTodos(){
    //CHECK --- Hey do I already have thing in there?
    // ps.可以localstorage.clear();清除
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []; //創造一個空陣列
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
        let localJSON = JSON.parse(localStorage.getItem('all'));
    }

    todos.forEach(function (each){ // 陣列中的第0筆、第1筆、第2...分別帶入
        // 以下過程同建立todo，重頭新增一次所有標籤
        // 唯一差別：從資料庫撈出資料(而非取自於數入框)
        // li
        const newTodo = document.createElement('li');
        /*^很常忘記^*/
        newTodo.classList.add('todo');
    
        // div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todoDiv');
        // 從資料庫中抓出來
        todoDiv.textContent = each.todoTitle; //搭配todos/localJSON，ps.不像上面是以input.value輸入
        newTodo.appendChild(todoDiv);
    
        // check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></li>' ;
        completedButton.classList.add('completedBtn');
        newTodo.appendChild(completedButton);
        /*^每次都會忘記這個^*/
    
        // trash mark button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></li>' ;
        trashButton.classList.add('trashBtn');
        newTodo.appendChild(trashButton);
        /*^每次都會忘記這個^*/
    
        // !!! APPEND TO LIST !!! APPEND從父層下手
        todoList.appendChild(newTodo);
        
        if (each.complete == true){ // 若這筆資料是complete的，就加上completed的class
            console.log('HERRREE', newTodo);
            newTodo.classList.add('completed');
        }
        
    }) 
}

function removeLocalTodos(todoLi){ //todo=e.target.parentElement 即每行todo的li標籤!
    // ps.可以localstorage.clear();清除
    let todos;
    todos = JSON.parse(localStorage.getItem('todos'));


    const todoDivText = todoLi.children[0].innerText; // todoLi.children[0]即div，innerText就是待辦的文字
    const index = todos.findIndex(x => x.todoTitle === todoDivText); // 因為陣列中是物件，所以不用indexOf()，ps.也可用map()
    console.log('findIndex >', index);
    
    todos.splice(index,1); // 刪掉了陣列中的這筆
    localStorage.setItem('todos', JSON.stringify(todos)); // 沒加的話，localStorage中的資料不被刪除喔
}