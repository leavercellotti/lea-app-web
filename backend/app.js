const express = require('express')

const app = express()
const mongoose = require('mongoose')
const testRoutes = require('./routes/test')
const podcastRoutes = require('./routes/podcast')

require('dotenv').config();

const MONGODB_URL=process.env.MONGODB_URL
mongoose.connect(
    MONGODB_URL,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
      .then(() => console.log('Connexion à MongoDB réussie !'))
      .catch(() => console.log('Connexion à MongoDB échouée !')
);



app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/api/test', testRoutes)
app.use('/api/podcast', podcastRoutes)

module.exports = app