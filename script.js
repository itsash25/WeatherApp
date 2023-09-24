// Get references to HTML elements
const form = document.querySelector('form');
const input = document.querySelector('#inp');
const weatherIcon = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

// API key and base URL
const apiKey = '647552991a2936afda994419d9940b8e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// Function to make the API request
const getWeatherData = async (city) => {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    // Update weather information on the page
    // weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    cityElement.textContent = data.name;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} km/h`;

    if(data.weather[0].main=="Clouds"){
        weatherIcon.src="images/clouds.png"
    }
    else if(data.weather[0].main=="Clear"){
        weatherIcon.src="images/clear.png"
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src="images/rain.png"
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="images/drizzle.png"
    }
    else if(data.weather[0].main=="Mist"){
        weatherIcon.src="images/mist.png"
    }
  } 
  
  
  catch (error) {
    console.error('Error fetching weather data:', error.message);
    // You can display an error message to the user here.
  }
};

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission
  const cityName = input.value.trim();
  if (cityName !== '') {
    getWeatherData(cityName);
    input.value = ''; // Clear the input field
  }
});
