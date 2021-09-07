/*
==========
Selector
==========
*/
const wrapper = document.querySelector(".wrapper"),
toast = wrapper.querySelector(".toast"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon");

/*
==========
EventLisenter
==========
*/ 
window.onload = () => {
    setInterval(()=>{
        ajax();
    },100);
}

/*
==========
Function
==========
*/ 
function ajax(){
        let xhr = new XMLHttpRequest(); //creating new XML object
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); //sending get request on this URL，確認request
        xhr.onload = (event)=>{ // 這行可以不用帶入event了，因一開始帶入只是為了檢察物件中的status
            // console.log(xhr.response); 
            // console.log(event); // ProgressEvent {isTrusted: true, lengthComputable: false, loaded: 27520, total: 0, type: "load", …}
            if(xhr.status == 200){
                toast.classList.remove("offline");
                title.innerText = "You're online now";
                subTitle.innerText = "Hurray! Internet is connected.";
                wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
                closeIcon.onclick = ()=>{ //hide toast notification on close icon click
                    wrapper.classList.add("hide");
                }
                setTimeout(()=>{ //hide the toast notification automatically after 5 seconds
                    wrapper.classList.add("hide");
                }, 5000);
            }else{ // not online or error
                offline();
            }
        };
        xhr.onerror = (event)=>{
            // console.log("Error occur!");
            offline();
        };
        xhr.send();
    }

function offline(){
    wrapper.classList.remove("hide");
    toast.classList.add("offline");
    title.innerText= "U r offline now";
    subTitle.innerText= "Oppos! Internet is disconnected.";
    wifiIcon.innerHTML='<i class="uil uil-wifi"></i>';
}