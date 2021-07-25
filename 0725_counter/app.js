// set initial count
let count = 0;

// select value and buttons
const value = document.querySelector('#value');
const btns = document.querySelectorAll('.btn');
//console.log(btns); // NodeList(3)


// 若有同性質的按鈕，可以SelectorAll，然後統一利用foreach來做監聽，這樣就不用寫三個eventListener哩!!
btns.forEach(function(eachBtn){
    // console.log(eachBtn); // 每個btn印出自己標籤<button class="btn increase">increase</button>
    eachBtn.addEventListener('click',function(e){
        // console.log(e.currentTarget.classList); // DOMTokenList(2) ["btn", "decrease", value: "btn decrease"]
        const styles = e.currentTarget.classList;
        
        if(styles.contains('decrease')){
            count -- ;
        }
        else if(styles.contains('increase')){
            count ++ ;
        }
        else{
            count = 0 ;
        }

        if(count>0){value.style.color = 'green';}
        else if(count<0){value.style.color = 'red';}
        else{value.style.color = '#222';}
        value.textContent = count; // 或.innerText
    })
});