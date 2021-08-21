/*
==========
Selector
==========
*/

const options = document.querySelectorAll("label");

/*
==========
EventLisenter
==========
*/ 

for(let i=0; i<options.length; i++){
    options[i].addEventListener("click",()=>{ // 替每個選項都監聽click事件
        // console.log(options[i]); // <label for>...</label>
        for(let k=0; k<options.length;k++){
            if(options[k].classList.contains("selected")){
                options[k].classList.remove("selected");
            }
            options[k].classList.add("selectall");
        }

        options[i].classList.add("selected");
        for(let j=0; j<options.length;j++){
            options[j].classList.add("selectall");
        }
    });
}

/*
==========
Function
==========
*/ 
