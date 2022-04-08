const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Hostel = require('../models/hostel');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');

const ExpressError = require('../utils/ExpressError');
const asyncError = require('../utils/asyncError');

router.post('/', isLoggedIn, validateReview, asyncError(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, asyncError(reviews.deleteReview))

module.exports = router;