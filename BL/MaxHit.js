
const {DistanceModelMongo, MaxHits}= require('../mongo');


class MaxHit {

     static async execute(req,res,next){
         try{
             //query mongodb to get the max distance searched
             req.result= await DistanceModelMongo.findMaxHits();
             next();
         }
         catch(e){
             next(e)
         }

    }
    static respond(req,res,next){
        res.json(req.result);
    }
}
module.exports = MaxHit;