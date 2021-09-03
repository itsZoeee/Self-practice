/*
==========
Selector
==========
*/
// from & to 之 dropList
const dropList = document.querySelectorAll(".drop-list select"),
exchangeIcon = document.querySelector(".drop-list .icon")
getButton = document.querySelector("form button");

let fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
exahngeRate = document.querySelector(".exchange-rate"),
img = document.querySelectorAll("img");

const getExchangeRate = async() => {
    const amount = document.querySelector(".amount input"); // <input type="text" value="1" name="" id="">
    let amountVal = amount.value;
    // console.log(amountVal);

    if(amountVal == 0 || amountVal < 0){
        console.log("123");
        amount.value = 0.1;
        amountVal = 0.1;
    }

    // api之匯率資料
    let apiKey="3b103d61a1d4aa29699f3ff1afb73ee8";
    let apiUrl = `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`;
    let response = await fetch(apiUrl),
    data = await response.json(),
    ratesData = data.rates; // api中匯率的部分

    // 選定的兩種幣別
    let fromVal = fromCurrency.value,
    toVal = toCurrency.value;
    // 選定幣別間的匯率
    let selectedRate = ((ratesData[toVal])/(ratesData[fromVal])),
    selectedAmount = (selectedRate*amountVal).toFixed(4);
    //console.log(selectedRate);

    let exchangeTag = `${amountVal} ${fromVal} = ${selectedAmount} ${toVal}`;
    exahngeRate.innerHTML = exchangeTag;

    for(let i=0; i<img.length ;i++){
        // console.log(img)
        let countryName = (i == 0) ? countryList[fromVal]:countryList[toVal];
        
        // if (i == 0){
        //     img[0].setAttribute("src",`https://www.countryflags.io/${countryName}/flat/64.png`);
        // }
        // else{
        //     img[1].setAttribute("src",`https://www.countryflags.io/${countryName}/flat/64.png`);
        // }
        img[i].setAttribute("src",`https://www.countryflags.io/${countryName}/flat/64.png`);
    }
}
/*
==========
EventLisenter
==========
*/ 
window.addEventListener("load",e=>{
    getExchangeRate();
}) // 除了直接呼叫函示以外，也可於window加eventListener

// 跟著選擇的國家變動國旗
for(let i=0; i<img.length ;i++){
    dropList[i].addEventListener("click",e=>{
    // 選定的兩種幣別
    let fromVal = fromCurrency.value,
    toVal = toCurrency.value;

    for(let j=0; j<img.length ;j++){
        // console.log(img)
        let countryName = (j == 0) ? countryList[fromVal]:countryList[toVal];
        img[j].setAttribute("src",`https://www.countryflags.io/${countryName}/flat/64.png`);
    }
})}

getButton.addEventListener("click", e=>{
    e.preventDefault();
    getExchangeRate();
})

exchangeIcon.addEventListener("click",e=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    getExchangeRate();
})
/*
==========
Function
==========
*/ 
for(let i=0; i < dropList.length ;i++){
    for(currencyCode in countryList){
        // 預設為 TWD >> JPY
        let selected;
        if(i==0){
            selected = (currencyCode == "TWD") ? "selected":"";
        }else if(i==1){
            selected = (currencyCode == "JPY") ? "selected":"";
        }
        
        // 載入所有貨幣
        // console.log(currency_code);
        let optionTag=`<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
}


