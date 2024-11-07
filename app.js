
let colors = document.querySelectorAll(".color");
let body = document.querySelector("body");
let search = document.querySelector(".search");
let locationBtn = document.querySelector("#currentLocation");

const apiKey = "13acafc387895c97f24733949f0fd616";

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

locationBtn.addEventListener("click", function () {
    search.style.visibility = "hidden";
    weatherReport.style.visibility = "visible";
});

backToSearchBtn.addEventListener("click", function () {
    search.style.visibility = "visible";
    weatherReport.style.visibility = "hidden";
})

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log('Error:', error);
        });
}
let city;
let submit = document.querySelector("input");
submit.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && submit.value != "") {
        search.style.visibility = "hidden";
        weatherReport.style.visibility = "visible";
        city = submit.value;
        requestApi(city);
        console.log(city);

    }
});

api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
