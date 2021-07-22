/*
==========
Selector
==========
*/

let text = document.getElementById('text');
let bird1 = document.getElementById('bird1');
let bird2 = document.getElementById('bird2');
let btn = document.getElementById('btn');
let rocks = document.getElementById('rocks');
let forest = document.getElementById('forest');
let water = document.getElementById('water');
let header = document.getElementById('header');

/*
==========
Event listener
==========
*/
window.addEventListener('scroll', function(){
    let value = window.scrollY;
    //console.log(value);

    text.style.top = 50 + value * -0.5 + '%'; /*50+讓字先隱藏於森林之後(所以是在原位置往下) */
    bird1.style.top = value * -1.5 + 'px'; /*往上飛*/
    bird1.style.left = value * 2 + 'px'; /*往右飛*/

    bird2.style.top = value * -1.5 + 'px'; /*往上飛*/
    bird2.style.left = value * -5 + 'px'; /*往左飛*/

    btn.style.marginTop = value * 1.5 + 'px'; /*按鈕沉進水裡*/

    rocks.style.top = value * -0.13 + 'px'; /*岩石浮出水面更多*/

    forest.style.top = value * 0.25 + 'px';

    header.style.top = value * 0.5 + 'px'; /*標頭列向下沉的較慢*/
})