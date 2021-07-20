const searchForm = document.querySelector('.search-loaction');
const cityValue = document.querySelector('.search-loaction input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');

//溫度：攝氏華氏轉換，加 round
const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}

//白天/夜晚? (動態更動圖示)，
const isDayTime = (icon)=>{
    if (icon.includes('d')){ //依照API傳來物件中的icon字眼(d)，判斷當地是早上/夜晚
        return true;
    }else{
        return false;
    }
}

updateWeatherApp = (city) =>{
    const imageName = city.weather[0].icon; //API傳來的物件中，weather>0>icon的號碼(可以抓取到相對應的icon)
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;  //放入icon號碼，以url取得該icon
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-mid row">
            <div class="col-8 text-center temp">
              <span>${spitOutCelcius(city.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
              <p class="condition">${city.weather[0].description}</p>
              <p class="high">${spitOutCelcius(city.main.temp_max)}&deg;C</p>
              <p class="low">${spitOutCelcius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>
          <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="" />
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>${spitOutCelcius(city.main.feels_like)}&deg;C</p>
              <span>Feels Like</span>
            </div>
            <div class="col text-center">
              <p>${city.main.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
    `;

    //白天/夜晚? (動態更動圖示)
    if(isDayTime(imageName)){
        timeImage.setAttribute('src','img/giphy.gif');
        //cityName.classList.add('text-black'); //讓字變成黑色的
        if (cityName.classList.contains('text-white')){
            cityName.classList.remove('text-white');
        }else{
            cityName.classList.add('text-black');
        }
        
    }else{
        timeImage.setAttribute('src','img/night_image.png');
        //cityName.classList.add('text-white'); //讓字變成白色的
        if (cityName.classList.contains('text-black')){
            cityName.classList.remove('text-black');
        }else{
            cityName.classList.add('text-white');
        }
    }

    cardInfo.classList.remove('d-none'); //移除display-none
}

function errorOccur(){
    const cardContent = document.querySelector('#cardContent');
    cardContent.textContent = "Please type in again"
    setTimeout(() => {
       cardContent.style.display = 'none'; 
    }, 2000);
}

/*
==========
add eventListener：
接收輸入框的文字+獲取API中的資料
==========
*/
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const citySearched =cityValue.value.trim();
    console.log(citySearched);
    searchForm.reset();  //submit後，input清除原搜尋字串

    requestCity(citySearched)   //在request.js中使用fetch()
        .then((data) => {       //fetch()後面會接then()(這是 Promise 的特性)
            updateWeatherApp(data);
        })
        .catch((error)=>{
            console.log('error',error);
            errorOccur();
        })

})