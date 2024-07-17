const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6ca69a908f395e78cfc70e40709a5190&units=metric";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            const htmlContent = `
                <html>
                    <head>
                        <style>
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: Arial, sans-serif;
                            background-color: #7ae0e9;
                        }
                        
                        .weather-container {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            padding: 20px;
                        }
                        
                        .city-name {
                            font-size: 36px;
                            margin-bottom: 10px;
                            color: #333;
                        }
                        
                        .weather-info {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        
                        .weather-icon {
                            width: 100px;
                            height: 100px;
                            margin-right: 20px;
                        }
                        
                        .weather-details {
                            text-align: left;
                        }
                        
                        .weather-description {
                            font-size: 24px;
                            margin-bottom: 10px;
                            color: #555;
                        }
                        
                        .temperature {
                            font-size: 48px;
                            color: #333;
                        }
                        
                        </style>
                    </head>
                    <body>
                        <div class="weather-container">
                            <h1 class="city-name">${city}</h1>
                            <div class="weather-info">
                                <img src="${imageURL}" alt="Weather Icon" class="weather-icon">
                                <div class="weather-details">
                                    <p class="weather-description">${weatherDescription}</p>
                                    <p class="temperature">${temp}°C</p>
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
            `;
            res.send(htmlContent);
        });
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
