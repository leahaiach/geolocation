const router = require('express').Router();
const PATH = '/hello';


router.route('/').get((req, res) => {res.json({})});

module.exports = {
    router,
    PATH,
};