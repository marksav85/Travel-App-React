import { useState, useEffect } from "react";
import axios from "axios";

// Import weather icons for different conditions
import sunIcon from "/media/weather-icons/sun.svg";
import overcastIcon from "/media/weather-icons/overcast.svg";
import rainIcon from "/media/weather-icons/rain.svg";
import partCloudIcon from "/media/weather-icons/partly-cloudy-day.svg";
import partRainIcon from "/media/weather-icons/partly-cloudy-day-rain.svg";
import partSnowIcon from "/media/weather-icons/partly-cloudy-day-snow.svg";

import hotIcon from "/media/weather-icons/thermometers/thermometer-hot.svg";
import warmIcon from "/media/weather-icons/thermometers/thermometer-warm.svg";
import mildIcon from "/media/weather-icons/thermometers/thermometer-mild.svg";
import coldIcon from "/media/weather-icons/thermometers/thermometer-cold.svg";
import freezingIcon from "/media/weather-icons/thermometers/thermometer-freezing.svg";

// Function to determine the appropriate weather icon based on weather conditions
const getWeatherIcon = (cloudCover, rainfall, temperatureCelsius) => {
  if (cloudCover > 70 && rainfall <= 0.1) return overcastIcon; // Overcast weather
  if (cloudCover > 20 && rainfall <= 0.1) return partCloudIcon; // Partly cloudy weather
  if (cloudCover > 20 && rainfall > 0.1 && temperatureCelsius >= 0)
    return partRainIcon; // Partly cloudy with rain above freezing
  if (cloudCover > 20 && rainfall > 0.1 && temperatureCelsius < 0)
    return partSnowIcon; // Partly cloudy with snow below freezing
  if (rainfall >= 0.5) return rainIcon; // Rainy weather
  return sunIcon; // Default to sunny weather
};

// Function to determine the appropriate temperature icon based on temperature in Celsius
const getTempIcon = (temperatureCelsius) => {
  if (temperatureCelsius >= 30) return hotIcon; // Hot weather
  if (temperatureCelsius >= 20) return warmIcon; // Warm weather
  if (temperatureCelsius >= 10) return mildIcon; // Mild weather
  if (temperatureCelsius >= 0) return coldIcon; // Cold weather
  return freezingIcon; // Freezing weather
};

// Custom hook to fetch and process weather data
const useWeatherData = (city, date, submitted) => {
  // State to store the fetched weather data
  const [weatherData, setWeatherData] = useState(null);
  // State to store the temperature in Celsius
  const [temperatureCelsius, setTemperatureCelsius] = useState(null);
  // State to store the weather icon URL
  const [weatherIcon, setWeatherIcon] = useState("");
  // State to store the temperature icon URL
  const [tempIcon, setTempIcon] = useState("");
  // State to store any error messages
  const [errorMessage, setErrorMessage] = useState("");
  // State to track the loading status
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch weather data when the city, date, and submitted state change
  useEffect(() => {
    // Check if all required conditions are met to fetch weather data
    if (city && date && submitted) {
      const fetchWeather = async () => {
        try {
          setLoading(true); // Set loading state to true before starting the fetch
          setErrorMessage(""); // Clear any previous error messages

          const apiKey = import.meta.env.VITE_API_KEY; // API key for OpenWeatherMap

          // Fetch geocoding data to get latitude and longitude based on city name
          const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
          const geocodingResponse = await axios.get(geocodingUrl);
          const { lat, lon } = geocodingResponse.data[0]; // Extract latitude and longitude

          // Fetch weather data using latitude, longitude, and date
          const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${date}&appid=${apiKey}`;
          const weatherResponse = await axios.get(weatherUrl);
          const data = weatherResponse.data; // Extract weather data

          // Calculate the average temperature in Celsius
          const temperatureMin = data.temperature.min;
          const temperatureMax = data.temperature.max;
          const averageTemperature = (temperatureMin + temperatureMax) / 2;
          const tempCelsius = Math.round(averageTemperature - 273.15); // Convert Kelvin to Celsius
          setTemperatureCelsius(tempCelsius);

          // Determine the appropriate icons based on weather conditions
          const tempIcon = getTempIcon(tempCelsius);
          const cloudCover = data.cloud_cover.afternoon;
          const rainfall = data.precipitation.total;
          const weatherIcon = getWeatherIcon(cloudCover, rainfall, tempCelsius);

          // Update states with the fetched weather data and icons
          setWeatherData(data);
          setWeatherIcon(weatherIcon);
          setTempIcon(tempIcon);
          setErrorMessage(""); // Clear any previous error messages
        } catch (error) {
          setErrorMessage("Error fetching weather data"); // Set error message if fetching fails
        } finally {
          setLoading(false); // Set loading state to false once fetching is complete
        }
      };

      fetchWeather(); // Call the fetch function
    }
  }, [city, date, submitted]); // Dependencies to trigger the effect

  // Function to reset the weather data and related states
  const resetWeatherData = () => {
    setWeatherData(null);
    setTemperatureCelsius(null);
    setWeatherIcon("");
    setTempIcon("");
    setErrorMessage("");
  };

  // Return the weather data, icons, and states
  return {
    weatherData,
    temperatureCelsius,
    tempIcon,
    weatherIcon,
    errorMessage,
    loading,
    resetWeatherData,
  };
};

export default useWeatherData;
