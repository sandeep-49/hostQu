const express = require('express');
const router = express.Router();
const hostels = require('../controllers/hostels');
const asyncError = require('../utils/asyncError');
const { isLoggedIn, isAuthor, validateHostel } = require('../middleware');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const Hostel = require('../models/hostel');

router.route('/')
    .get(asyncError(hostels.index))
    .post(isLoggedIn, upload.array('image'), validateHostel, asyncError(hostels.createHostel))
    
router.get('/new', isLoggedIn, hostels.renderNewForm)

router.route('/:id')
    .get(asyncError(hostels.showHostel))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateHostel, asyncError(hostels.updateHostel))
    .delete(isLoggedIn, isAuthor, asyncError(hostels.deleteHostel));

router.get('/:id/edit', isLoggedIn, isAuthor, asyncError(hostels.renderEditForm))

module.exports = router;