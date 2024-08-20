const apiKey = 'ec9c9427be5442c1b0602352241808'
// Get the modal element


const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOuput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.getElementById('weather-icon')
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const cities = document.querySelectorAll('.city');
const searchResults = document.getElementById('searchResults');
const searchResultsContainer = document.getElementById('searchResults-container')
const changeTemp = document.getElementById('fahrenheit');
const tempSwitch = document.querySelectorAll('input[name="btnradio"]');

let cityInput = "London";

const hideSearchResults = () => {
    searchResultsContainer.style.display = searchResults.innerHTML === '' ? 'none' : 'block';
};

//Hide search container on page load
hideSearchResults();

const fetchData = (url) => {
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
};


function getTemperature(data) {
    return changeTemp.checked ? data.current.temp_f + "&#176;" : data.current.temp_c + "&#176;";
};

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData(cityInput);
        app.style.opacity = "0";
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityInput = search.value.trim();

    if(cityInput.length == 0) {
        alert('Please type in a city name');
    } else {
        fetchSearchResults(search.value);
    }
})

//Update app on temperature change
tempSwitch.forEach(radio => {
    radio.addEventListener('change', () => {
        fetchWeatherData(cityInput);
    })
})

const fetchSearchResults = (query) => {
    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;
    fetchData(url).then(data => displaySearchResults(data));
};


//
function displaySearchResults(results) {
    searchResults.innerHTML ='';

    results.forEach((result) => {

        const resultItem = document.createElement('li');
        resultItem.classList.add('result-item');
        resultItem.textContent = `${result.name}, ${result.country}`;
        resultItem.addEventListener('click', () => {
            cityInput = result.name;
            fetchWeatherData(cityInput);
            hideSearchResults();
            searchResults.innerHTML = '';
            search.value = '';
        });
        searchResults.appendChild(resultItem);
    })
    hideSearchResults();
}


function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return weekday[new Date(`${year}/${month}/${day}`).getDay()]
};

function fetchWeatherData(cityInput) {

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}`;
    fetchData(url).then(data => {

        temp.innerHTML = getTemperature(data);
        conditionOutput.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        const y = parseInt(date.substr(0,4));
        const m = parseInt(date.substr(5,2));
        const d = parseInt(date.substr(8,2));
        const time = date.substr(11);

        dateOuput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = data.location.name;

        //Change weather icon based on condition output
        //if condition output = sunny
        //change icon and condition innerhtml to <i class="ph ph-sun"></i> and "sunny"

       // Change weather icon based on condition output
       const condition = data.current.condition.text.toLowerCase();

        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.gust_mph + " mph";

        let timeOfDay = "day";

        if(!data.current.is_day) {
            timeOfDay = "night";
        }

        // Update background image and weather icon based on the condition
        if (data.current.condition.code == 1000) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
            icon.className = "ph ph-sun";
            //If condition is clear and night
            if (timeOfDay === "night") {
                icon.className = "ph ph-moon-stars";
            }
        } else if (
            [1006, 1009, 1030, 1069, 1087, 1135, 1273, 1279, 1282].includes(data.current.condition.code)
        ) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
            icon.className = "ph ph-cloud";
        } else if (data.current.condition.code == 1003) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
            icon.className = "ph ph-cloud-sun";

            if (timeOfDay === "night") {
                icon.className = "ph ph-cloud-moon";
            }
        } else {
            app.style.backgroundImage = `url(./images/${timeOfDay}/rain.jpg)`;
            icon.className ="ph ph-cloud-rain";
        }

        app.style.opacity = "1";  
    })
}

fetchWeatherData(cityInput);