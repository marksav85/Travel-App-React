# Travel Weather App

## Overview

The **Travel Weather App** is a React-based application that allows users to check the weather for a specific city on a chosen date. It provides weather information, including temperature, cloud cover, and rainfall, and displays relevant weather and temperature icons. Users can also use their current location to fetch weather data automatically.

## Features

- **Weather Information**: Fetches and displays weather details including temperature, cloud cover, and rainfall for a specified city and date.
- **Location-Based Weather**: Allows users to use their current location to automatically set the city for weather queries.
- **Dynamic Icons**: Displays weather and temperature icons based on the current conditions and temperature.
- **Date Selection**: Users can choose a specific travel date or use today's date as a default.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Axios**: HTTP client for making API requests to fetch weather data.
- **Node.js**: Runtime environment for executing server-side code.
- **Vite**: Build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vercel**: Deployment platform for hosting the React app.
- **Lottie**: Animation library for interactive animations.
- **FontAwesome**: Icon library used for interactive buttons.

## Installation

1. **Clone the repository**:
   git clone https://github.com/marksav85/Travel-App-React.git
   cd travel-app-react
2. **Install dependencies:**:
   npm install
3. **Set up environment variables:**:
   i. Visit [OpenWeatherMap](https://openweathermap.org/api) and obtain an API key for _One Call API 3.0_
   ii. Create a .env file in the root directory and add the following environment variables:
   iii. VITE*API_KEY=\_your_One_Call_api_key_here*

4. **Start the development server:**:
   npm run dev

## Usage

**Enter a City and Date**: Use the form to input a city and travel date, then click "Submit" to fetch weather data.
**Use Current Location**: Click the location icon to automatically set the city based on your current location.
**Reset**: Use the "Reset" button to clear the form and reset the application state.

## Acknowledgements

**OpenWeatherMap**: For weather data API.
**Lottie**: For interactive animations.
**FontAwesome**: For iconography.
