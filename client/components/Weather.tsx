// ... (your imports)

import { useState } from 'react'
import '../main.css'
function WeatherApp() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(false)

  const handleSearch = async () => {
    const APIKey = ''

    if (city === '') return

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const json = await response.json()

      if (json.cod === '404') {
        setError(true)
        setWeatherData(null)
      } else {
        setError(false)
        setWeatherData(json)
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setError(true)
      setWeatherData(null)
    }
  }

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return 'clear'
      case 'Rain':
        return 'rain'
      case 'Snow':
        return 'snow'
      case 'Clouds':
        return 'cloud'
      case 'Haze':
        return 'mist'
      default:
        return ''
    }
  }

  return (
    <div className="container">
      <div className="search-box">
        <i className="fa-solid fa-location-dot"></i>
        <input
          type="text"
          placeholder="Enter your location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="fa-solid fa-magnifying-glass"
          onClick={handleSearch}
        ></button>
      </div>

      {error && (
        <div className="not-found">
          <img src="images/404.png" alt="not-found" />
          <p>Oops! Invalid location :/</p>
        </div>
      )}

      {weatherData && (
        <>
          <div className="weather-box">
            <img
              src={`images/${getWeatherIcon(weatherData.weather[0].main)}.png`}
              alt="weather-icon"
            />
            <p className="temperature">
              {parseInt(weatherData.main.temp)}
              <span>°C</span>
            </p>
            <p className="description">{weatherData.weather[0].description}</p>
          </div>

          <div className="weather-details">
            <div className="humidity">
              <i className="fa-solid fa-water"></i>
              <div className="text">
                <span>{weatherData.main.humidity}%</span>
                <p>Humidity</p>
              </div>
            </div>
            <div className="wind">
              <i className="fa-solid fa-wind"></i>
              <div className="text">
                <span>{parseInt(weatherData.wind.speed)}Km/h</span>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ... (your helper function)

export default WeatherApp
