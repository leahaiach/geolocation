const mongoose = require('mongoose');

const {Schema} = mongoose;
require('mongoose-long')(mongoose);

const {Number, String, Long} = Schema.Types;



const DistanceStoreSchema = new Schema({

    source : {
        type :String,
        select : true
    },
    destination : {
        type : String,
        select : true,
    },
    distance: {
        type: Number,
        select: false,
    },
    hits:{
        type: Number,
        select: true,
    }
});

const storeCollection = 'distance_store';
const DistanceModel = !(mongoose.models[storeCollection])? mongoose.model(storeCollection, DistanceStoreSchema, storeCollection): mongoose.models[storeCollection];

DistanceModel.findDistance = async({source, destination})=>{
    let result = await DistanceModel.findOne({source, destination});
    if(!result){
        return undefined; //todo query geocoder
    }
    return result;
}
DistanceModel.findMaxHits = async()=>{
    let res = await DistanceModel.find().sort({"hits":-1}).limit(1) ;
    let value = res.length ?  res.pop().toJSON() : null;
    return value ? {destination : value.destination, source: value.source, hits: value.hits}:{};
}
module.exports = {DistanceModel};