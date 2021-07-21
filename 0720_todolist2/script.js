/*
=============== 
LocalStorage
===============
*/
/*let lists=[{id:1,name:'name'},
           {id:2,name:'todo'}];*/ //一開始的測試資料


// 資料儲存  
const LOCAL_STORAGE_LIST_KEY = 'task.lists'; //nameSpace
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] ; //若LOCALSTORAGE找的到就parsein，找不到就建立[]

// 儲存已選擇的list的ID
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListsId'; //nameSpace
let selectedListsId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)); // 選到的listID(time())


/*
=============== 
Selector
===============
*/
// 左半部_list清單相關
const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListBtn = document.querySelector('[data-delete-list-btn]');

// 右半部_listDisplay相關
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');

// 右半部_tasks相關
const tasksBox = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('taskTemplate');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const clearCompleteTasksBtn = document.querySelector('[data-clear-complete-task-btn]');

/*
=============== 
Event Listeners
===============
*/
// lists相關
newListForm.addEventListener('submit', e=>{
    e.preventDefault();
    const listName = newListInput.value;
    if(listName.trim()=='') return;  // 不讓空白的加入啦~
    const newList = createList(listName);
    newListInput.value = null;      // 清除input中輸入的字串 (=reset())
    lists.push(newList);           // 將新list放入lists陣列中
    saveAndRender();
});

listsContainer.addEventListener('click', e=> {
    //console.log(e.target.dataset); // e為MouseEvent，包含點擊位置/target/type等;e.target為該行整個標籤;e.target.tagName =LI
    if(e.target.tagName.toLowerCase() == 'li'){
        selectedListsId = e.target.dataset.listId; // e.target.dataset：DOMStringMap，抓取出的listId即為當初以time()建立的唯一鍵
        saveAndRender();
    }
})

deleteListBtn.addEventListener('click', e=>{
    lists = lists.filter(list => list.id !== selectedListsId); // 除了被選中的那一個list，其餘皆留下 
    // Arrary.prototype.filter(某函式) = 由原陣列經由指定函式檢驗後，所filter出的新陣列
    selectedListsId = null ; // 將選定的listID設定為空
    saveAndRender();
})


// tasks相關
newTaskForm.addEventListener('submit', e=>{
    e.preventDefault();
    const taskName = newTaskInput.value;
    if(taskName.trim()=='') return;   // 不讓空白的加入啦~
    // task
    const newTask = createTask(taskName);
    // in which List ?
    const selectedList = lists.find(whichList => whichList.id == selectedListsId);
    // 該list中的tasks(是array!)
    selectedList.tasks.push(newTask); // 將新task放入陣列中

    newTaskInput.value = null;        // 清除input中輸入的字串 (=reset())
    saveAndRender();
});


tasksBox.addEventListener('click', e=>{
    if(e.target.tagName == 'INPUT'){
        // 屬於哪個list
        const selectedList = lists.find(whichList => whichList.id == selectedListsId);
        
        // 中的哪個task
        const selectedTask = selectedList.tasks.find(whichTask => whichTask.id == e.target.id);
        //console.log(selectedTask);    // {id: "1626859269317", name: "happyyyy", complete: false}
        selectedTask.complete = e.target.checked;  // 依照選擇框打勾與否，將T/F傳進local_lists_task的complete屬性
        
        saveToLocalStorage();
        rendertaskCount(selectedList);
    }
})

clearCompleteTasksBtn.addEventListener('click', e=>{
    const selectedList = lists.find(list => list.id == selectedListsId) ; // 將選定的listID設定為空
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
    saveAndRender();
})



/*
=============== 
Functions
===============
*/
render(); //初始化，將資料庫資料讀取至頁面中

//移除HTML中原有的lists
function clearElement(element){
 while(element.firstChild){
     element.removeChild(element.firstChild);
 }   
}

//製作<li class="list-name active-list" data-list-id="1626837817167">Youtube</li>
function renderLists(){
    // lists = localStorage中的其中一個資料表，為Array !
    lists.forEach(eachList =>{ // 從localStorage抓取出lists資料表，讓其中的每一個list都進行以下動作
    
    // li
    const listElement = document.createElement('li'); 
    listElement.classList.add('list-name');
    listElement.innerText = eachList.name; // li標籤的文字=印出list中的物件的name
    
    // data-*屬性(填入大寫處，id會以-做分隔)
    listElement.dataset.listId = eachList.id; //???????點選lists時，可以靠id得知點了哪一個

    // 選擇的list加class
    if(eachList.id == selectedListsId){
        listElement.classList.add('active-list'); // 若選種了該list，則該list會是active-list(會變成粗體字)
    }

    /*不要忘了最後的動作_APPEND */
    listsContainer.appendChild(listElement);
})
}

function render(){
    // 左半_list部份
    clearElement(listsContainer);
    renderLists();

    // 右半_listDisplay部分
    if (selectedListsId == null){
        listDisplayContainer.style.display = 'none';
    }else{
        // selectedList：找出選定的ID其在localstorage_lists中對應的物件
        const selectedList = lists.find(whcihList => whcihList.id === selectedListsId); // find() 會回傳首筆滿足測試函式的元素值，否則回傳 undefined。
        //console.log('selectedList >', selectedList); /* selectedList > {id: "1626841632793", name: "BeHappy", tasks: Array(1)}*/
        listDisplayContainer.style.display = ''; //還原原本的值 (或用'initial')

        // Title
        listTitleElement.innerText = selectedList.name;
        // tasks remaining
        clearElement(tasksBox);
        rendertaskCount(selectedList);
        renderTasks(selectedList);
    }
}

function rendertaskCount(selectedList){
    // 計算選取的list中，未完成的task數量
    const incompleteTaskscount = selectedList.tasks.filter(task => !task.complete).length; // task => task.complete == false
    // 英文文法的部份XD ~
    const Singular = [0,1]; 
    const taskString = (incompleteTaskscount in Singular) ? "task" : 'tasks'; // 很在意英文文法喔XD
    listCountElement.innerText = `${incompleteTaskscount} ${taskString} remaining`;
}

// 插入新增的tasks，由於需加入的結構較複雜，所以寫在<template>中，以importNode加入
/*<template id="taskTemplate"> 
<div class="task">
    <input type="checkbox"/>
    <label>
      <span class="custom-checkbox"></span>
    </label>
</div>
</template>*/
function renderTasks(selectedList){
    // local_storage中，selectedList陣列中的tasks物件
    selectedList.tasks.forEach(eachTask =>{
        const taskElement = document.importNode(taskTemplate.content, true); // true會回傳template中的所有東西，否則只回傳第一行
        
        // checkbox  (<input type="checkbox"/>)
        const checkbox = taskElement.querySelector('input');
        // <input type="checkbox" id="test1">
        checkbox.id = eachTask.id; // 設定checkbox的標籤屬性id = lists物件中的，task物件id
        checkbox.checked = eachTask.complete; // checkbox的屬性.checked和tasks物件中的complete一樣，都是T/F
        
        // label (<label> </label>)
        const label = taskElement.querySelector('label');
        // <label for="">
        label.htmlFor = eachTask.id; //以for屬性值連結表單元件的id(給說明標題)
        console.log(eachTask.name)
        label.append(eachTask.name);// 意義同 label.innerText = eachTask.name;

        tasksBox.appendChild(taskElement);
    })
}

// Set到localstorage中的資料表*2
function saveToLocalStorage(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists)); // key,value   儲存list
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, JSON.stringify(selectedListsId)); // 儲存選定的listID
}


function createList(newListName){
    return {
        id:Date.now().toString(), // 建立唯一的id
        name: newListName,        // 輸入的參數為name
        tasks:[]                  // 建立清單時還沒有task，先建立空陣列
        /*{
            id:'test1',
            name:'TestTask',
            complete:true
        }*/
    }
}

function createTask(newTaskName){
    return {
        id:Date.now().toString(), // 建立唯一的id
        name: newTaskName,        // 輸入的參數為name
        complete:false            // 建立任務時還沒有完成
    }
}


function saveAndRender(){
    saveToLocalStorage();
    render();
}
