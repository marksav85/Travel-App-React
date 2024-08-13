import Destination from "./destination/Destination";
import Weather from "./weather/Weather";
import travelCamper from "/media/travel_camper.jpg";

export default function MainView() {
  return (
    <div
      className="flex flex-col md:flex-row w-full h-full justify-center items-center space-y-6 md:space-y-0 md:space-x-6 p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${travelCamper})` }}
    >
      <Destination />
      <Weather />
    </div>
  );
}
