const mysql = require('../lib/mysql');

const getAllSportsToursAndMatches = async () => {
    console.log("Sport.getAllSportsToursAndMatches - start ")
    const statement = 'select s.name as sportName, t.name as tourName, m.name as matchName, ' +
        'm.id as matchId, m.startTime as matchStartTime, m.format as matchformat, m.newsId as matchNewsId ' +
        'from matches m inner join tours t on m.tourId = t.id ' +
        'inner join sports s on t.sportId = s.id';
    const parameters = [];
    const result = await mysql.query(statement, parameters);
    console.log("Sport.getAllSportsToursAndMatches - complete ")
    return result;
}

const createSport = async params => {
    console.log("Sport.createSport - start ")
    const statement = 'insert into sports (name) values (?)';
    const parameters = [params.name];
    const result = await mysql.query(statement, parameters);
    console.log("Sport.createSport - complete ")
    return result;
}

const getSportById = async id => {
    console.log("Sport.getSportById - start ", {id})
    const statement = 'Select * from sports where id = ?';
    const parameters = [id];
    const result = await mysql.query(statement, parameters);
    console.log("Sport.getSportById - complete ")
    return result;
}

const getAllSports = async () => {
    console.log("Sport.getAllSport - start ")
    const statement = 'Select * from sports';
    const parameters = [];
    const result = await mysql.query(statement, parameters);
    console.log("Sport.getAllSport - complete ")
    return result;
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches,
    createSport: createSport,
    getSportById: getSportById,
    getAllSports: getAllSports
}