import { useContext } from "react";
import WeatherContext from "../../context/WeatherContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";

const Destination = () => {
  const {
    city,
    setCity,
    setDate,
    handleUseCurrentLocation,
    setSubmitted,
    resetAll,
  } = useContext(WeatherContext); // Use WeatherContext

  // Function to set the date input to today's date
  const setToday = () => {
    const today = new Date().toISOString().slice(0, 10); // Format today's date as YYYY-MM-DD
    const dateInput = document.getElementById("travel-date");
    if (dateInput) {
      dateInput.value = today;
      setDate(today); // Update the context date state as well
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const city = event.target.city.value || "Berlin";
    const date = event.target["travel-date"].value;

    // Log the values being submitted
    console.log("Destination: City submitted:", city);
    console.log("Destination: Date submitted:", date);

    setCity(city);
    setDate(date);
    setSubmitted(true); // Update the submitted state in context
  };

  // Function to handle form reset
  const handleReset = () => {
    resetAll(); // Call resetAll function from context

    // Reset form fields
    const cityInput = document.getElementById("city");
    const dateInput = document.getElementById("travel-date");
    if (cityInput) cityInput.value = "";
    if (dateInput) dateInput.value = "";
  };

  return (
    <div
      id="destination-container"
      className="bg-white shadow-lg rounded-lg w-full max-w-md flex flex-col h-full"
    >
      <div
        id="destination-header"
        className="bg-blue-500 text-white rounded-t-lg flex-shrink-0 
                   p-2 md:p-4 lg:p-6"
      >
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Destination
        </h2>
      </div>
      <div id="destination-form-container" className="flex flex-col flex-grow">
        <div
          id="form-content"
          className="flex-grow flex items-center justify-center"
        >
          <div className="w-full max-w-md p-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="flex">
                <div className="flex-1">
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={city}
                    className="w-full text-sm lg:text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Destination e.g., Berlin"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="ml-2 mr-2"
                >
                  <FontAwesomeIcon icon={faLocationCrosshairs} />
                </button>
              </div>
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
                  />
                  <button
                    type="button"
                    onClick={setToday}
                    className="ml-2 mr-2"
                  >
                    <FontAwesomeIcon icon={faCalendarWeek} />
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white text-sm lg:text-base md:mt-2 lg:mt-4 p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
              {/* Reset Button */}
              <div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-red-500 text-white text-sm lg:text-base md:mt-2 lg:mt-4 p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          id="destination-footer"
          className="bg-gray-100 p-2 rounded-b-lg text-start text-sm text-gray-600 
                     md:p-3  lg:p-4"
        >
          <p>
            * Future forecast available for up to 1.5 years in the future
            <br />* Historical weather data available up until 40+ years in the
            past
          </p>
        </div>
      </div>
    </div>
  );
};

export default Destination;
