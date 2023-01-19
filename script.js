const CAT_URL = "https://api.thecatapi.com/v1/images/search";
const DAD_JOKE_URL = "https://dad-jokes.p.rapidapi.com/joke/type/programming";
const FIN_URL = "https://finnhub.io/api/v1/";

const FIN_KEY = "cf48klaad3i94dsnolugcf48klaad3i94dsnolv0";

const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const stockPrice = document.getElementById("stock-price");

const timeEl = document.getElementById("current-time");

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
}

function setCurrentTime() {
  const date = new Date();
  const time = date.toLocaleTimeString();

  timeEl.textContent = time;
  setTimeout(setCurrentTime, 1000);
}

setCurrentTime();
fetchStockPrice();
setBodyBackground();
setDadJoke();
