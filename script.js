// Get the modal element
const modal = document.getElementById("searchModal");

// Get the button that opens the modal
const btn = document.querySelector(".submit");

// Get the <span> element that closes the modal
const span = document.querySelector(".close");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "flex"; // Use flex to center the modal
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Optional: Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOuput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.clout');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('locationInput');
const search = document.querySelector('.search');
const cities = document.querySelectorAll('.city');

let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;

        fetchWeatherData();
        app.style.opacity = "0";
    })
})

form.addEventListener('submit', (e) => {
    if(search.value.length == 0) {
        alert('Please type in a city name');
    } else {
        cityInput = search.value;

        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }

    e.preventDefault();
})

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

    return weekday[new Date(`${day}/${month}/${year}`).getDay()]
};

function fetchWeatherData() {

    fetch(`https://www.weatherapi.com/v1/current.json?key=ec9c9427be5442c1b0602352241808=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        const y = parseInt(date.substr(0,4));
        const m = parseInt(date.substr(5,2));
        const d = parseInt(date.substr(8,2));
        const itme = date.substr(11);

        dateOuput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;
        
        nameOutput.innerHTML = data.location.name;

        const iconId = data.current.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64x64/".length
        );

        icon.src = "./icon" + iconId;

        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.humidity + "km/h";

        let timeOfDay = "day";

        const code = data.current.condition.conde;

        if(!data.current.is_day) {
            timeOfDay = "night";
        }

        if(code == 1000) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/stars.jpg)`;

            btn.style.background = "#e5ba92";
            if(timeOfDay == "night") {
                btn.style.background = "#181e27";
            }
        } else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1279 ||
            code == 1282
        ) {
            app.style.backgroundImage = `url(./image/${timeOfDay}/cloudy.jpg)`;
        }
        app.style.opacity ="1";
        
    })
    .catch(() => {
        alert("City not found.");
        app.style.opacity = "1";
    })
}

fetchWeatherData();