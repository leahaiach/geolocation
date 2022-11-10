const {InvalidArgumentError} = require('../errors').Errors;
const {DistanceModelMongo, AddressesModelMongo, Connection}= require('../mongo');
const {getCoordinate, getDistanceBetween2Points} = require('../util')
class Distance{

    constructor(source, destination, distance) {
        this.source = source.toLowerCase() < destination.toLowerCase() ? source.toLowerCase() : destination.toLowerCase();
        this.destination = source.toLowerCase() < destination.toLowerCase() ? destination.toLowerCase() : source.toLowerCase();
        this.distance = parseFloat(distance);
    }


    static parse(req, res, next){
        try{
            //here the destination and source will always be ordered by ascending order
            let distance = Distance.validate(req);
            req.distance = distance;
            next();
        }
        catch(e){
            next(e);
        }

    }
    static async execute(req, res, next){

        const session = await Connection.startSession();

        try{
            let {source, destination} =req.distance;
            session.startTransaction();
            let result = await DistanceModelMongo.findOne({source, destination},'distance');

            if(result){
                result.hits = result.hits ? result.hits + 1 : 1;
                req.resultDistance = result.distance;
                await result.save();
                next(req.result);
            }
            else {
                let [s , d ] = await Promise.all([AddressesModelMongo.findOne({address: source}).select('coordinate'),
                    AddressesModelMongo.findOne({address: destination}).select('coordinate')]);
                let sourceCoord = s ? s.toJSON().coordinate : undefined;
                let destCoord = d ? d.toJSON().coordinate : undefined;
                if(!sourceCoord){
                    sourceCoord = await getCoordinate(source);
                    await AddressesModelMongo.create(new AddressesModelMongo({address:source, coordinate : sourceCoord}));
                }
                if(!destCoord){
                     destCoord = await getCoordinate(destination);
                    await AddressesModelMongo.create([{address:destination, coordinate : destCoord}],{session});
                }
                req.resultDistance = getDistanceBetween2Points(destCoord, sourceCoord);//function haversine
                await DistanceModelMongo.create([{destination, source, distance : req.resultDistance, hits:1}], {session})

            }
            await session.commitTransaction();
            next();
        }
        catch(e){
            await session.abortTransaction();
            next(e)
        }
    }



    static respond(req, res, next){
         res.json({distance: req.resultDistance});
    }







    static async ingestAPI(req, res, next){
        try{
            let myObj = Distance.validate(req, true);
            let {destination, source, distance} = myObj;
            let doc = await DistanceModelMongo.findOneAndUpdate({destination, source},{distance}, {new: true, upsert: true }); //atomic operation
            console.log("doc is "+ JSON.stringify(doc))
            if(doc) {
                let hits = doc.toJSON().hits;
                res.status(201).json({source, destination, hits });
            }

            //update mongo

        }
        catch(e){
            next(e)
        }
    }



 /**************************************** VALIDATION **********************************/

    static validate(req, isIngest =false){
        const {query :{destination, source, distance}} = req;
        if(!destination)
            throw new InvalidArgumentError("Missing destination"); //todo move all err_str to file if time
        if(!source)
            throw new InvalidArgumentError("Missing source");
        if(typeof destination !== 'string')
            throw new InvalidArgumentError("Property should be a string","destination",destination);
        if(typeof source !== 'string')
            throw new InvalidArgumentError("Property should be a string","source",source);
        if(isIngest && typeof parseInt(distance, 10) !== 'number'){
            throw new InvalidArgumentError("Property should be a number","distance");
        }

        if(isIngest &&  distance === undefined){
            throw new InvalidArgumentError("Property is missing","distance");
        }
        return isIngest ? new Distance (source, destination, distance): new Distance(source, destination);
    }

}
module.exports = Distance;