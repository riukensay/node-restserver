require('./config/config.js');

const express = require('express')
const app = express();
const mongoose = require('mongoose');
const path = require('path');


const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

//Configuracion global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.miEnvironment, (err, res) => {
    if (err) throw err;

    console.log(`Base de Datos conectada!!`);
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto: `, 3000);
});