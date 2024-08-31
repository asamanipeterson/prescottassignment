function searchWeather(){
    const apiKey='7eb2e263a00bfe1152dbfd8fe2eb8426';
    const city = document.getElementById('city').value;
    if(!city){
        alert('please enter a city');
        return;
    }
    const currentwetherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentwetherUrl)
    .then(response => response.json())
    .then(data =>{
        displayWeather(data);
    }) 
    .catch(error =>{
        console.error('Error fetching current weather data',error);
        alert('Error fetching current weather data.Please  try again.');
    });
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
}

function displayWeather(data){
    const tempDiv =document.getElementById('temp-div');
    const weatherInfoDiv =document.getElementById('weather-info');
    const weatherIcon =document.getElementById('weather-icon');
    const hourlyForecastDiv =document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDiv.innerHTML = '';

    if(data.cod==='404'){
        weatherInfoDiv.innerHTML =`<p>${data.message}</p>`;
    }else{
       const cityName =data.name;
       const temperature = Math.round(data.main.temp-273.15) ;
       const description=data.weather[0].description;
       const iconCode = data.weather[0].icon;
       const iconUrl =`https://openweathermap.org/img/wn/${iconCode}@4x.png`;
       const temperatureHTML =`
       <p>${temperature}°C</p>
       `;
       const weatherHTML =`
       <p>${cityName}</p>
       <p>${description}}</p>
       `;
       tempDiv.innerHTML =temperatureHTML;
       weatherInfoDiv.innerHTML = weatherHTML;
       weatherIcon.src =iconUrl;
       weatherIcon.alt = description;
       showImage();
    }
    function displayHourlyForecast(hourlyData){
       const hourlyForecastDiv =document.getElementById('hourly-forecast');
       const next24Hours =hourlyData.slice(0,8);
       next24Hours.forEach(item=>{
        const dateTime = new Date(item.dt*1000);
        const hour =dateTime.getHours();
        const temperature = Math.round(item.main.temp-273.15) ;
        const iconCode = data.weather[0].icon;
        const iconUrl =`https://openweathermap.org/img/wn/${iconCode}.png`;
        const hourlyItemHtml =`
        <div>
        <span>${hour}:00</span>
        <img src ="${iconUrl}" alt =" Hourly Weather Icon">
        </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
       });
    }
}

function showImage(){
    const weatherIcon =document.getElementById('weather-icon');
    weatherIcon.style.display ='block';
}