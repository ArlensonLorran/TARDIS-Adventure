// importando as dependências
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();
const postRoutes = require("./routes/postRoutes");

app.use(cors({
  origin: 'https://tardis-adventure-nh7t.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use("/api/auth", require("./routes/auth"));
app.use(express.json());
app.use("/api/posts", postRoutes);

// pegando a connection string do arquivo .env
const mongoUri = process.env.MONGO_URI;

// conectando ao MongoDB
mongoose.connect(mongoUri)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((error) => { console.error('Error connecting to MongoDB:', error); });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    