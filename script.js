const CAT_URL = "https://api.thecatapi.com/v1/images/search";
const DAD_JOKE_URL = "https://dad-jokes.p.rapidapi.com/joke/type/programming";
const FIN_URL = "https://finnhub.io/api/v1/";
const WEATHER_URL = "https://api.openweathermap.org/data/3.0/"

const FIN_KEY = "cf48klaad3i94dsnolugcf48klaad3i94dsnolv0";
const WEATHER_KEY = "ae4264ba6c3b182846c5a48feb87fff8"

const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const stockPrice = document.getElementById("stock-price");
const iconDiv = document.getElementById("weather-icon")
const tempDiv = document.getElementById("current-temp")

const timeEl = document.getElementById("current-time");
const dateEl = document.getElementById("current-date");


async function setBodyBackground() {
  try {
    const response = await fetch(`${CAT_URL}?breed_id=bsho`);
    const data = await response.json();
    const imageURL = data[0].url;
    document.body.style.backgroundImage = `url(${imageURL})`;
  } catch (error) {
    console.error(error);
  }
}

async function setDadJoke() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "656988e759msh965d741728fd9d9p1431cfjsn5d58aa789645",
      "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(`${DAD_JOKE_URL}`, options);
    const data = await response.json();

    const randomJoke = data.body[Math.floor(Math.random() * (18 - 0) + 0)];

    const setupTxt = randomJoke.setup;
    const punchlineTxt = randomJoke.punchline;

    setupEl.textContent = setupTxt;
    punchlineEl.textContent = punchlineTxt;
  } catch (error) {
    console.error(error);
  }
}

async function fetchStockPrice() {
  const response = await fetch(`${FIN_URL}quote?symbol=AAPL&token=${FIN_KEY}`);
  const data = await response.json();
  const currentPrice = data.c;

  stockPrice.textContent = `APPL: $ ${currentPrice}`;
  setTimeout(fetchStockPrice, 3600000);
}

function setCurrentTime() {
  const time = new Date().toLocaleTimeString("en-us", {
    timeStyle: "medium",
  });

  timeEl.textContent = time;
  setTimeout(setCurrentTime, 1000);
}

function setCurrentDate() {
  const date = new Date().toLocaleDateString();

  dateEl.textContent = date;
  setTimeout(setCurrentDate, 86400000);
}

function setLocation() {
  navigator.geolocation.getCurrentPosition(renderWeather)
  setTimeout(setLocation, 3600000);
}

async function renderWeather(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const response = await fetch(`${WEATHER_URL}onecall?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}`);
  const data = await response.json();

  iconDiv.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" class="weather-icon"/>
  `

  let fahrenheit = Math.floor((data.current.temp - 273) * (9/5) + 32)

  tempDiv.textContent = `${fahrenheit}º`;
}

setLocation();
setCurrentTime();
setCurrentDate();
fetchStockPrice();
setBodyBackground();
setDadJoke();
