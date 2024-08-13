import { useState } from "react";

// Custom hook to manage form state and handle form submission
const useForm = () => {
  // State variables for city and date input fields
  const [city, setCity] = useState(""); // State to store the city entered by the user
  const [date, setDate] = useState(""); // State to store the date entered by the user

  // Function to handle form submission
  const handleSubmit = (event, fetchWeatherData) => {
    event.preventDefault(); // Prevent the default form submission behavior (which would cause a page reload)

    // Call the fetchWeatherData function with the current city and date values
    // This function is expected to be passed as an argument when the hook is used
    fetchWeatherData(city, date);
  };

  // Return an object containing the state variables and functions to manage the form
  return {
    city, // The current value of the city input field
    setCity, // Function to update the city state when the user types in the city input field
    date, // The current value of the date input field
    setDate, // Function to update the date state when the user selects a date
    handleSubmit, // Function to handle form submission, including preventing default behavior and triggering the weather data fetch
  };
};

export default useForm;
