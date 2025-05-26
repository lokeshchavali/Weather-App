const API_KEY = "1e3e8f230b6064d27976e41163a82b77";
const inputField = document.querySelector(".search-input");
const resultCard = document.querySelector(".result-card");
const errorBox = document.querySelector(".search-error");
const hintBox = document.querySelector(".search-hint");

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    showResults(data);
  } catch (err) {
    resultCard.classList.add("hidden");
    hintBox.classList.add("hidden");
    errorBox.classList.remove("hidden");
  }
}

function showResults(data) {
  document.querySelector(".city-name").textContent = data.name;
  document.querySelector(".temp-now").textContent = Math.round(data.main.temp) + "°C";
  document.querySelector(".wind").textContent = Math.round(data.wind.speed) + " m/s";
  document.querySelector(".pressure").textContent = data.main.pressure + " hPa";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".sunrise").textContent = convertTime(data.sys.sunrise);
  document.querySelector(".sunset").textContent = convertTime(data.sys.sunset);

  const icon = mapIcon(data.weather[0].main);
  document.querySelector(".weather-icon").src = icon;

  resultCard.classList.remove("hidden");
  errorBox.classList.add("hidden");
  hintBox.classList.add("hidden");
}

function convertTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function mapIcon(condition) {
  const weather = condition.toLowerCase();
  if (weather.includes("rain")) return "img/rain.png";
  if (weather.includes("clear")) return "img/sun.png";
  if (weather.includes("snow")) return "img/snow.png";
  if (weather.includes("cloud")) return "img/cloud.png";
  if (weather.includes("mist") || weather.includes("fog")) return "img/mist.png";
  if (weather.includes("haze")) return "img/haze.png";
  if (weather.includes("thunder")) return "img/thunderstorm.png";
  return "img/sun.png";
}

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchWeather(inputField.value.trim());
  }
});
