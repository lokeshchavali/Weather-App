const backendURL = "http://localhost:5000/api/cities"; // Change to deployed backend URL if needed
const worldApiKey = "1e3e8f230b6064d27976e41163a82b77";

const input = document.getElementById("city-input");
const addBtn = document.getElementById("add-btn");
const cityCards = document.getElementById("city-cards");
const errorMsg = document.querySelector(".error-message");
const addedMsg = document.querySelector(".added-message");
const toggleUnitBtn = document.getElementById("toggle-unit");

let useCelsius = true;
let cityDataList = [];

toggleUnitBtn.addEventListener("click", () => {
  useCelsius = !useCelsius;
  renderCities();
});

addBtn.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city) return;
  input.value = "";

  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${worldApiKey}&units=metric`
    );
    if (!weatherRes.ok) throw new Error("Invalid city");

    const weatherData = await weatherRes.json();
    const name = weatherData.name;

    const checkExists = cityDataList.find(c => c.name === name);
    if (checkExists) return;

    const saveRes = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    if (!saveRes.ok) throw new Error("Failed to save city");

    fetchCities(); // Refresh list
    addedMsg.classList.remove("hidden");
    setTimeout(() => addedMsg.classList.add("hidden"), 2000);
  } catch {
    errorMsg.classList.remove("hidden");
    setTimeout(() => errorMsg.classList.add("hidden"), 2000);
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

async function fetchCities() {
  const res = await fetch(backendURL);
  const cities = await res.json();
  cityDataList = cities;
  renderCities();
}

async function renderCities() {
  cityCards.innerHTML = "";
  for (const city of cityDataList) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${worldApiKey}&units=metric`
      );
      if (!res.ok) continue;

      const data = await res.json();
      const card = createCityCard(data, city._id);
      cityCards.appendChild(card);
    } catch (err) {
      console.error("Error loading city:", city.name, err);
    }
  }
}

function createCityCard(data, cityId) {
  const tempC = Math.round(data.main.temp);
  const tempF = Math.round((tempC * 9) / 5 + 32);
  const localTime = new Date((data.dt + data.timezone) * 1000)
    .toUTCString()
    .split(" ")[4];

  const card = document.createElement("div");
  card.className = "city-card";

  card.innerHTML = `
    <div class="card-header">
      <h3>${data.name}</h3>
      <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    </div>
    <img class="weather-icon" src="${mapIcon(data.weather[0].main)}" alt="icon" />
    <p class="temperature">${useCelsius ? `${tempC}°C` : `${tempF}°F`}</p>
    <p class="condition">${data.weather[0].description}</p>
    <p class="local-time">🕒 Local Time: ${localTime}</p>
  `;

  const delBtn = card.querySelector(".delete-btn");
  delBtn.addEventListener("click", async () => {
    await fetch(`${backendURL}/${cityId}`, { method: "DELETE" });
    fetchCities(); // Refresh
  });

  return card;
}

function mapIcon(weather) {
  const val = weather.toLowerCase();
  if (val.includes("rain")) return "img/rain.png";
  if (val.includes("clear")) return "img/sun.png";
  if (val.includes("snow")) return "img/snow.png";
  if (val.includes("cloud") || val.includes("smoke")) return "img/cloud.png";
  if (val.includes("mist") || val.includes("fog")) return "img/mist.png";
  if (val.includes("haze")) return "img/haze.png";
  if (val.includes("thunder")) return "img/thunderstorm.png";
  return "img/sun.png";
}

// Load cities on startup
fetchCities();
