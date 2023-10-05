document.getElementById("location-form").addEventListener("submit", getWeather);

const apiKey = "46f80a02ecae410460d59960ded6e1c6";

async function getWeather(e) {
  //   e.preventDefault();
  console.log("coming here");
  const location = document.getElementById("location-input").value;
  const error = document.getElementById("errorMsg");
  const city = document.getElementById("city-name");
  const actualTemp = document.getElementById("actual-temp");
  const weatherDesc = document.getElementById("description");
  const realFeel = document.getElementById("realFeel");
  const humidity = document.getElementById("humidity");
  const weatherData = document.getElementById("weather-data");

  await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
  ).then(async (res) => {
    const data = await res.json();
    // console.log(data);
    if (data.cod == 404) {
      error.classList.remove("none");
      error.classList.add("error");
      console.log(data);
      if (!weatherData.classList.contains("none")) {
        weatherData.classList.add("none");
      }
    } else {
      if (!error.classList.contains("none")) {
        error.classList.add("none");
      }
      if (weatherData.classList.contains("none")) {
        weatherData.classList.remove("none");
      }
      document.getElementById("location-input").value = "";
      const temp = Math.floor(data.main.temp);
      const feel = Math.floor(data.main.feels_like);
      city.innerHTML = `${location}`;
      actualTemp.innerHTML = `${temp}&deg; C`;
      weatherDesc.innerHTML = `${data.weather[0].main}`;
      realFeel.innerHTML = `${feel}&deg; C`;
      humidity.innerHTML = `${data.main.humidity}%`;
      console.log(data);
    }
  });
}
