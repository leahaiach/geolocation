const router = require('express').Router();
const PATH = '/distance';
const Distance = require('../BL/Distance');

router.route('/').get(Distance.parse, Distance.execute, Distance.respond );
router.route('/').post(Distance.ingestAPI);

module.exports = {
    router,
    PATH,

};