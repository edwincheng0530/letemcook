const express = require('express');
let cors = require('cors');

const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const errorController = require('./controllers/error');

const app = express();
const ports = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
    next();
})

app.use('/users', userRoutes);


app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, () => {
    console.log(`Listening on port ${ports}`)
})

