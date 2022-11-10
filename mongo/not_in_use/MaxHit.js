
//Not in use- It could be an option to always store in this collection the last most hitted search
//On every insert we would chek the element in the collection and update the hits if it is indeed
//the relevant distance that the user just looked for;

const mongoose = require('mongoose');
const {Schema} = mongoose;
const {Number, String, Long} = Schema.Types;
const MaxHitSchema = new Schema({

    source : {
        type :String,
        select : true
    },
    destination : {
        type : String,
        select : true,
    },
    hits:{
        type: Number,
        select: true,
    }
});
const storeCollection = 'max_hit_store';
const MaxHitModel = !(mongoose.models[storeCollection])? mongoose.model(storeCollection, MaxHitSchema, storeCollection): mongoose.models[storeCollection];


MaxHitModel.findMaxHits = async()=>{//there will be always only one
    return MaxHitModel.find();
}
module.exports = {MaxHitModel};