const Match = require('../models/match');

const getAllMatches = async () => {
    return await Match.getAllMatches();
}

const getAllMatchesByTourId = async (tourId) => {
    return await Match.getAllMatchesByTourId(tourId);
}

const updateNewsId = async (matchId, newsId) => {
    return await Match.updateNewsId(matchId, newsId);
}

module.exports = {
    getAllMatches: getAllMatches,
    getAllMatchesByTourId: getAllMatchesByTourId,
    updateNewsId: updateNewsId
}