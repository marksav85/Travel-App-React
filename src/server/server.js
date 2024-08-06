// Import required modules
import express from "express";
import fetch from "node-fetch";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Get the directory name in an ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "../../dist")));

// Setup Server
const port = import.meta.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started successfully: Server listening on port ${port}`);
});

// Store environment variable API key in a variable
const apiKey = import.meta.env.VITE_API_KEY;

// GET route to fetch weather data
app.get("/weather", async (req, res) => {
  try {
    // Obtain city name from user input or default to Berlin
    const city = req.query.city || "Berlin";
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().slice(0, 10);
    const date = req.query.date || currentDate;
    console.log(currentDate);

    // Geocoding API request to obtain latitude and longitude from city name
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    const geocodingResponse = await fetch(geocodingUrl);
    const geocodingData = await geocodingResponse.json();
    console.log(geocodingData);

    // Extract latitude and longitude from the Geocoding API response
    const latitude = geocodingData[0].lat;
    const lat = latitude.toFixed(0);
    const longitude = geocodingData[0].lon;
    const lon = longitude.toFixed(0);

    // OpenWeather API request using the obtained latitude and longitude
    const openWeatherUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${date}&appid=${apiKey}`;
    console.log(openWeatherUrl);
    const openWeatherResponse = await fetch(openWeatherUrl);
    const openWeatherData = await openWeatherResponse.json();
    res.json(openWeatherData);
  } catch (err) {
    console.log("Error fetching weather data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Serve the main HTML file for all routes
app.get("/*", (req, res) => {
  const indexPath = path.join(__dirname, "../../dist", "index.html");
  res.sendFile(indexPath);
});
