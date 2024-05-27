const Tour = require('../models/tour');

const getAllTours = async () => {
    return await Tour.getAllTours();
}

const getMatchesByTourName = async params => {
    const { name } = params;

    if (!name) {
        throw new Error('Missing required parameter: name');
    }

    return await Tour.getMatchesByTourName(params);
}

const getTourById = async id => {
    if(!id) throw new Error('Missing required parameter: id');
    const tour = await Tour.getTourById(id);
    if(!tour || tour.length == 0) return tour;
    const result = {
        id: tour[0].id,
        name: tour[0].name
    }
    return result;
}

const getAllToursBySportId = async sportId => {
    if(!sportId) throw new Error('Missing required parameter: sportId');
    return await Tour.getAllToursBySportId(sportId);
}

const updateNewsId = async (id, newsId) => {
    if(!id || !newsId) throw new Error('Missing required parameter: id, newsId');
    return await Tour.updateNewsId(id, newsId);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
    getTourById: getTourById,
    getAllToursBySportId: getAllToursBySportId,
    updateNewsId: updateNewsId
}