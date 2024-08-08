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
const port = process.env.PORT || 8000; // Updated to use standard PORT env variable
app.listen(port, () => {
  console.log(`Server started successfully: Server listening on port ${port}`);
});

// Store environment variable API key in a variable
const apiKey = process.env.VITE_API_KEY;

// GET route to fetch weather data
app.get("/weather", async (req, res) => {
  try {
    const city = req.query.city || "Berlin";
    const date = req.query.date || new Date().toISOString().slice(0, 10);

    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    const geocodingResponse = await fetch(geocodingUrl);
    if (!geocodingResponse.ok) throw new Error("Geocoding API error");
    const geocodingData = await geocodingResponse.json();

    const latitude = geocodingData[0]?.lat;
    const longitude = geocodingData[0]?.lon;

    if (!latitude || !longitude) throw new Error("Invalid city data");

    const openWeatherUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${latitude}&lon=${longitude}&date=${date}&appid=${apiKey}`;
    const openWeatherResponse = await fetch(openWeatherUrl);
    if (!openWeatherResponse.ok) throw new Error("OpenWeather API error");
    const openWeatherData = await openWeatherResponse.json();

    res.json(openWeatherData);
  } catch (err) {
    console.error("Error fetching weather data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Fetch city name from user coordinates
app.get("/user-location", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    console.log(`Received coordinates: lat=${lat}, lon=${lon}`);

    if (!lat || !lon) {
      console.error("Latitude and longitude are missing in the request");
      return res.status(400).send("Latitude and longitude are required");
    }

    const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    console.log(
      `Calling reverse geocoding API with URL: ${reverseGeocodingUrl}`
    );

    const reverseGeocodingResponse = await fetch(reverseGeocodingUrl);
    if (!reverseGeocodingResponse.ok) {
      console.error(
        `Reverse Geocoding API returned an error: ${reverseGeocodingResponse.statusText}`
      );
      throw new Error("Reverse Geocoding API error");
    }

    const reverseGeocodingData = await reverseGeocodingResponse.json();
    console.log("Reverse Geocoding API response:", reverseGeocodingData);

    const cityName = reverseGeocodingData[0]?.name || "Unknown location";

    console.log(`Determined city name: ${cityName}`);

    res.json({ city: cityName });
  } catch (err) {
    console.error("Error fetching city name:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Serve the main HTML file for all routes
app.get("/*", (req, res) => {
  const indexPath = path.join(__dirname, "../../dist", "index.html");
  res.sendFile(indexPath);
});
