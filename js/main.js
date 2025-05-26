const OPENWEATHER_API = "1e3e8f230b6064d27976e41163a82b77";

// 🌍 Grab user's current position
navigator.geolocation.getCurrentPosition(async (position) => {
  try {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // 🔍 Reverse geo to get city
    const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPENWEATHER_API}`);
    const geoData = await geoRes.json();
    const cityName = geoData[0]?.name || "Unknown";

    // 📦 Grab forecast data
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${OPENWEATHER_API}&units=metric`;
    const weatherRes = await fetch(forecastURL);
    const weatherData = await weatherRes.json();

    updateCurrentWeather(weatherData);
    renderForecast(weatherData);
  } catch (err) {
    console.error("Oops! Something went wrong while fetching weather 🌩️", err);
    alert("Please enable location access and refresh.");
  }
});

// ☀️ Update today's weather
function updateCurrentWeather(data) {
  const city = data.city.name;
  const mainInfo = data.list[0];

  document.getElementById("location-title").textContent = city;
  document.getElementById("temp-readout").textContent = Math.round(mainInfo.main.temp) + "°C";
  document.getElementById("weather-summary").textContent = capitalize(mainInfo.weather[0].description);
  document.getElementById("humidity").textContent = mainInfo.main.humidity;
  document.getElementById("feels-like").textContent = Math.round(mainInfo.main.feels_like);

  document.getElementById("low-today").textContent = Math.round(mainInfo.main.temp_min) + "°";
  document.getElementById("high-today").textContent = Math.round(mainInfo.main.temp_max) + "°";
  document.getElementById("desc-today").textContent = capitalize(mainInfo.weather[0].description);

  const icon = mapIcon(mainInfo.weather[0].main);
  document.getElementById("main-icon").src = icon;
  document.getElementById("today-icon").src = icon;
}

// 📅 Render 6-day forecast
function renderForecast(data) {
  const days = {};
  const forecastEl = document.getElementById("forecast-container");
  forecastEl.innerHTML = "";

  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    const day = new Date(date).getDay();
    const dayLabel = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day];

    if (!days[date]) {
      days[date] = {
        label: dayLabel,
        temp: Math.round(item.main.temp) + "°",
        mood: capitalize(item.weather[0].description),
        icon: mapIcon(item.weather[0].main),
      };
    }
  });

  Object.values(days).forEach(day => {
    const card = document.createElement("div");
    card.className = "forecast-card";

    card.innerHTML = `
      <div class="day-label">${day.label}</div>
      <img src="${day.icon}" class="forecast-icon" />
      <div class="forecast-temp">${day.temp}</div>
      <div class="forecast-desc">${day.mood}</div>
    `;

    forecastEl.appendChild(card);
  });
}

// 🎨 Choose icon based on weather
function mapIcon(type) {
  const condition = type.toLowerCase();
  if (condition.includes("rain")) return "img/rain.png";
  if (condition.includes("clear")) return "img/sun.png";
  if (condition.includes("snow")) return "img/snow.png";
  if (condition.includes("cloud") || condition.includes("smoke")) return "img/cloud.png";
  if (condition.includes("mist") || condition.includes("fog")) return "img/mist.png";
  if (condition.includes("haze")) return "img/haze.png";
  if (condition.includes("thunder")) return "img/thunderstorm.png";
  return "img/sun.png";
}

// ✨ Capitalize words
function capitalize(str) {
  return str.split(" ").map(s => s[0].toUpperCase() + s.slice(1)).join(" ");
}
