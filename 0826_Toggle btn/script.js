/*
==========
Selector
==========
*/
const body = document.querySelector('body');
const toggle = document.getElementById('toggle');
const word = document.querySelector('.word');

/*
==========
EventLisenter
==========
*/ 
toggle.onclick = function(){
    toggle.classList.toggle('active'); /* 按鈕左右滑動*/
    body.classList.toggle('active');
    word.classList.toggle('active');
}
toggle.addEventListener('click',wordContent);

function wordContent(){
    if(word.classList.contains("active")){
        word.textContent = 'WHITE';
    }else{
        word.textContent = 'BLACK';
    }
}