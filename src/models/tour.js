const mysql = require('../lib/mysql');
const Match = require('../controllers/match')

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {
    console.log("Tour.getMatchesByTourName - start ", {params})
    const tourId = await getTourIdByTourName(params);
    const result =  await Match.getAllMatchesByTourId(tourId[0].id);
    console.log("Tour.getMatchesByTourName - complete ");
    return result;
}

const getTourIdByTourName = async params => {
    console.log("Tour.getTourIdByTourName - start ", {params})
    const statement = 'select id from tours where tours.name = ?';
    const parameters = [ params.name ];
    const result = await mysql.query(statement, parameters);
    console.log("Tour.getTourIdByTourName - complete ")
    return result;
}

const updateNewsId = async (id, newsId) => {
    console.log("Match.updateNewsId - start ", {id, newsId})
    const statement = 'update tours set newsId = ? where id = ?;';
    const parameters = [newsId, id]
    const result = await mysql.query(statement, parameters);
    console.log("Match.updateNewsId - complete ")
    return result;
}

const getTourById = async id => {
    console.log("Tour.getTourById - start ", {id})
    const statement = 'Select * from tours where id = ?';
    const parameters = [id];
    const result = await mysql.query(statement, parameters);
    console.log("Tour.getTourById - complete ")
    return result;
}

const getAllToursBySportId = async sportId => {
    console.log("Tour.getAllToursBySportId - start ", {sportId})
    const statement = 'Select * from tours where sportId = ?';
    const parameters = [sportId];
    const result = await mysql.query(statement, parameters);
    console.log("Tour.getAllToursBySportId - complete ")
    return result;
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
    getTourIdByTourName: getTourIdByTourName,
    updateNewsId: updateNewsId,
    getTourById: getTourById,
    getAllToursBySportId: getAllToursBySportId
}