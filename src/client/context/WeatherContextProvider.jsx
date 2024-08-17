import { createContext, useState } from "react";
import PropTypes from "prop-types";
import useWeatherData from "../hooks/useWeatherData";
import useCurrentLocation from "../hooks/useCurrentLocation";

// Create a Context for the weather-related data and actions
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  // State to store the selected city
  const [city, setCity] = useState("");

  // State to store the selected date
  const [date, setDate] = useState("");

  // State to track whether the form has been submitted
  const [submitted, setSubmitted] = useState(false);

  // Use the custom hook to fetch and manage weather data
  const {
    weatherData, // Contains the fetched weather data
    getCloudCover, // Function to determine cloud cover based on data
    getRainfall, // Function to determine rainfall based on data
    temperatureCelsius, // Contains the temperature in Celsius
    tempIcon, // Contains the icon representing the temperature
    weatherIcon, // Contains the icon representing the weather condition
    errorMessage, // Stores any error messages encountered during data fetching
    resetWeatherData, // Function to reset weather-related state
  } = useWeatherData(city, date, submitted);

  // Use the custom hook to handle getting the user's current location
  const { handleUseCurrentLocation } = useCurrentLocation(setCity);

  // Function to reset all state variables to their initial values
  const resetAll = () => {
    setCity(""); // Reset the city state to an empty string
    setDate(""); // Reset the date state to an empty string
    setSubmitted(false); // Reset the submitted state to false
    resetWeatherData(); // Reset all weather-related state using the hook's reset function

    console.log("Data reset"); // Log a message to indicate that the reset was successful
  };

  return (
    // Provide the weather-related state and actions to any components that consume this context
    <WeatherContext.Provider
      value={{
        city, // The currently selected city
        date, // The currently selected date
        setCity, // Function to update the city state
        setDate, // Function to update the date state
        getCloudCover, // Function to determine cloud cover based on data
        getRainfall, // Function to determine rainfall based on data
        temperatureCelsius, // The current temperature in Celsius
        weatherData, // The fetched weather data
        errorMessage, // Any error messages encountered
        weatherIcon, // Icon representing the weather condition
        tempIcon, // Icon representing the temperature
        handleUseCurrentLocation, // Function to get and set the user's current location
        submitted, // Tracks whether the form has been submitted
        setSubmitted, // Function to update the submitted state
        resetAll, // Function to reset all states to their initial values
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// Type-checking for the component's props using PropTypes
WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired, // The child components that will be wrapped by this provider
};

export default WeatherContext;
