const key ='f21400b2b4f25088aecae41ff08ca0ef'; //API金鑰

/* const baseURL='http://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=f21400b2b4f25088aecae41ff08ca0ef';

fetch(baseURL)
    .then((data)=>{console.log('response', data.json())})
    .catch((error)=>{
        console.log(error);
    }) */

const requestCity = async(city)=>{
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    //寫成下面更好，const query = '?q=' + city +'&appid=' + key;
    const query = `?q=${city}&appid=${key}`;   //跟上一行對照著看，只要是非字串(變數/參數)就加${}

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    if(response.status !== 200){
        throw new Error('nothing found');
    }
    //promise data
    const data = await response.json();
    //console.log(data);
    return data;

}

