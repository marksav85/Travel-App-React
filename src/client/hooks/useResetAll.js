const useResetAll = () => {
  const resetAll = ({
    setCity,
    setDate,
    setTemperatureCelsius,
    setWeatherData,
    setErrorMessage,
    setWeatherCardStyle,
    setWeatherIcon,
    setSubmitted,
  }) => {
    setCity("");
    setDate("");
    setTemperatureCelsius(null);
    setWeatherData(null);
    setErrorMessage("");
    setWeatherCardStyle({});
    setWeatherIcon("");
    setSubmitted(false);
  };

  return resetAll;
};

export default useResetAll;
