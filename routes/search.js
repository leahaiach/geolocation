const router = require('express').Router();
const PATH = '/popularsearch';
const Search = require('../BL/MaxHit');

router.route('/').get(Search.execute, Search.respond);

module.exports = {
    router,
    PATH,
};