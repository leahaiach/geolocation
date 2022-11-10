const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Number, String, Decimal128} = Schema.Types;

const PointSchema = new Schema({
    lat : Decimal128,
    lon : Decimal128
},{ _id : false });

const AdressesStoreSchema = new Schema({

    address : {
        type :String,
        select : true,

    },
    coordinate : {
        type : PointSchema,
        select : true,

    },
},{
});

const storeCollection = 'adresses_store';
const AddressesModel = !(mongoose.models[storeCollection])? mongoose.model(storeCollection, AdressesStoreSchema, storeCollection): mongoose.models[storeCollection];

module.exports = {AddressesModel};