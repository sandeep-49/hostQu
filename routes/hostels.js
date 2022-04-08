const express = require('express');
const router = express.Router();
const hostels = require('../controllers/hostels');
const asyncError = require('../utils/asyncError');
const { isLoggedIn, isAuthor, validateHostel } = require('../middleware');

const Hostel = require('../models/hostel');

router.route('/')
    .get(asyncError(hostels.index))
    .post(isLoggedIn, validateHostel, asyncError(hostels.createHostel))

router.get('/new', isLoggedIn, hostels.renderNewForm)

router.route('/:id')
    .get(asyncError(hostels.showHostel))
    .put(isLoggedIn, isAuthor, validateHostel, asyncError(hostels.updateHostel))
    .delete(isLoggedIn, isAuthor, asyncError(hostels.deleteHostel));

router.get('/:id/edit', isLoggedIn, isAuthor, asyncError(hostels.renderEditForm))

module.exports = router;