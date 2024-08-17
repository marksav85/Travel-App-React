import { useContext } from "react"; // Import the useContext hook to access context values
import WeatherContext from "../../context/WeatherContextProvider"; // Import the WeatherContext to get weather-related data
import Lottie from "lottie-react"; // Import Lottie for rendering animations
import travelAnimation from "../../../assets/travel-animation.json"; // Import the travel animation JSON for Lottie
import raindropIcon from "/media/weather-icons/raindrop.svg"; // Import raindrop icon
import cloudyIcon from "/media/weather-icons/cloudy.svg"; // Import cloudy icon

// Helper function to format date strings into a more human-readable format
const formatDate = (dateString) => {
  // Parse the provided date string into a JavaScript Date object
  const date = new Date(dateString);

  // Format the date into a readable string, e.g., "12 August 2024"
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

// The Weather component displays weather information based on the current context
const Weather = () => {
  // Destructure necessary values from WeatherContext using useContext hook
  const {
    city,
    getCloudCover,
    getRainfall,
    temperatureCelsius,
    weatherData,
    tempIcon,
    weatherIcon,
  } = useContext(WeatherContext);

  // If no weather data is available, render a loading animation
  if (!weatherData) {
    return (
      <div className="w-full h-600px max-w-md bg-white flex shadow-lg rounded-lg relative">
        {/* Render a Lottie animation while waiting for data */}
        <Lottie
          animationData={travelAnimation} // Use the travel animation
          height={200} // Set the height of the animation
          width={200} // Set the width of the animation
          loop={true} // Ensure the animation loops
          autoplay={true} // Autoplay the animation
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }} // Maintain aspect ratio
        />
      </div>
    );
  }

  // If weather data is available, render the weather information
  return (
    <div className="bg-white shadow-lg rounded-lg w-full max-w-md mx-auto h-600px">
      <div id="weather-card" className="flex flex-col">
        {/* Weather card header displaying the city name */}
        <div
          id="weather-header"
          className="bg-blue-500 text-white rounded-t-lg flex-shrink-0 p-4 lg:p-6"
        >
          {/* City name displayed in the header */}
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center">
            {city}
          </h2>
        </div>
        {/* Weather card body containing the weather details */}
        <div className="flex flex-col flex-grow">
          <div
            id="weather-card-body"
            className="flex-1 h-full p-6 text-blue-500 font-semibold"
          >
            <div id="weather-details" className="space-y-4">
              <div className="flex flex-col items-start">
                {/* Display the formatted date */}
                <div
                  id="weather-date"
                  className="weather-data flex justify-start text-lg md:text-xl lg:text-2xl"
                >
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center">
                    {formatDate(weatherData.date)}
                  </h2>
                </div>
              </div>
              <div>
                {/* Cloud cover display section */}
                <div className="flex flex-grow">
                  <div className="flex-1 text-lg md:text-xl lg:text-2xl">
                    {/* Cloudy icon */}
                    <img src={cloudyIcon} className="w-20 h-20" alt="Cloudy" />
                  </div>
                  <div
                    id="weather-clouds"
                    className="weather-data flex items-center flex-1 text-lg md:text-xl lg:text-2xl"
                  >
                    {/* Cloud cover percentage */}
                    {getCloudCover(weatherData.cloud_cover.afternoon)}
                  </div>
                </div>
                {/* Rainfall display section */}
                <div className="flex flex-grow">
                  <div className="flex-1 text-lg md:text-xl lg:text-2xl">
                    {/* Raindrop icon */}
                    <img
                      src={raindropIcon}
                      className="w-20 h-20"
                      alt="Raindrop"
                    />
                  </div>
                  <div
                    id="weather-rainfall"
                    className="weather-data flex items-center flex-1 text-lg md:text-xl lg:text-2xl"
                  >
                    {/* Total rainfall in mm */}
                    {getRainfall(weatherData.precipitation.total)}
                  </div>
                </div>
                {/* Temperature display section */}
                <div className="flex flex-grow">
                  <div className="flex-1 text-lg md:text-xl lg:text-2xl">
                    {/* Temperature icon */}
                    <img
                      src={tempIcon}
                      className="w-20 h-20"
                      alt="Temperature"
                    />
                  </div>
                  <div
                    id="weather-temperature"
                    className="weather-data flex items-center flex-1 text-lg md:text-xl lg:text-2xl"
                  >
                    {/* Temperature in Celsius */}
                    {temperatureCelsius}°C
                  </div>
                </div>
              </div>
              {/* Main weather icon display section */}
              <div className="flex flex-col h-full flex-grow">
                <div
                  id="weather-icon"
                  className="weather-data flex flex-col flex-1 items-center justify-center"
                >
                  {/* Weather condition icon */}
                  <img
                    src={weatherIcon}
                    alt="Weather icon"
                    className="w-48 h-48 mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
