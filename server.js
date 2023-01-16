const express = require('express');
const request = require('request');

const app = express();

app.get('/location', (req, res) => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const nominatimURL = `https://nominatim.org/reverse?format=json&lat=${lat}&lon=${lon}`;

            var headers = {
                'User-Agent': 'MyApp/1.0',
                'Referer': 'https://myapp.com',
                'token': '<your_token>'
            };

            request({ url: nominatimURL, headers: headers }, (err, response, body) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    const jsonBody = JSON.parse(body);
                    const address = jsonBody.address;
                    const lat = jsonBody.lat;
                    const lon = jsonBody.lon;
                    res.json({ address, lat, lon });
                }
            });
        },
        error => {
            res.status(500).send(error);
        }
    );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
