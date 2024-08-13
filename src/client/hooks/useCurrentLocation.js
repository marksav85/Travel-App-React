import { useState } from "react";

// Custom hook to get the user's current location and fetch the corresponding city name
const useCurrentLocation = (baseUrl, setCity) => {
  // State to store any error messages encountered during the process
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle the process of using the user's current location
  const handleUseCurrentLocation = async () => {
    // Check if the browser supports Geolocation API
    if (navigator.geolocation) {
      // Attempt to get the current position of the user
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Destructure the latitude and longitude from the position object
          const { latitude, longitude } = position.coords;

          try {
            // Make a request to the server to fetch the city name based on latitude and longitude
            const response = await fetch(
              `${baseUrl}/user-location?lat=${latitude}&lon=${longitude}`
            );

            // Check if the response is not OK (e.g., status code 404 or 500)
            if (!response.ok) throw new Error("Error fetching city name");

            // Parse the JSON response
            const data = await response.json();

            // Update the city state with the fetched city name
            setCity(data.city);
          } catch (error) {
            // If there's an error during the fetch process, update the errorMessage state
            setErrorMessage(error.message);
          }
        },
        (error) => {
          // If there's an error getting the user's location, update the errorMessage state
          setErrorMessage(error.message);
        }
      );
    } else {
      // If the browser does not support Geolocation, set an appropriate error message
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  // Return the function to handle location fetching and any error messages
  return { handleUseCurrentLocation, errorMessage };
};

export default useCurrentLocation;
