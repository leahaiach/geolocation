
const dotenv = require('dotenv');
const app = require('../app');
const {Connection: MongoModelConnection} = require("../mongo");


logExceptions();
initConfig();
connectToDb();
app.listen(process.env.PORT , () => {
    console.log(`Geolocation server listening on port ${process.env.PORT}`);
})




function printFatalError(err, type) {
    const error = JSON.stringify(err, Object.getOwnPropertyNames(err));
    console.error({ type }, new Error(error));
}

function logExceptions() {
    process
        .on('uncaughtException', (e) => printFatalError(e, 'uncaughtException'))
        .on('unhandledRejection', (e) => printFatalError(e, 'unhandledRejection'))
}

function initConfig(){
    dotenv.config();
}

 function connectToDb(){
    const { MongoConnection } = require('../mongo');
     MongoConnection.defaultConnection(process.env.MONGO_URI);
}