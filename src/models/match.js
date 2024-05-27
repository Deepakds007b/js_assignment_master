const mysql = require('../lib/mysql');

const getAllMatches = async () => {
    const statement = 'select * from matches;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getAllMatchesByTourId = async (tourId) => {
    console.log("Match.getAllMatchesByTourId - start ", {tourId})
    const statement = 'select * from matches where tourId = ?;';
    const parameters = [tourId]
    const result = await mysql.query(statement, parameters);
    console.log("Match.getAllMatchesByTourId - complete ")
    return result;
}

const updateNewsId = async (matchId, newsId) => {
    console.log("Match.updateNewsId - start ", {matchId, newsId})
    const statement = 'update matches set newsId = ? where id = ?;';
    const parameters = [newsId, matchId]
    const result = await mysql.query(statement, parameters);
    console.log("Match.updateNewsId - complete ")
    return result;
}

module.exports = {
    getAllMatches: getAllMatches,
    getAllMatchesByTourId: getAllMatchesByTourId,
    updateNewsId: updateNewsId
}