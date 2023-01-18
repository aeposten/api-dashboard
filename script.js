const URL = "https://api.thecatapi.com/v1/images/search";
const KEY =
  "live_BvivPUxBGDhdkvo0Xk0P5Ji4jjoLSQtqmeUjE3UePkpKpg0y8d7c3CdTN5Ae2te2";

async function setBodyBackground() {
  const response = await fetch(`${URL}?breed_id=bsho`);
  const data = await response.json();

  const imageURL = data[0].url;

  document.body.style.backgroundImage = `url(${imageURL})`
}



setBodyBackground();