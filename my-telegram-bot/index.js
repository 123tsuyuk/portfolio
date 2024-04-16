const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // You can use any port that is free on your system

// Replace with your actual token and chat ID
const TELEGRAM_API = `https://api.telegram.org/bot7060741021:AAGSqbOTz3A2vTASIONsNQo0WEqtiwhvKfM/sendMessage`;
const CHAT_ID2 = '5540085604';
const CHAT_ID = '7168436504';

app.use(cors()); // This will enable CORS for all routes
app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    const text = `你有一封來自${name}的心郵件
     電子郵箱: ${email}
     消息内容: ${message}`;

    // Prepare both requests
    const requestOne = axios.post(TELEGRAM_API, {
        chat_id: CHAT_ID,
        text: text
    });

    const requestTwo = axios.post(TELEGRAM_API, {
        chat_id: CHAT_ID2,
        text: text
    });

    // Send both requests in parallel
    Promise.all([requestOne, requestTwo])
        .then(responses => {
            console.log('Messages sent to both chats');
            res.send('Message sent successfully to both chats!');
        })
        .catch(error => {
            console.error('Failed to send message: ', error);
            res.status(500).send('Failed to send message');
        });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});