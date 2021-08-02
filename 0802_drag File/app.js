/*
=============
Selector
=============
*/

const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("header");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("input");

let file; 

/*
=============
ButtonSubstitue
=============
*/
button.onclick = () =>{
    input.click();
}



/*
=============
EventListener
=============
*/
dropArea.addEventListener("dragover",(event)=>{ // 將檔案拖曳進此區的每分秒
    event.preventDefault(); // 預設會另跳出一個頁面
    dropArea.classList.add("active"); // 邊框變成實線
    dragText.textContent = "Release to Upload";
})

dropArea.addEventListener("dragleave",()=>{ // 將拖曳離開此區
    dropArea.classList.remove("active");
     dragText.textContent = "Drag & Drop to Upload File";  
})

dropArea.addEventListener("drop",(event)=>{ 
    event.preventDefault(); // 預設會另跳出一個頁面
    file = event.dataTransfer.files[0]; // [0]表示若使用者上船多個檔案，僅會抓取第一個
    //console.log(file);

    showFile();
})

input.addEventListener("change",function(){
    // console.log(this); // <input type="file" name="" id="" hidden="">
    // console.log(this.files[0]); // File {name: "26964729-doodle-transport-icons-set.jpg", lastModified: 1625996318986, lastModifiedDate: Sun Jul 11 2021 17:38:38 GMT+0800 (台北標準時間), webkitRelativePath: "", size: 198848, …}
    file = this.files[0];
    showFile();
})
/*
=============
Function
=============
*/

function showFile(){
    let fileType = file.type; // application/pdf ; image/jpeg ...

    let validExtensions = ["image/"];
    if(fileType.includes(validExtensions)){
        // console.log("OKKK");
        let fileReader = new FileReader(); // creating new FileReader Object
        fileReader.onload = ()=>{
            let fileURL = fileReader.result;
            
            let imgTag = `<img src="${fileURL}" alt="userUpload.img">`;
            dropArea.innerHTML = imgTag; // 等於取代掉整個框框內原本的內容
            dropArea.classList.add("show");
        }
        fileReader.readAsDataURL(file); // base64-format of img
    }else{
        alert("NOT ACCEPT");
    }
}