require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());

const allowedOrigins = [
    'http://localhost:5173',
    'https://ahouse74.github.io',
    'https://capstone-server-production.up.railway.app'
]

app.use(cors({ origin: allowedOrigins }));

const animalRoutes = require('./routes/animals');
app.use('/api/animals', animalRoutes);

app.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => console.error('DB connection failed:', err));