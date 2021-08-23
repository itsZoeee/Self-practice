/*
==========
Selector
==========
*/

const ulTag = document.querySelector("ul");
let totalPages =20;
/*
==========
EventLisenter
==========
*/ 



/*
==========
Function
==========
*/ 
function element(totalPages, page){
    let liTag = '';
    let activeLi;
    let beforePages = page - 1;
    let afterPages = page + 1;

    // 按下prev，就會從prev重新帶入element()跑
    if(page > 1){
        liTag += `<li class="btn prev" onclick="element(totalPages,${page-1})")><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
    } 

    if(page > 2){
        liTag += `<li class="num" onclick="element(totalPages,1)"><span>1</span></li>`;
        if(page > 3){
            liTag += `<li class="dots"><span>...</span></li>`;
        }
    }
    // how many pages or li show before the current li
    if (page == totalPages) {
        beforePage = beforePage - 2;
    } else if (page == totalPages - 1) {
        beforePage = beforePage - 1;
    }
    // how many pages or li show after the current li
    if (page == 1) {
        afterPage = afterPage + 2;
    } else if (page == 2) {
        afterPage  = afterPage + 1;
    }
    // 目前頁面的前頁-次頁(共三頁)
    for(let pageLength = beforePages; pageLength <= afterPages; pageLength++){
        if(pageLength > totalPages){ // 防止頁數跳到不存在(pages+++)的頁面
            continue;
        }
        if(pageLength == 0){ // 防止頁數跳到不存在(pages---)的頁面
            pageLength = pageLength +1;
        }
        if(page == pageLength){
            activeLi = "active";     // 目前頁面 + class active
        }else{
            activeLi="";
        }
        liTag += `<li class="num ${activeLi}" onclick="element(totalPages,${pageLength})"><span>${pageLength}</span></li>`; 
    }

    if(page < totalPages - 1){
        if(page < totalPages - 2){
            liTag += `<li class="dots"><span>...</span></li>`;
        }
        liTag += `<li class="num" onclick="element(totalPages,${totalPages})"><span>${totalPages}</span></li>`;
    }

    if(page < totalPages){
        liTag += `<li class="btn next" onclick="element(totalPages,${page+1})"><span>Next <i class="fas fa-angle-right"></i></span></span></li>`;
    }

    ulTag.innerHTML = liTag;
}

element(totalPages,5);