/*
==========
Selector
==========
*/

const captcha = document.querySelector(".captcha"),
reloadBtn = document.querySelector(".reload-btn"),
inputField = document.querySelector(".input-area input"),
checkBtn = document.querySelector(".check-btn"),
speakBtn = document.querySelector(".speak-btn"),
statusTxt = document.querySelector(".status-text");

let allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                     'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                     'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                     't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
/*
==========
EventLisenter
==========
*/ 

getCaptcha(); //calling getCaptcha when the page open

// 按 reload 鍵
reloadBtn.addEventListener("click", ()=>{
  removeContent();
  getCaptcha();
});


// 按 check 鍵
checkBtn.addEventListener("click", e =>{
  e.preventDefault(); 
  statusTxt.style.display = "block";
  //adding space after each character of user entered values because I've added spaces while generating captcha
  let inputVal = inputField.value.split('').join(' '); // .split('')將字串轉變為一放置各個字元ㄉ陣列，例如 "a b c d d e" => (6) ["a", "b", "c", "d", "d", "e"]
  console.log()
  // 若輸入正確captcha 
  if(inputVal == captcha.innerText){ 
    statusTxt.style.color = "#199700";
    statusTxt.innerText = "驗證碼輸入正確";
    setTimeout(()=>{ // 輸入正確後
      removeContent();
      getCaptcha();
    }, 2000);
  }else{
    statusTxt.style.color = "#ff0000";
    statusTxt.innerText = "驗證碼輸入錯誤，請再試一次!";
  }
});


/*
==========
Function
==========
*/     
console.log = function() {};

// 隨機產生字串
function getCaptcha(){
  for (let i = 0; i < 6; i++) { // 隨機湊成六字
    let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
    captcha.innerText += ` ${randomCharacter}`; // 文字間有空格
  }
}

function removeContent(){
 inputField.value = "";   // 清除輸入框的字
 captcha.innerText = "";  // 清除驗證碼中的字
 statusTxt.style.display = "none"; // 不會顯示任何提示字樣
}

speakBtn.addEventListener('click', () => {
  let text = captcha.innerText;
  responsiveVoice.speak(text,"UK English Female", {rate:0.9});
})
