import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to get the user's current location and fetch the corresponding city name
const useCurrentLocation = (setCity) => {
  // State to store the user's coordinates (latitude and longitude)
  const [coords, setCoords] = useState(null);

  // State to store the city name fetched from the API based on coordinates
  const [city, setCityState] = useState("");

  // State to track the loading status while fetching data
  const [loading, setLoading] = useState(false);

  // State to store any error messages encountered during fetching
  const [errorMessage, setErrorMessage] = useState("");

  // Function to fetch the city name based on latitude and longitude coordinates
  const fetchCityFromCoordinates = async (latitude, longitude) => {
    try {
      setLoading(true); // Set loading state to true before starting the fetch
      setErrorMessage(""); // Clear any previous error messages

      const apiKey = import.meta.env.VITE_API_KEY; // API key for OpenWeatherMap
      // Construct the reverse geocoding API URL with the coordinates and API key
      const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      // Perform the API request to get the city name based on coordinates
      const response = await axios.get(reverseGeocodingUrl);

      // Set the city state with the fetched city name, or "Unknown location" if no name is found
      setCityState(response.data[0]?.name || "Unknown location");
    } catch (error) {
      // Set an error message if the API request fails
      setErrorMessage("Error fetching city name");
    } finally {
      setLoading(false); // Set loading state to false once fetching is complete
    }
  };

  // Function to handle the process of using the user's current location
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      // If geolocation is supported, get the current position of the user
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;

          // Store the coordinates in state
          setCoords({ latitude, longitude });

          // Fetch the city name based on the obtained coordinates
          fetchCityFromCoordinates(latitude, longitude);
        },
        (error) => {
          // Set an error message if there is an issue getting the geolocation
          setErrorMessage(error.message);
        }
      );
    } else {
      // Set an error message if geolocation is not supported by the browser
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  // Effect hook to update the city state whenever the city name from the API changes
  useEffect(() => {
    if (city) {
      // Update the parent component with the city name by calling the provided setCity function
      setCity(city);
    }
  }, [city, setCity]);

  // Return an object with functions and state variables to be used by the component
  return {
    handleUseCurrentLocation, // Function to initiate location fetching
    errorMessage, // Error message if an issue occurs
    loading, // Loading status while fetching data
  };
};

export default useCurrentLocation;
