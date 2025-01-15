
let colors = document.querySelectorAll(".color");
let body = document.querySelector("body");
let search = document.querySelector(".search");
let locationBtn = document.querySelector("#currentLocation");
let weatherIcon = document.querySelector(".weatherIcon");

const apiKey = "cf143052475e2f08ded73f2bca911704";

let currentTheam;

function backgroundColour() {
    currentTheam = this.style.backgroundColor;
    body.style.backgroundColor = currentTheam;
    search.style.backgroundColor = currentTheam;
    locationBtn.style.backgroundColor = currentTheam;
}

for (color of colors) {
    color.addEventListener("click", backgroundColour);
}

let weatherReport = document.querySelector(".weatherReport");
let backToSearchBtn = document.querySelector(".backArrow");


backToSearchBtn.addEventListener("click", function () {
    search.style.visibility = "visible";
    weatherReport.style.visibility = "hidden";
    submit.value = "";
})

let city;
let da;
async function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            da =data;
        })
        .catch(error => {
            console.log('Error:', error);
        });
        console.log(da);
        document.querySelector(".location").innerHTML = da.name;
        document.querySelector(".weather").innerHTML = da.weather[0].main;
        if (da.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloud.svg";
          } else if (da.weather[0].main == "Clear") {
            weatherIcon.src = 'images/clear.png';
          } else if (da.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
          } else if (da.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
          } else if (da.weather[0].main == "Mist") {
            weatherIcon.src = 'images/mist.png';
          }
        document.querySelector(".num").innerHTML = da.main.temp;
        document.querySelector(".feel").innerHTML = da.main.feels_like;
        document.querySelector(".humid").innerHTML = da.main.humidity +"%";
        document.querySelector(".windSpeed").innerHTML = da.wind.speed +"m/sec"; 

}

let submit = document.querySelector("input");

submit.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && submit.value != "") {
        search.style.visibility = "hidden";
        weatherReport.style.visibility = "visible";
        city = submit.value;
        requestApi(city);
    }
});


locationBtn.addEventListener("click", function () {
    search.style.visibility = "hidden";
    weatherReport.style.visibility = "visible";
});

locationBtn.addEventListener("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByLocation(latitude, longitude);
            },
            error => {
                console.error("Error getting location:", error.message);
                alert("Unable to fetch location. Please enable location services.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function fetchWeatherByLocation(lat, lon) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(api)
        .then(response => response.json())
        .then(data => {
            updateWeatherReport(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error.message);
        });
}

function updateWeatherReport(data) {
    search.style.visibility = "hidden";
    weatherReport.style.visibility = "visible";
    document.querySelector(".location").innerHTML = data.name;
    document.querySelector(".weather").innerHTML = data.weather[0].main;
    if (da.weather[0].main == "Clouds") {
        weatherIcon.src = "images/cloud.svg";
      } else if (da.weather[0].main == "Clear") {
        weatherIcon.src = 'images/clear.png';
      } else if (da.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (da.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (da.weather[0].main == "Mist") {
        weatherIcon.src = 'images/mist.png';
      }
    document.querySelector(".num").innerHTML = data.main.temp;
    document.querySelector(".feel").innerHTML = data.main.feels_like;
    document.querySelector(".humid").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".windSpeed").innerHTML = `${data.wind.speed} m/sec`;
}
