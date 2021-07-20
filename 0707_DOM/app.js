document.addEventListener('DOMContentLoaded', function(){ //若js在HTML前段被loaded，那就有可能整個js都沒辦法正常運作(因為DOM還沒有被網站架構完，就早已跑完js了)，所以用這行可以避免之

/*getElementsBy*/
var titles = document.getElementsByClassName('title');  //較不適合實作，因為無法撈到較精確的資料(只能撈出所有tag/class相同者)
console.log("===getElementsByClassName===");
//因為titles只是HTMLCollection，所以先轉為array才能使用foreach
Array.from(titles).forEach(function(item){
    
    console.log(item);
})

/*querySelector*/
const wrap =document.querySelector('#wrapper');

/*querySelectorAll*/
console.log("===querySelectorAll===");
var booklist = document.querySelectorAll('#book-list li .name');
var books = Array.from(booklist);

books.forEach(function(item){
        console.log(item);
})

/*.textContent*/
// 取代
console.log("===.textContent===");
books.forEach(function(item){
    console.log(item.textContent);
})
//append
console.log("===CHANGE__.textContent===");
/*books.forEach(function(item){
    item.textContent="好想看書呀!";
})*/

/*.innerHTML*/
const list = document.querySelector('#book-list');
console.log("===.innerHTML===");
//讀取
console.log(list.innerHTML);

//取代
//list.innerHTML = "<h1>我是胖虎我是孩子王</h1>";

//append
list.innerHTML += "<h1>我是胖虎我是孩子王</h1>";

/*NODE */
console.log("===NODE===");
const banner = document.querySelector('#page-banner');

console.log('#page-banner node name is:', banner.nodeName);
console.log('#page-banner node type is:', banner.nodeType);
console.log('#page-banner has child nodes:', banner.hasChildNodes());

const nestedBanner = banner.cloneNode(true); //填true可抓取所有內層的資料；若填flase，則只會抓到banner那行的資料
console.log(nestedBanner);

/*Traversing the DOM */
// 因35行出現過，所以此註解掉const list = document.querySelector('#book-list');
console.log("===Traversing the DOM===");

//to Parent
console.log('the parent node is', list.parentNode);
console.log('the grandparent node is', list.parentNode.parentNode);

//to Child
console.log('X the children has', list.childNodes); //會抓取textNode(因為會抓到換行的元素)
console.log('O the children node is', list.children) ;   //純粹抓取childrenElement

//to Sibilings
console.log('X the previous sibiling node is', list.previousSibling); //抓取到#text(即換行元素)
console.log('O the previous sibiling node is', list.previousElementSibling); //抓取到

console.log('X the next sibiling node is', list.nextSibling); //抓取到#text(即換行元素)
console.log('O the next sibiling node is', list.nextElementSibling); //抓取到

//小小的綜合運用
list.previousElementSibling.querySelector('p').innerHTML += '<br />這裡是副標題ㄇ?' ;

/*ＥＶＥＮＴ */
//牛刀小試
console.log("===EVENT===");
var h1 = document.querySelector('h1');
h1.addEventListener('click',function(e){ //click EVENT
    console.log("I HEAR U!!");
    console.log(e);
    console.log(e.target); //target是event物件的屬性之一，指where is the target event
});

//preventDefault 
list.previousElementSibling.querySelector('p').innerHTML += '<br><a href="https://hackmd.io/Y6yCl8X3SpWSVo3uGMdSAg">MY HACKMD :D </a>' ;
//上一行是複習以前的語法，加入a連結

const link = document.querySelector('#page-banner a')
link.addEventListener('click', function(e){
    console.log("===preventDefault===");
    e.preventDefault();
    console.log("Don;t GOOOOO !! ->", link.getAttribute("href"));
});


//DELETE sth.
/*var btns = document.querySelectorAll('#book-list .delete');
Array.from(btns).forEach(function(btn){
    btn.addEventListener('click', function(e){
        console.log("===DELETE sth.===");

        const li = e.target.parentElement;
        console.log(li.parentNode);
        li.parentNode.removeChild(li);
        console.log("^That;s it^, BIBI !!");
        //btn.parentNode.remove();
    });
});*/
//以上這段和/*Event Bubbling */功能相同，所以註解掉


/*Event Bubbling */
const list_ul = document.querySelector('#book-list ul');
//以下這段和//DELETE sth.功能相同，所以註解掉104-
list.addEventListener('click', function(e){
    console.log("===Event Bubbling===");
    if(e.target.className == 'delete'){
        const li = e.target.parentElement;  //因為e.target找到的是btn，所以繼續往上才到li
        console.log(li);
        list_ul.removeChild(li);  //或寫成 li.parentNode.removeChild(li); 
        console.log("^That;s it^, BIBI !!");
    }; 
});

/*ｆｏｒｍｓ*/
/*牛刀小試*/
console.log("===Forms===");
document.forms;
document.forms[0];
document.forms['add-book'];

const addForm = document.forms['add-book'];

/*取消預設行為 + 取出輸入value!*/
addForm.addEventListener('submit', function(e){ //listen submit事件

    e.preventDefault(); //form預設會submit送出並重整網頁
    console.log("===Form_input===");
    const input = addForm.querySelector('input[type="text"]');
    console.log(input);
    console.log("===Form_input_value===");
    const inputValue = addForm.querySelector('input[type="text"]').value;
    console.log(inputValue);

    /*add book*/

    //STEP1. create elements
    const addLi = document.createElement('li');  //建立出<li> </li>標籤
    const bookName = document.createElement('span');
    const deleBtn = document.createElement('span');
    console.log("===STEP1. create elements===");
    console.log("建立出<li> </li> ; <span></span> 標籤");

    //STEP2. add textContent
    bookName.textContent = inputValue ;
    deleBtn.textContent = 'delete';
    console.log("===STEP2. add content===");
    console.log("將輸入的值&delete分別加入標籤的textContent中");

    //STEP3. add class值輸入了，但class不對
    bookName.classList.add('name');
    deleBtn.classList.add('delete');
    /*deleBtn.setAttribute('class','delete');*/
    console.log("===STEP3. add class===");
    console.log("值輸入了，但class不對");

    //STEP4. append to document
    addLi.appendChild(bookName);
    addLi.appendChild(deleBtn);
    list_ul.appendChild(addLi);

    console.log("===STEP4. append to document===");
    console.log("將這幾個標籤加到原element的最後");

});

/*Attribute*/
list_ul.getAttribute('class');
console.log("===Attribute===");
console.log(list_ul.getAttribute('class'));

/*Checkbox-hidebooks*/
const hideBox = document.querySelector('#hide')

hideBox.addEventListener('change',function(e){
    console.log("===Checkbox===");
    if(hideBox.checked){  //若chekBox被勾選了
        list_ul.style.display = 'none';
    }
    else{   //若chekBox沒有被勾選
        list_ul.style.display = 'initial'; //也可以用block啦
    }
});

/*Filter*/
const searchBar = document.forms['search-books'].querySelector('input');
 //搜尋列這邊是form元素，複習抓取form元素的用法

searchBar.addEventListener('keyup',function(e){ //listen keyup 事件
    console.log("===Filter===");
    const term = e.target.value.toLowerCase(); // 使用者輸入的字串會被轉換為小寫(方便字串比對)
    console.log('keyin：',term);
    const allBooks = list_ul.querySelectorAll('li'); // 將目前頁面上的書籍li標籤找出來
    
    Array.from(allBooks).forEach(function(book){ // 用array找出目前每本書的書名
        const bookTitle = book.querySelector('.name').textContent; //找出書名(ie. li中的texContent)
        console.log(bookTitle);
        if(bookTitle.toLowerCase().indexOf(term) != -1){
            book.style.display = 'block';   //比對成功者繼續顯示在網頁上
        } 
        else{
            book.style.display = 'none';    //沒有比對到的就display none
        }
    })
});

/*Tabbed Content*/
const tabs = document.querySelector('.tabs');
const panels = document.querySelectorAll('.panel');

tabs.addEventListener('click', function(e){
    if(e.target.tagName == 'LI'){ // ps.li寫小寫沒用...
        console.log('===Tabbed Content===');
        const targetPanel = document.querySelector(e.target.dataset.target); //選出li指向的panel內容!! (因作者屬性命名為data-target="#~~"，所以在dataset後面才加target)
        console.log('target is...',targetPanel);
        panels.forEach(function(panel){
            console.log(panel);
            if(panel == targetPanel){
                panel.classList.add('active'); //會偵測，若已包含active的class，就不會再疊加上去喲!
            }
            else{
                panel.classList.remove('active');
            }
        })
    }
});


})