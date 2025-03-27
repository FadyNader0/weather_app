async function get_weather(current_location){
    try{

        let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a70e4561442a41dca2e14401252703&q=${current_location}&days=1`);
        let data = await res.json()
        show_data(data)
    }catch(error){
        console.error(error)
    }
}


async function get_weather_in_search(location){
    try{
        let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a70e4561442a41dca2e14401252703&q=${location}&days=1`);
        let data = await res.json()
        show_data(data)
    }catch(error){
        console.error(error)
        alert("No location found")
    }
}


function get_location(){

    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let current_location = (`${lat},${lon}`)
        get_weather(current_location)        
    }
    function error() {
        alert("❌ Unable to retrieve location");
    }
}


function format_date(date) {
    let options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-GB', options); 
}


function show_data(data){ 
    let forecast = data.forecast.forecastday[0].hour;
    let temp_6am = forecast.find(hour => hour.time.includes("06:00")).temp_c;
    let temp_9am = forecast.find(hour => hour.time.includes("09:00")).temp_c;
    let temp_12pm = forecast.find(hour => hour.time.includes("12:00")).temp_c;
    let temp_3pm = forecast.find(hour => hour.time.includes("15:00")).temp_c;
    let temp_6pm = forecast.find(hour => hour.time.includes("18:00")).temp_c;
    let temp_9pm = forecast.find(hour => hour.time.includes("21:00")).temp_c;
    weather_container.innerHTML = `        
            <div class="header">${data.location.name}, ${data.location.country}</div>
            <div class="date">${format_date(new Date(data.location.localtime))}</div>
            <div class="weather-des d-flex">
                <div class="temp-degree">
                    <div class="num d-flex">
                        <div class="weather-icon"><img src="https:${data.current.condition.icon}" alt="Weather Icon"></div>
                        <div class="temperature">${data.current.temp_c}&deg;
                            <div class="description">${data.current.condition.text}</div>
                        </div>
                    </div>
                </div>
                <div class="info d-flex">
                    <div class="info-num">${data.forecast.forecastday[0].day.maxtemp_c}&deg;
                        <p>High</p>
                    </div>
                    <div class="info-num">${data.forecast.forecastday[0].day.mintemp_c}&deg;
                        <p>Low</p>
                    </div>
                    <div class="info-num">${data.current.wind_mph}mph
                        <p>Wind</p>
                    </div>
                    <div class="info-num">${data.forecast.forecastday[0].day.daily_chance_of_rain}% 
                        <p>Rain</p>
                    </div>
                </div>
            </div>
            <div class="sun-info">
                <div>☀️ ${data.forecast.forecastday[0].astro.sunrise} Sunrise</div>
                <div>🌇 ${data.forecast.forecastday[0].astro.sunset} Sunset</div>
            </div>
            <div class="forecast">
                <div class="time">6am<br>${temp_6am}&deg;</div>
                <div class="time">9am<br>${temp_9am}&deg;</div>
                <div class="time">12pm<br>${temp_12pm}&deg;</div>
                <div class="time">3pm<br>${temp_3pm}&deg;</div>
                <div class="time">6pm<br>${temp_6pm}&deg;</div>
                <div class="time">9pm<br>${temp_9pm}&deg;</div>
            </div>
        `
}





