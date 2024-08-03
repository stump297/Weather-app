const Key = 'e5e0ae10ea57a4b5d58bfa3d3dfe819a'
const search = document.getElementById('searchButton')
const todayWeather = document.getElementById('todaysWeather')
const fiveDayWeather = document.getElementById('5dayWeather')

function runWeatherApi() {
    const userInput = document.getElementById('search').value
    weatherAPI(userInput);
}

function displayWeather(){
    todayWeather.style.border = "2px black"
    todayWeather.style.width = "auto"
    todayWeather.style.marginRight = "20%"
    todayWeather.style.alignContent = "center"
    todayWeather.style.fontSize = "25pt"
    todayWeather.style.float = "right"
    todayWeather.style.borderRadius = "12px"
    
}

const weatherAPI = function (city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&cnt=10&units=imperial`)
    .then((res)=>{
        console.log(res)
        return res.json()
    }).then((data)=>{
        console.log(data) 
        console.log(data.main.temp)
        console.log(data.wind.speed)
        console.log(data.main.humidity)
        console.log(data.temp)
        function runDisplayWeather(){
            const cityDisplayWeather= document.createElement('h2')
            const temp = document.createElement('h3')
            const wind = document.createElement('h3')
            const humidity = document.createElement('h3');
            citydisplayWeather.innerText = city
            temp.innerText = `Temp: ${data.main.temp}f`
            wind.innerText = `Wind Speed: ${data.wind.speed}mph`
            humidity.innerText = `Humidity: ${data.main.humidity}%`
            todayWeather.appendChild(cityDisplayWeather)
            todayWeather.appendChild(temp)
            todayWeather.appendChild(wind)
            todayWeather.appendChild(humidity)

        }
       
     
     
    }) 
    if (!runWeatherApi) {
        console.error('input invalid');
        return;
    }
    localStorage.setItem(city,'storedData')
}
search.addEventListener('click',runWeatherApi)


