const News = require('../models/news');
const Sport = require('../controllers/sport');
const Tour = require('../controllers/tour');

const getNewsById = async params => {
    return await News.getNewsById(params);
}

const createNews = async params => {
    
    if(!params) throw new Error('Missing required parameters: Title, Description, Sport Id and Tour Id');
         
    const {title, description, sportId, tourId, matchId} = params;

    if(!title || !description) throw new Error('Missing required parameter(s): Title, Description');

    if(!sportId || !tourId) throw new Error('Missing required parameter(s): Sport Id, Tour Id');
    
    if(isNaN(sportId) || isNaN(tourId)) throw new Error('Invalid parameter Value: Provide numeric value for sportId, tourId');

    if(matchId && isNaN(matchId)) throw new Error('Invalid parameter Value: Provide numeric value for matchId');

    const sport = await Sport.getSportById(sportId);

    if(!sport || sport.length == 0) {
        const allSports = await Sport.getAllSports();
        const allSportsIdAndName = []
        allSports.forEach((sport) => {
            allSportsIdAndName.push({
                id: sport.id,
                name: sport.name
            });
        })
        const result = {
            "error": "Choose from these sports id",
            "sports": allSportsIdAndName
        };
        return result;
    }

    const allToursbySportId = await Tour.getAllToursBySportId(sportId);

    let doesTourBelongToSport = false;

    for(let tour of allToursbySportId){
        if(tour.id == tourId) {
            doesTourBelongToSport = true;
            break;
        }
    };

    if(!doesTourBelongToSport) throw new Error('Invalid parameter Value: Tour does not belong to sport');

    const tour = await Tour.getTourById(tourId);
    if(!tour || tour.length == 0) {
        const allTours = await Tour.getAllToursBySportId(sportId);
        const allToursIdandName = []
        allTours.forEach((tour) => {
            allToursIdandName.push({
                id: tour.id,
                name: tour.name
            });
        })
        const result = {
            "error": "Choose from these tours id",
            "tours": allToursIdandName
        };
        return result;
    }

    return await News.createNews(params);
}

const getNewsBySportId = async params => {
    if(!params || !params.sportId) throw new Error('Missing required parameters: sportId');
    return await News.getNewsBySportId(params.sportId);
}

const getNewsByTourId = async params => {
    if(!params || !params.tourId) throw new Error('Missing required parameters: tourId');
    return await News.getNewsByTourId(params.tourId);
}

const getNewsByMatchId = async params => {
    if(!params || !params.matchId) throw new Error('Missing required parameters: matchId');
    return await News.getNewsByMatchId(params.matchId);
}

module.exports = {
    getNewsById: getNewsById,
    createNews: createNews,
    getNewsBySportId: getNewsBySportId,
    getNewsByTourId: getNewsByTourId,
    getNewsByMatchId: getNewsByMatchId
}