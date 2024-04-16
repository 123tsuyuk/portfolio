const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // You can use any port that is free on your system

// Replace with your actual token and chat ID
const TELEGRAM_API = `https://api.telegram.org/bot7060741021:AAGSqbOTz3A2vTASIONsNQo0WEqtiwhvKfM/sendMessage`;
//const CHAT_ID = '5540085604';
const CHAT_ID = '7168436504';

app.use(cors()); // This will enable CORS for all routes
app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    const text = `New message from ${name}, Email: ${email}, Message: ${message}`;

    axios.post(TELEGRAM_API, {
        chat_id: CHAT_ID,
        text: text
    }).then(response => {
        console.log('Message sent');
        res.send('Message sent successfully!');
    }).catch(error => {
        console.error('Failed to send message: ', error);
        res.status(500).send('Failed to send message');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});