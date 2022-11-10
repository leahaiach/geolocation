const router = require('express').Router();
const PATH = '/health';


const { MongoConnection } = require('../mongo')
const {InternalServerError} = require('../errors').Errors;

router.route('/').get(async (req, res, next) => {
    try {
        let result = await MongoConnection.isConnected();
        if (result == true) {
            res.json({})
        } else {
            throw new InternalServerError("Mongodb is not available");
        }
    }
    catch(e){
        next(e);
    }
}



);

module.exports = {
    router,
    PATH,
};