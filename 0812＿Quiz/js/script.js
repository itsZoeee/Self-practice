/*
==========
Selector
==========
*/

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// 打勾/打叉圖示
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

/*
==========
Btn onclick
==========
*/
initalSetting();
let counter;
let counterLine;

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box

    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0); 
}

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    initalSetting();
    showQuetions(que_count); 
    queCounter(que_numb); // passing que_numb value to queCounter

    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function

    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

// if Next Que button clicked
next_btn.onclick = ()=>{
    // 偵測是否為最後一題
    if(que_count < questions.length - 1){ // if question count is less than total question length
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); // 題數回報於footer
        
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 

        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); // 隱藏next按鈕(直到該題選完再顯示)
    }
    
    // 再按就沒題目啦
    else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}

/*
==========
Function
==========
*/
function initalSetting(){
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
}

/*將question物件輸出至網頁 */
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    // 印出問句
    let que_tag = `<span>Q${questions[index].numb} >>> ${questions[index].question}</span>`;

    // 印出選項
    /*let option_tag = `<div class="option"><span>${questions[index].options[0]}</span></div>`
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';*/
    let option_tag ="";
    for(i=0; i < 4; i++){
        option_tag += `<div class="option"><span>${questions[index].options[i]}</span></div>`;
    }

    // 將問句+選項標籤元素放入排版
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
   
    // 將所有選項加入onclick屬性(attribute)
    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)"); // this指向target
    }
}

/*倒數開始*/
function startTimer(time){
    // 每隔一秒就跑一次timer()
    counter = setInterval(timer, 1000);

    function timer(){
        timeCount.textContent = time; // 數字呈現在倒數計時區
        time--; // 每跑一次timer()，time就-1
        widthValue = 15 - time;

        if(time < 9){ // 個位數時，在最前方+0保持兩位數
            let addZero = timeCount.textContent; 
            timeCount.textContent = `0${addZero}`; 
            /*timeCount.setAttribute("color", "red");*/
        }

        if(time < 0){ // 跑到不能再跑啦，時間到啦
            clearInterval(counter); // clear counter
            timeText.textContent = "Time Off"; // time text 文字變為 time off

            const allOptions = option_list.children.length; // 該題共有?個選項
            let correcAns = questions[que_count].answer; // 該題正確選項ㄉ文字

            // 時間到，user沒有答題，自動浮現答案
            showRightAns(correcAns,allOptions);
        }
    }
}

function startTimerLine(widthValue){
    timeInterval = 550 / timeValue; // 15秒跑550px
    counterLine = setInterval(timer, 27); // 每0.027秒跑1px
    function timer(){
        widthValue ++; //upgrading time value with 1
        time_line.style.width = `${widthValue}px`; //increasing width of time_line with px by time value
        
        if(widthValue > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}
/*計算題數(於footer顯示用)*/
function queCounter(index){ // 從1開始(表第1題)
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

/*當user選擇答案後，正確者綠色底，若有錯則顯示紅+綠*/
function optionSelected(answer){
    // console.log(answer); // <div class="option correct disabled" onclick="optionSelected(this)"><span>Hyper Text Markup Language</span><div class="icon tick"><i class="fas fa-check"></i></div></div>
    clearInterval(counter); // clearInterval()用來清除setInterval()中設定的動作。 counter = setInterval(timer, 1000);
    clearInterval(counterLine); // counterLine = setInterval(timer, 29)

    let userAns = answer.textContent; // user選擇的選項的文字
    let correcAns = questions[que_count].answer; // 該題正確選項ㄉ文字
    const allOptions = option_list.children.length; // 該題共有?個選項
    
    // 若答對題目
    if(userAns == correcAns){ 
        userScore += 1; // 答對題數+1
    }
    
    // 若答錯題目
    else{ 
        answer.classList.add("incorrect"); // 答錯 紅色底
        answer.insertAdjacentHTML("beforeend", crossIconTag); // 叉叉圖示
    }

    // 正確答案給綠色底
    showRightAns(correcAns,allOptions);
}

/*顯示正確選項 + 禁止再選 + 顯示next按鈕 */
function showRightAns(correcAns,allOptions){
    for(i=0; i < allOptions; i++){ 
        if(option_list.children[i].textContent == correcAns){ 
            //option_list.children[i].setAttribute("class", "option correct"); 方法同下一行，為與上個if段落一致，故使用下行語法
            option_list.children[i].classList.add("correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // 勾勾圖示
            /*console.log("Auto selected correct answer.");*/
        }
    }
    // 一旦選定就不能再重選啦，全部變成disabled(pointer-events: none;無法選擇)
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    
    // 答題後，顯示按鈕可跳至下一題
    next_btn.classList.add("show"); //show the next button if user selected any option
}

/*呈現測驗結果*/
function showResult(){
    // 隱藏 info &quiz
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 

    // 測驗結果中的文字
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");

    let scoreTag="";
    switch(true) {
        case userScore > 3:
            scoreTag = `<span>Congrats! 🎉 You`;
            break;

        case userScore > 1:
            scoreTag = `<span>Nice 😎 You`;
            break;

        case userScore >=0:
            scoreTag = `<span>Sorry 😐 You only`;
            break;
    }
    // console.log(scoreTag);
    let totalTag = ` got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag + totalTag;

    /*if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }*/
}