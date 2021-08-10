/*
=============
Selector
=============
*/
const wrapper = document.querySelector(".wrapper"),
header = wrapper.querySelector("header");


/*
=============
EventListener
=============
*/

header.addEventListener("mousedown", ()=>{
    header.classList.add("active");
    header.addEventListener("mousemove", onDrag);
});

// 要針對全域偵測mouseup，否則會變成滑鼠移到哪裡都會移動框框
document.addEventListener("mouseup", ()=>{
    header.classList.remove("active");
    header.removeEventListener("mousemove", onDrag);
});

/*
=============
Function
=============
*/

function onDrag({movementX, movementY}){
    let getStyle = window.getComputedStyle(wrapper);
    
    // console.log(typeof getStyle.left); // string，所以以下用parseInt轉換成number(才可做運算)
    let leftVal = parseInt(getStyle.left); // 越往左，px越小
    let topVal = parseInt(getStyle.top); // 越往上，px越小
    
    console.log({movementX, movementY}); // MouseEvent，內有許多屬性。可以以e先看全部的屬性有哪些，在挑選自己需要的放數parameter!!

    wrapper.style.left = `${leftVal + movementX}px`;
    wrapper.style.top = `${topVal + movementY}px`;
}

