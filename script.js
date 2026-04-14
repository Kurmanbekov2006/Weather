const apiKey = "252a1bf971b43674cbfafcc119c3fd6f";

const btn = document.getElementById("searchBtn");
const geoBtn = document.getElementById("geoBtn");
const input = document.getElementById("cityInput");
const box = document.getElementById("weatherBox");

btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) getWeatherByCity(city);
});

geoBtn.addEventListener("click", getWeatherByLocation);

// 🔍 Поиск по городу
async function getWeatherByCity(city) {
  showLoader();

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      showError("Город не найден ❌");
      return;
    }

    renderWeather(data);
  } catch {
    showError("Ошибка сети ❌");
  }
}

// 📍 Геолокация
function getWeatherByLocation() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    showLoader();

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );

      const data = await res.json();
      renderWeather(data);
    } catch {
      showError("Ошибка геолокации ❌");
    }
  });
}

// 🎨 Отображение
function renderWeather(data) {
  box.innerHTML = `
    <h2>${data.name}</h2>
    <img class="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    <p>${data.main.temp}°C</p>
    <p>${data.weather[0].description}</p>
  `;
}

// ⏳ Лоадер
function showLoader() {
  box.innerHTML = "Загрузка...";
}

// ❌ Ошибка
function showError(msg) {
  box.innerHTML = msg;
}