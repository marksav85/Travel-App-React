import { useState } from "react";

const useForm = () => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event, fetchWeatherData) => {
    event.preventDefault();
    fetchWeatherData(city, date);
  };

  return {
    city,
    setCity,
    date,
    setDate,
    handleSubmit,
  };
};

export default useForm;
