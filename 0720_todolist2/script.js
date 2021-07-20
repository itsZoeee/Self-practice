/*
=============== 
Selector
===============
*/
const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');

let lists=[{
    id:1,
    name:'name'
},{
    id:2,
    name:'todo'
}];

/*
=============== 
Event Listeners
===============
*/
newListForm.addEventListener('submit', e=>{
    e.preventDefault();
    const listName = newListInput.value;
    if(listName.trim()=='')return;  // 不讓空白的加入啦~
    const list = createList(listName);
    newListInput.value = null;      // 清除input中輸入的字串 (=reset())
    lists.push(list);               // 將createList的物件們放入陣列中
    render();
});


/*
=============== 
Functions
===============
*/
//移除HTML中原有的task
function clearElement(element){
 while(element.firstChild){
     element.removeChild(element.firstChild);
 }   
}
function render(){
    clearElement(listsContainer);
    /*製作<li class="list-name active-list">Youtube</li>*/
    lists.forEach(list =>{
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id; //???????點選lists時，可以靠id得知點了哪一個
        listElement.classList.add('list-name');
        listElement.innerText = list.name; // 印出list中的物件的name
        listsContainer.appendChild(listElement);
        /*不要忘了最後的動作_APPEND */
    })
}
function createList(newListName){
    return {
        id:Date.now().toString(), // 建立唯一的id
        name: newListName,        // 輸入的參數為name
        tasks:[]                  // 建立清單時還沒有task，先建立空陣列
    }
}
render();