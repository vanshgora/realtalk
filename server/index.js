const express = require('express');
const app = express();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.get('/', (req, res) => {
    try {
        res.send('Server is running');
    } catch (error) {
        console.log(error);
    }
}
);

app.listen(PORT, (err) => {
    if(err){
        console.log('Error in running server', err);
    } else {
        connectDB();
        console.log('Server is running on port', PORT);
    }
});