import Destination from "./destination/Destination";
import Weather from "./weather/Weather";
import travelCamper from "/media/travel_camper.jpg";

export default function MainView() {
  return (
    <div
      className="w-full flex h-[80vh] justify-center space-x-6 p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${travelCamper})` }}
    >
      <Destination />
      <Weather />
    </div>
  );
}
