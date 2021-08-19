/*
==========
Selector
==========
*/

const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times"; // iconX (fontAwesome)
let playerOIcon = "far fa-circle"; // iconO (fontAwesome)

let playerSign = "X"; // 預設玩家是 X
let runBot = true;
/*
==========
EventLisenter
==========
*/ 

window.onload = ()=>{ // once window loaded
    for (let i = 0; i < allBox.length; i++) { // 每格九宮格都加上onclick屬性
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide"); // 隱藏選擇玩家的框框
    playBoard.classList.add("show"); // 顯示playground
}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide"); // 隱藏選擇玩家的框框
    playBoard.classList.add("show"); // 顯示playground
    players.setAttribute("class", "players active player");
}

/*
==========
Function
==========
*/ 
// 選擇玩家
function clickedBox(element){
    // console.log(element);  // <span class="box1" onclick="clickedBox(this)"><i class="fas fa-times"></i></span>
    if(players.classList.contains("player")){ // 如果玩家選擇 O
        playerSign = "O"; // 改變playerSign(因為預設為X)
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign); //set id attribute
    }else{ // 如果玩家選擇 X
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign); //set id attribute
    }
    selectWinner();
    element.style.pointerEvents = "none"; // 不能重複點擊 ! (沒有加這行的話，視覺上看起來一樣，但看console.log就知道一直被重複點擊)
    playBoard.style.pointerEvents = "none";
    let randomDelayTime = (Math.random() * 1000).toFixed(); // 隨機產生電腦考慮時間
    setTimeout(()=>{
        bot();
    }, randomDelayTime);
}

// 選擇九宮格，計算沒有被選中的格子
function bot(){
    
    let array = [];
    if(runBot){
        playerSign = "O"; // change the playerSign to O so if player has chosen X then bot will O
        for(let i=0; i < allBox.length; i++){ // allBox是selectAll，所以本身就是array
            if(allBox[i].childElementCount == 0 ){ // 若span沒有任何子標籤，代表還沒被選中(因為選中會有i標籤顯示icon)
                array.push(i);
                // console.log(`${i} has no children`);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; // 隨機產生index 
        // console.log(randomBox); // 由於array內的數字會越來越少(有些格子被按走了)，所以產生的數字會跟著變小，最後array中沒有東西，而產生undefined
        console.log(array); // (9) [0, 1, 2, 3, 4, 5, 6, 7, 8]

        if(array.length > 0 ){
            if(players.classList.contains("player")){ // 若玩家選擇O，代表電腦是X
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.add("active");
                playerSign = "X"; //if player has chosen O then bot will X
                allBox[randomBox].setAttribute("id", playerSign);
            }else{ // 若玩家選擇X，代表電腦是O
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none"; // 不能重複點擊 ! 否則就可以把電腦的棋變自己的XD
        playBoard.style.pointerEvents = "auto"; //add pointerEvents auto in playboard so user can again click on box
        playerSign = "X";
    
    }
    
}

// 判斷贏家
function getIdVal(classname){
    return document.querySelector(`.box${classname}`).id; //return id value
}

function checkIdSign(val1, val2, val3, sign){ //checking all id value is equal to sign (X or O) or not if yes then return true
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner(){ //if the one of following winning combination match then select the winner
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
        runBot = false; //passing the false boolen value to runBot so bot won't run again
        bot(runBot); //calling bot function
        setTimeout(()=>{ //after match won by someone then hide the playboard and show the result box after 700ms
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700); //1s = 1000ms
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`; //displaying winning text with passing playerSign (X or O)
    }else{ //if all boxes/element have id value and still no one win then draw the match
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false; //passing the false boolen value to runBot so bot won't run again
            bot(runBot); //calling bot function
            setTimeout(()=>{ //after match drawn then hide the playboard and show the result box after 700ms
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700); //1s = 1000ms
            wonText.textContent = "Match has been drawn!"; //displaying draw match text
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload(); //reload the current page on replay button click
}