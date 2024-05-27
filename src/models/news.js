const mysql = require('../lib/mysql');
const Sport = require('../controllers/sport')
const Tour = require('../controllers/tour')
const Match = require('../controllers/match')

const getNewsById = async params => {
    console.log("News.getNewsById - start ", {params})
    const statement = 'select * from news where id = ?;';
    const parameters = [params.id];
    const result = await mysql.query(statement, parameters);
    console.log("News.getNewsById - complete ");
    return result;
}

const createNews = async params => {
    console.log("News.createNews - start ", {params})
    const {title, description, sportId, tourId, matchId} = params;
    const statement = 'insert into news (title, description, sportId, tourId, matchId) values (?, ?, ?, ?, ?);';
    const parameters = [title, description, sportId, tourId, matchId];
    const result = await mysql.query(statement, parameters);
    if(matchId) Match.updateNewsId(matchId, result.insertId);
    else if(tourId) Tour.updateNewsId(tourId, result.insertId);
    console.log("News.createNews - complete ");
    return result;
}

const getNewsBySportId = async sportId => {
    console.log("News.getNewsBySportId - start ", {sportId})

    const sport = await Sport.getSportById(sportId)
    const allToursBySportId = await Tour.getAllToursBySportId(sportId);
    sport.tours = []

    for (const tour of allToursBySportId) {
        const tourWithNews = await getNewsByTourId(tour.id);
        sport.tours.push(tourWithNews);
    }

    console.log("News.getNewsBySportId - complete ");
    return sport;
}

const getNewsByTourId = async tourId => {
    console.log("News.getNewsByTourId - start ", {tourId})

    const tourWithNewsQuery = 'select t.id, t.name, t.startTime, t.endTime, '
    + 'n.title as newsTitle, n.description as newsDescription '
    + 'from tours t '
    + 'left join news n on t.newsId = n.id '
    + 'where t.id = ?;';
    const tourWithNews = await mysql.query(tourWithNewsQuery, [tourId]);

    if(!tourWithNews || tourWithNews.length == 0) {
        console.log("News.getNewsByTourId - complete ");
        return;
    }

    const matchWithNewsQuery = 'select m.id, m.name, m.format, '
    + 'm.startTime, m.endTime, '
    + 'n.title as newsTitle, n.description as newsDescription '
    + 'from matches m '
    + 'left join news n on m.newsId = n.id '
    + 'where m.tourId = ?;';
    const matchWithNews = await mysql.query(matchWithNewsQuery, [tourId]);

    const result = tourWithNews[0];
    result.matches = matchWithNews;

    console.log("News.getNewsByTourId - complete ");
    return result;
}

const getNewsByMatchId = async matchId => {
    console.log("News.getNewsByMatchId - start ", {matchId})
    const statement = 'select n.title, n.description, ' 
    + 'm.name, m.format, m.format, m.startTime, m.endTime '  
    + 'from news as n inner join matches as m on n.matchId = m.id where n.matchId = ?;';
    const result = await mysql.query(statement, [matchId]);
    console.log("News.getNewsByMatchId - complete ");
    return result;
}

module.exports = {
    getNewsById: getNewsById,
    createNews: createNews,
    getNewsBySportId: getNewsBySportId,
    getNewsByTourId: getNewsByTourId,
    getNewsByMatchId: getNewsByMatchId
}