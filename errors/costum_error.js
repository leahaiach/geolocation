const {ECODES}= require('./error_codes');


const STATUS_CODES = exports.STATUS_CODES = {
    InvalidArgumentError : 400,
    NotFoundError : 404,
    ForbiddenError : 403,
    UnauthorizedError : 401,
    UnProcessableEntityError : 422,
    ConflictError: 409,
    PayloadTooLarge : 413,
    InternalServerError : 500,
    ServiceUnavailableError : 503,
    OK : 200
};




/**
 *
 * @param {string} code
 * @param {string} msg
 * @constructor
 */
class BaseError extends Error {

    constructor(code, msg){
        super();
        Object.setPrototypeOf(this, new.target.prototype);//todo
        Error.captureStackTrace(this, this.constructor); //todo
        this.name = this.constructor.name;
        this.message = msg ;
        this.code = code;
    }
}

class ClientError extends BaseError{
    constructor(code = ECODES.EINTERNALSERVER.code , msg = ECODES.EINTERNALSERVER.message) {
        super(code, msg);
        this.status = STATUS_CODES[this.name];
    }
}

/**
 * 
 * @param {String} msg - message to pass to user
 * @param {String} [propertyName] - argument name that was found invalid
 * @param {String} [propertyValue] - argument value that was found invalid
 * @constructor
 */
class InvalidArgumentError extends ClientError{
    constructor (msg, propertyName, propertyValue) {
        super(ECODES.EBADREQUEST.code, msg)
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
    }
}


/**
 *
 * @param {String} url - invalid requested url
 * @constructor
 */
class NotFoundError extends ClientError{
    constructor (url) {
        super( ECODES.EURLNOTFND.code,  url ? `${url} not found` : ECODES.EURLNOTFND.message);
        this.name = this.constructor.name;
    }
}

/**
 *
 * @param {String} [msg] - message to pass to user
 * @constructor
 */
class ForbiddenError extends ClientError {
    constructor(msg){
        super(ECODES.EACCESSFORBID.code,  msg || ECODES.EACCESSFORBID.message);
        this.name = this.constructor.name;
    }
}


/**
 *
 * @param [msg]
 * @constructor
 */
class  UnauthorizedError extends ClientError{
    constructor(msg){
        super( ECODES.EUAUTH.code,  msg || ECODES.EUAUTH.message);
        this.name = this.constructor.name;
    }
}



/**
 *
 * @param {String} msg - explain the conflic
 * @constructor
 */
class ConflictError extends ClientError{
    constructor(msg){
        super( ECODES.ECONFLICT.code,  msg || ECODES.ECONFLICT.message);
        this.name = this.constructor.name;
    }
}


/**
 *
 * @param msg
 * @constructor
 */
class UnProcessableEntityError extends ClientError{
    constructor(msg) {
        super(  ECODES.EUNPROCENT.code,  msg || ECODES.EUNPROCENT.message);
        this.name = this.constructor.name;
    }

}



/**
 *
 * @constructor
 */
class InternalServerError extends ClientError {
    constructor(msg) {
        super(ECODES.EINTERNALSERVER.code, msg || ECODES.EINTERNALSERVER.message);
        this.name = this.constructor.name;
    }
}

/**
 *
 * @param msg
 * @constructor
 */
class ServiceUnavailableError extends ClientError{
    constructor(msg) {
        super(ECODES.ESERVICEUNAVAIL.code,  msg || ECODES.ESERVICEUNAVAIL.message);
        this.name = this.constructor.name;
    }
}




const ERROR_CODES = exports.ERROR_CODES = { //todo
    '400': InvalidArgumentError,
    '404': NotFoundError,
    '403': ForbiddenError,
    '401': UnauthorizedError,
    '422': UnProcessableEntityError,
    '409': ConflictError,
    '500': InternalServerError,
    '503': ServiceUnavailableError,

};
module.exports = {BaseError,
ClientError,
 InvalidArgumentError,
 NotFoundError,
 ForbiddenError,
 UnProcessableEntityError,
InternalServerError,
 ServiceUnavailableError,
 UnauthorizedError,
 ConflictError}