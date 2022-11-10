const mongoose = require('mongoose');

module.exports = {
    defaultConnection:   (mongoURi) =>  {
          mongoose.connect(mongoURi,{dbName: 'geolocation'}).then((data) => {
            console.log(
                `MongoDb Database Connected to the Server : mongo host is ${data.connection.host}`
            );}).catch((err) => {
                console.log(`Some Database Connection Error Occured :- ${err}`);
            })
    },
    isConnected :async()=>{
        let state = await mongoose.connection.readyState;
        return state;
    },
    Connection :  mongoose.connection,
};