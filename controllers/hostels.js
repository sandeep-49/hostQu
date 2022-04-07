const Hostel = require('../models/hostel');

module.exports.index = async (req, res) => {
    const hostels = await Hostel.find({});
    res.render('hostels/index', { hostels })
}

module.exports.renderNewForm = (req, res) => {
    res.render('hostels/new');
}

module.exports.createHostel = async (req, res, next) => {
    const hostel = new Hostel(req.body.hostel);
    hostel.author = req.user._id;
    await hostel.save();
    req.flash('success', 'Successfully made a new hostel!');
    res.redirect(`/hostels/${hostel._id}`)
}

module.exports.showHostel = async (req, res,) => {
    const hostel = await Hostel.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!hostel) {
        req.flash('error', 'Cannot find that hostel!');
        return res.redirect('/hostels');
    }
    res.render('hostels/show', { hostel });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const hostel = await Hostel.findById(id)
    if (!hostel) {
        req.flash('error', 'Cannot find that hostel!');
        return res.redirect('/hostels');
    }
    res.render('hostels/edit', { hostel });
}

module.exports.updateHostel = async (req, res) => {
    const { id } = req.params;
    const hostel = await Hostel.findByIdAndUpdate(id, { ...req.body.hostel });
    req.flash('success', 'Successfully updated hostel!');
    res.redirect(`/hostels/${hostel._id}`)
}

module.exports.deleteHostel = async (req, res) => {
    const { id } = req.params;
    await Hostel.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted hostel')
    res.redirect('/hostels');
}