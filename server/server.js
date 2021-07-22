const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const colors = require('colors');
const cors = require('cors');

// Route Files
const main = require('./routes/main');


// DB Connection
const db = require('./config/keys').MongoURI;
// Connect MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('MongoDB Connected'.green.bold) )
    .catch(err => console.log(err));


const app = express();

app.use(cors());
app.use(express.json());

// Routing for API Service
app.use('/api/v1/main', main);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));