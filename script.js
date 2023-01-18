const CAT_URL = "https://api.thecatapi.com/v1/images/search";
const DAD_JOKE_URL = "https://dad-jokes.p.rapidapi.com/joke/type/programming";

const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");

async function setBodyBackground() {
  const response = await fetch(`${CAT_URL}?breed_id=bsho`);
  const data = await response.json();

  const imageURL = data[0].url;

  document.body.style.backgroundImage = `url(${imageURL})`;
}

async function setDadJoke() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "656988e759msh965d741728fd9d9p1431cfjsn5d58aa789645",
      "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
    },
  };
  const response = await fetch(`${DAD_JOKE_URL}`, options);
  const data = await response.json();

  const randomJoke = data.body[Math.floor(Math.random() * (18 - 0) + 0)];

  const setupTxt = randomJoke.setup;
  const punchlineTxt = randomJoke.punchline;

  setupEl.textContent = setupTxt;
  punchlineEl.textContent = punchlineTxt;
}

setBodyBackground();
setDadJoke();
