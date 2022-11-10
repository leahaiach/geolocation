/**
 * Created by recntrek03 on 09/06/16.
 */


const MyError = require('./costum_error');

module.exports ={
/**
 *
 * @param {error.ClientError} err
 * @param {IncomingMessage} req
 * @param {ServerRespond} res
 * @param {Function} next
 * @return {*}
 * @constructor
 */
 errorRespond: (err, req, res, next) =>{

    if (!(err instanceof Error)) {
        //if err is a string or number
        err = new MyError.InternalServerError(err);
        console.error({}, new Error('error respond called without passing an error'));
        return errorRespond(err, req, res, next);
    }

    let data = {
        message: err.message,
        time: new Date()
    };

    if (err instanceof MyError.ClientError) {
        data.code = err.code
    }

    if (err instanceof MyError.InvalidArgumentError) {
        data.property_name = err.propertyName;
        data.property_value = err.propertyValue;
    }
    res.status(err.status || MyError.STATUS_CODES.InternalServerError).json({error: data});
},

 LogError: (err, req, res, next) =>{
    console.error(err);
    next(err);
}
}

