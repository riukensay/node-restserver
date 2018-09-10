//==========
//==Puerto==
//==========
process.env.PORT = process.env.PORT || 3000;

//==========
//==Entorno==
//==========

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==========
//==BBDD==
//==========

let urldDB;

if (process.env.NODE_ENV === 'dev') {
    urldDB = 'mongodb://localhost:27017/cafe';
} else {
    urldDB = 'mongodb://cafe-user:123456a@ds119748.mlab.com:19748/cafe';
}


process.env.miEnvironment = urldDB;