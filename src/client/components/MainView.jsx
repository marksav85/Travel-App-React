// src/client/components/MainView.js
import { useRef, useEffect, useContext } from "react";
import WeatherContext from "../context/WeatherContextProvider";
import Destination from "./destination/Destination";
import Weather from "./weather/Weather";
import travelCamper from "/media/travel_camper.jpg";

export default function MainView() {
  const { submitted } = useContext(WeatherContext); // Access the submitted state from context
  const weatherRef = useRef(null); // Create a ref for the Weather component

  useEffect(() => {
    if (submitted && weatherRef.current) {
      weatherRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [submitted]);

  return (
    <div
      className="flex flex-col md:flex-row w-full h-full justify-center items-center space-y-6 md:space-y-0 md:space-x-6 p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${travelCamper})` }}
    >
      <Destination />
      <div className="w-full max-w-md" ref={weatherRef}>
        <Weather />
      </div>
    </div>
  );
}
