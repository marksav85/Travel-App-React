import express from "express";
import fetch from "node-fetch";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables from the .env file into process.env
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware for parsing incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data (form submissions)
app.use(bodyParser.json()); // Parse JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes

// ES Modules do not have __dirname, so must be computed manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (e.g., JavaScript, CSS, images) from the 'dist' directory
app.use(express.static(path.join(__dirname, "../../dist")));

// Set up the server to listen on a specified port
const port = process.env.PORT || 8000; // Use the port specified in environment variables or default to 8000
app.listen(port, () => {
  console.log(`Server started successfully: Server listening on port ${port}`);
});

// Store the API key from environment variables for later use
const apiKey = process.env.VITE_API_KEY;

// GET route to fetch weather data based on city and date
app.get("/weather", async (req, res) => {
  try {
    // Get city and date from query parameters, or use defaults if not provided
    const city = req.query.city || "Berlin";
    const date = req.query.date || new Date().toISOString().slice(0, 10);

    // Construct URL to fetch geocoding data (latitude and longitude) for the city
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    const geocodingResponse = await fetch(geocodingUrl);
    if (!geocodingResponse.ok) throw new Error("Geocoding API error"); // Handle API errors
    const geocodingData = await geocodingResponse.json();

    // Extract latitude and longitude from geocoding data
    const latitude = geocodingData[0]?.lat;
    const longitude = geocodingData[0]?.lon;

    // Check if valid latitude and longitude were returned
    if (!latitude || !longitude) throw new Error("Invalid city data");

    // Construct URL to fetch weather data using the latitude, longitude, and date
    const openWeatherUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${latitude}&lon=${longitude}&date=${date}&appid=${apiKey}`;
    const openWeatherResponse = await fetch(openWeatherUrl);
    if (!openWeatherResponse.ok) throw new Error("OpenWeather API error"); // Handle API errors
    const openWeatherData = await openWeatherResponse.json();

    // Send the fetched weather data as a JSON response
    res.json(openWeatherData);
  } catch (err) {
    console.error("Error fetching weather data:", err); // Log any errors to the console
    res.status(500).send("Internal Server Error"); // Send a generic error response to the client
  }
});

// GET route to fetch the city name based on user coordinates (latitude and longitude)
app.get("/user-location", async (req, res) => {
  try {
    // Extract latitude and longitude from query parameters
    const { lat, lon } = req.query;

    console.log(`Received coordinates: lat=${lat}, lon=${lon}`);

    // Validate that both latitude and longitude are provided
    if (!lat || !lon) {
      console.error("Latitude and longitude are missing in the request");
      return res.status(400).send("Latitude and longitude are required");
    }

    // Construct URL to perform reverse geocoding (convert coordinates to a city name)
    const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    console.log(
      `Calling reverse geocoding API with URL: ${reverseGeocodingUrl}`
    );

    // Fetch the reverse geocoding data from the API
    const reverseGeocodingResponse = await fetch(reverseGeocodingUrl);
    if (!reverseGeocodingResponse.ok) {
      console.error(
        `Reverse Geocoding API returned an error: ${reverseGeocodingResponse.statusText}`
      );
      throw new Error("Reverse Geocoding API error"); // Handle API errors
    }

    const reverseGeocodingData = await reverseGeocodingResponse.json();
    console.log("Reverse Geocoding API response:", reverseGeocodingData);

    // Extract the city name from the reverse geocoding data
    const cityName = reverseGeocodingData[0]?.name || "Unknown location";

    console.log(`Determined city name: ${cityName}`);

    // Send the city name as a JSON response
    res.json({ city: cityName });
  } catch (err) {
    console.error("Error fetching city name:", err); // Log any errors to the console
    res.status(500).send("Internal Server Error"); // Send a generic error response to the client
  }
});

// Serve the main HTML file (index.html) for all routes that don't match an API route
app.get("/*", (req, res) => {
  // The index.html file serves as the entry point for the front-end application
  const indexPath = path.join(__dirname, "../../dist", "index.html");
  res.sendFile(indexPath); // Send the index.html file as a response
});
