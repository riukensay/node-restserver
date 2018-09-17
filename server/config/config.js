//=====================================
//Puerto
//=====================================
process.env.PORT = process.env.PORT || 3000;

//=====================================
//Entorno
//=====================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=====================================
//Vencimiento Token
//=====================================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//=====================================
//Seed de autenticacion
//=====================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//=====================================
//BBDD
//=====================================
let urldDB;

if (process.env.NODE_ENV === 'dev') {
    urldDB = 'mongodb://localhost:27017/cafe';
} else {
    urldDB = process.env.MONGO_URI;
}


process.env.miEnvironment = urldDB;

//=====================================
// Google Cliente ID
//=====================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '153886640215-4e0ohgptr7qdfrhlhm4pm3377v4d9tsm.apps.googleusercontent.com';