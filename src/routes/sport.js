const Sport = require('../controllers/sport');
const express = require('express')

module.exports = function(app) {

    app.use(express.json());

    app.route('/sport/tour/match').get(async (req, res, next) => {
        try {
            return res.json(await Sport.getAllSportsToursAndMatches());
        } catch (err) {
            return next(err);
        }
    });

    app.route('/sport').post(async (req, res, next) => {
        try {
            return res.json(await Sport.createSport(req.body));
        } catch (err) {
            return next(err);
        }
    });

    app.route('/sport').get(async (req, res, next) => {
        try {
            return res.json(await Sport.getSportById(req.query));
        } catch (err) {
            return next(err);
        }
    });

    app.route('/sport/all').get(async (req, res, next) => {
        try {
            return res.json(await Sport.getAllSports());
        } catch (err) {
            return next(err);
        }
    });
}