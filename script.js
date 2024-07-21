// Get the name from the URL path (e.g., /JohnDoe)
const pathParts = window.location.pathname.split('/');
const name = pathParts[1]; // Extract the name from the second part

// Get the current hour (0-23)
const currentHour = new Date().getHours();

// Determine the greeting based on the time
let greeting = "";
if (currentHour < 12) {
  greeting = "Good morning";
} else if (currentHour < 18) {
  greeting = "Good afternoon";
} else {
  greeting = "Good evening";
}

// Display the personalized greeting (centered)
document.getElementById("greeting").textContent = `${greeting}, ${name}!`; 

// Get the current time
const currentTime = new Date().toLocaleTimeString();

// Create a div for time display (top-left)
const timeDisplay = document.createElement("div");
timeDisplay.textContent = currentTime;
timeDisplay.style.position = "absolute";
timeDisplay.style.top = "10px"; // Adjust as needed
timeDisplay.style.left = "10px"; // Adjust as needed
timeDisplay.style.fontSize = "1.2em"; // Optional styling
timeDisplay.style.fontWeight = "bold";

// Append the time display to the body
document.body.appendChild(timeDisplay);


// Function to get temperature, and location
async function getTempLocation() {
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key

  try {
    const locationResponse = await fetch('https://ipapi.co/json/');
    const locationData = await locationResponse.json();

    const city = locationData.city;
    const region = locationData.region;

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherResponse.json();
    

    const temperature = `${weatherData.main.temp.toFixed(1)}°C`;

        // Create a div for temperature and location (top-right)
    const timeTempContainer = document.createElement("div");
    timeTempContainer.id = "timeTempContainer";
    timeTempContainer.innerHTML = `

      <p>${temperature}</p>
      <p>${city}, ${region}</p>
    `;
    timeTempContainer.style.position = "absolute";
    timeTempContainer.style.top = "10px";
    timeTempContainer.style.right = "10px";
    timeTempContainer.style.textAlign = "right";
    timeTempContainer.style.fontSize = "1.2em"; // Optional styling
    timeTempContainer.style.fontWeight = "bold";

    // Append to the body
    document.body.appendChild(timeTempContainer);

  } catch (error) {
    console.error("Error fetching location or weather data:", error);
    // Handle errors (e.g., display an error message)
  }
}

getTempLocation(); // Call the function on page load

