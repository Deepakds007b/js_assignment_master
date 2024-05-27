const News = require('../controllers/news');
const express = require('express')

module.exports = function(app) {

    app.use(express.json());

    app.route('/news').get(async (req, res, next) => {
        try {
            let params = req.query;
            return res.json(await News.getNewsById(params));
        } catch (err) {
            return next(err);
        }
    });

    app.route('/news').post(async (req, res, next) => {
        try {
            return res.json(await News.createNews(req.body));
        } catch (err) {
            return next(err);
        }
    });

    app.route('/news/sport').get(async (req, res, next) => {
        try {
            return res.json(await News.getNewsBySportId(req.query));
        } catch (err) {
            return next(err);
        }
    });

    app.route('/news/tour').get(async (req, res, next) => {
        try {
            return res.json(await News.getNewsByTourId(req.query));
        } catch (err) {
            return next(err);
        }
    });

    app.route('/news/match').get(async (req, res, next) => {
        try {
            return res.json(await News.getNewsByMatchId(req.query));
        } catch (err) {
            return next(err);
        }
    });
}

