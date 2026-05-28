// importando as dependências
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// pegando a connection string do arquivo .env
const mongoUri = process.env.MONGO_URI;

// conectando ao MongoDB
mongoose.connect(mongoUri)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((error) => { console.error('Error connecting to MongoDB:', error); });

    