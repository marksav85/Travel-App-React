import { useState } from "react";

const useCurrentLocation = (baseUrl, setCity) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleUseCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `${baseUrl}/user-location?lat=${latitude}&lon=${longitude}`
            );
            if (!response.ok) throw new Error("Error fetching city name");
            const data = await response.json();
            setCity(data.city);
          } catch (error) {
            setErrorMessage(error.message);
          }
        },
        (error) => {
          setErrorMessage(error.message);
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  return { handleUseCurrentLocation, errorMessage };
};

export default useCurrentLocation;
