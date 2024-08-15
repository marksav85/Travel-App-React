import { useContext } from "react"; // Import the useContext hook from React
import WeatherContext from "../../context/WeatherContextProvider"; // Import the WeatherContext to access the weather data and functions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon for icons
import {
  faLocationCrosshairs,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const Destination = () => {
  // Destructure necessary values from the WeatherContext using useContext hook
  const {
    city,
    setCity,
    setDate,
    handleUseCurrentLocation,
    submitted,
    setSubmitted,
    resetAll,
    weatherRef,
  } = useContext(WeatherContext);

  // Function to set the date input to today's date
  const setToday = () => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in the format YYYY-MM-DD
    const dateInput = document.getElementById("travel-date");
    if (dateInput) {
      dateInput.value = today; // Set the date input value to today's date
      setDate(today); // Update the date state in the context
    }
  };

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const city = event.target.city.value || "Berlin"; // Get the city from the input or default to "Berlin"
    const date = event.target["travel-date"].value; // Get the date from the input

    // Log the city and date being submitted
    console.log("Destination: City submitted:", city);
    console.log("Destination: Date submitted:", date);

    setCity(city); // Update the city in the context
    setDate(date); // Update the date in the context
    setSubmitted(true); // Mark the form as submitted in the context

    if (weatherRef.current) {
      weatherRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle the form reset
  const handleReset = () => {
    resetAll(); // Call the resetAll function from the context to reset all data

    // Reset the form fields
    const cityInput = document.getElementById("city");
    const dateInput = document.getElementById("travel-date");
    if (cityInput) cityInput.value = ""; // Clear the city input field
    if (dateInput) dateInput.value = ""; // Clear the date input field
  };

  return (
    <div
      id="destination-container"
      className="bg-white shadow-lg rounded-lg w-full max-w-md flex flex-col h-600px"
    >
      {/* Header section of the destination form */}
      <div
        id="destination-header"
        className="bg-blue-500 text-white rounded-t-lg flex-shrink-0 p-2 md:p-4 lg:p-6"
      >
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Destination
        </h2>
      </div>

      {/* Form container */}
      <div id="destination-form-container" className="flex flex-col flex-grow">
        <div
          id="form-content"
          className="flex-grow flex items-center justify-center"
        >
          <div className="w-full max-w-md p-4">
            {/* Destination form */}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {/* City input field */}
              <div className="flex">
                <div className="flex-1">
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={city} // Bind the city input field to the city state in context
                    onChange={(event) => {
                      if (!submitted) {
                        // Only allow changes if the form has not been submitted
                        setCity(event.target.value);
                      }
                    }}
                    className="w-full text-sm lg:text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Destination e.g., Berlin"
                    required
                  />
                </div>
                {/* Button to use the current location */}
                <button
                  type="button"
                  onClick={handleUseCurrentLocation} // Use current location when clicked
                  className="ml-2 mr-2"
                  disabled={submitted} // Disable the button if the form has been submitted
                >
                  <FontAwesomeIcon icon={faLocationCrosshairs} />{" "}
                  {/* Location icon */}
                </button>
              </div>

              {/* Date input field */}
              <div>
                <label
                  htmlFor="travel-date"
                  className="block text-sm lg:text-base md:mt-4 font-medium text-gray-700 mb-1"
                >
                  Date of travel:
                </label>
                <div className="flex">
                  <input
                    type="date"
                    id="travel-date"
                    name="travel-date"
                    className="w-full text-sm md:text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={submitted} // Disable the date input if the form has been submitted
                  />
                  {/* Button to set the date to today */}
                  <button
                    type="button"
                    onClick={setToday} // Set the date to today when clicked
                    className="ml-2 mr-2"
                    disabled={submitted} // Disable the button if the form has been submitted
                  >
                    <FontAwesomeIcon icon={faCalendarWeek} />{" "}
                    {/* Calendar icon */}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white text-sm lg:text-base md:mt-2 lg:mt-4 p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>

              {/* Reset button */}
              <div>
                <button
                  type="button"
                  onClick={handleReset} // Reset the form when clicked
                  className="w-full bg-red-500 text-white text-sm lg:text-base md:mt-2 lg:mt-4 p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer with information about the weather data */}
        <div
          id="destination-footer"
          className="bg-gray-100 p-2 rounded-b-lg text-start text-sm text-gray-600 md:p-3 lg:p-4"
        >
          <div>
            <p>
              i. Future forecast available for up to 1.5 years in the future
            </p>
            <p>
              ii. Historical weather data available up until 40+ years in the
              past
            </p>
            <p>
              iii. Temperature, cloud, and rainfall are measured as averages
              throughout the day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
