require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT | 5000;
const router = require('./route/route');
const error = require('./middleware/error');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(error);

app.listen(port, () => {
    console.log(`Server running port: ${port}`);
});