const app = require('express')();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT ;
const HOST = process.env.HOST ;
const healthCheck = require('./routes/healthCheck');




app.use(healthCheck.PATH, healthCheck.router);


app.listen(PORT , () => {
    console.log(`Geolocation server listening on port ${PORT}`);
})