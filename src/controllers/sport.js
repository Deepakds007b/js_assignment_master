const Sport = require('../models/sport');

const getAllSportsToursAndMatches = async () => {
    const matches = await Sport.getAllSportsToursAndMatches();
    const res = {};
    matches.forEach(match => {
        const { sportName, tourName, matchName, matchId, matchformat, matchStartTime, matchNewsId } = match;
        if (!res[sportName]) {
            res[sportName] = {};
        }
        if (!res[sportName][tourName]) {
            res[sportName][tourName] = [];
        }
        const matchDetails = {
            matchName: matchName,
            matchId: matchId,
            matchformat: matchformat,
            matchStartTime: matchStartTime,
            matchNewsId: matchNewsId
        }
        res[sportName][tourName].push(matchDetails);
    });
    return res;
}

const createSport = async params => {
    const result = await Sport.createSport(params);
    return result;
}

const getSportById = async id => {
    if(!id) throw new Error('Missing required parameter: id');
    const sport = await Sport.getSportById(id);
    if(!sport || sport.length == 0) return sport;
    const result = {
        id: sport[0].id,
        name: sport[0].name
    }
    return result;
}

const getAllSports = async () => {
    return await Sport.getAllSports();
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches,
    createSport: createSport,
    getSportById: getSportById,
    getAllSports: getAllSports
}