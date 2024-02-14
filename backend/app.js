const express = require('express')

const app = express()
const mongoose = require('mongoose')
const testRoutes = require('./routes/test')
const podcastRoutes = require('./routes/podcast')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
const cardRoutes = require('./routes/card')
const chatgptRoutes = require('./routes/chatgpt')
const promptiaRoutes = require('./routes/promptia')

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
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)
app.use('/api/card', cardRoutes)
app.use('/api/chatgpt', chatgptRoutes)
app.use('/api/promptia', promptiaRoutes)

module.exports = app