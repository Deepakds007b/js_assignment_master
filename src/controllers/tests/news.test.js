const News = require('../../models/news');
const Sport = require('../sport');
const Tour = require('../tour');
const {
    getNewsById,
    createNews,
    getNewsBySportId,
    getNewsByTourId,
    getNewsByMatchId
} = require('../news');

jest.mock('../../models/news');
jest.mock('../sport');
jest.mock('../tour');

describe('News Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getNewsById', () => {
        it('should return news by id', async () => {
            const params = { id: 1 };
            const mockNews = { id: 1, title: 'News Title' };
            News.getNewsById.mockResolvedValue(mockNews);

            const result = await getNewsById(params);
            expect(result).toEqual(mockNews);
            expect(News.getNewsById).toHaveBeenCalledTimes(1);
            expect(News.getNewsById).toHaveBeenCalledWith(params);
        });
    });

    describe('createNews', () => {
        it('should throw an error if params are missing', async () => {
            await expect(createNews(null)).rejects.toThrow('Missing required parameters: Title, Description, Sport Id and Tour Id');
        });

        it('should throw an error if required params are missing', async () => {
            const params = { title: 'News Title' };
            await expect(createNews(params)).rejects.toThrow('Missing required parameter(s): Title, Description');
        });

        it('should throw an error if sportId or tourId are missing', async () => {
            const params = { title: 'News Title', description: 'News Description' };
            await expect(createNews(params)).rejects.toThrow('Missing required parameter(s): Sport Id, Tour Id');
        });

        it('should throw an error if sportId or tourId are not numeric', async () => {
            const params = { title: 'News Title', description: 'News Description', sportId: 'abc', tourId: 'xyz' };
            await expect(createNews(params)).rejects.toThrow('Invalid parameter Value: Provide numeric value for sportId, tourId');
        });

        it('should throw an error if matchId is not numeric', async () => {
            const params = { title: 'News Title', description: 'News Description', sportId: 1, tourId: 1, matchId: 'abc' };
            await expect(createNews(params)).rejects.toThrow('Invalid parameter Value: Provide numeric value for matchId');
        });

        it('should return sports list if sportId is invalid', async () => {
            const params = { title: 'News Title', description: 'News Description', sportId: 99, tourId: 1 };
            Sport.getSportById.mockResolvedValue(null);
            Sport.getAllSports.mockResolvedValue([{ id: 1, name: 'Sport 1' }, { id: 2, name: 'Sport 2' }]);

            const result = await createNews(params);
            expect(result).toEqual({
                error: "Choose from these sports id",
                sports: [{ id: 1, name: 'Sport 1' }, { id: 2, name: 'Sport 2' }]
            });
        });

        it('should throw an error if tour does not belong to sport', async () => {
            const params = { title: 'News Title', description: 'News Description', sportId: 1, tourId: 2 };
            Sport.getSportById.mockResolvedValue({ id: 1, name: 'Sport 1' });
            Tour.getAllToursBySportId.mockResolvedValue([{ id: 3, name: 'Tour 3' }]);

            await expect(createNews(params)).rejects.toThrow('Invalid parameter Value: Tour does not belong to sport');
        });

        it('should create news if all parameters are valid', async () => {
            const params = { title: 'News Title', description: 'News Description', sportId: 1, tourId: 1 };
            Sport.getSportById.mockResolvedValue({ id: 1, name: 'Sport 1' });
            Tour.getAllToursBySportId.mockResolvedValue([{ id: 1, name: 'Tour 1' }]);
            Tour.getTourById.mockResolvedValue({ id: 1, name: 'Tour 1' });
            News.createNews.mockResolvedValue({ id: 1, title: 'News Title' });

            const result = await createNews(params);
            expect(result).toEqual({ id: 1, title: 'News Title' });
            expect(News.createNews).toHaveBeenCalledTimes(1);
            expect(News.createNews).toHaveBeenCalledWith(params);
        });
    });

    describe('getNewsBySportId', () => {
        it('should throw an error if sportId is missing', async () => {
            await expect(getNewsBySportId(null)).rejects.toThrow('Missing required parameters: sportId');
        });

        it('should return news by sportId', async () => {
            const params = { sportId: 1 };
            const mockNews = [{ id: 1, title: 'News 1' }];
            News.getNewsBySportId.mockResolvedValue(mockNews);

            const result = await getNewsBySportId(params);
            expect(result).toEqual(mockNews);
            expect(News.getNewsBySportId).toHaveBeenCalledTimes(1);
            expect(News.getNewsBySportId).toHaveBeenCalledWith(params.sportId);
        });
    });

    describe('getNewsByTourId', () => {
        it('should throw an error if tourId is missing', async () => {
            await expect(getNewsByTourId(null)).rejects.toThrow('Missing required parameters: tourId');
        });

        it('should return news by tourId', async () => {
            const params = { tourId: 1 };
            const mockNews = [{ id: 1, title: 'News 1' }];
            News.getNewsByTourId.mockResolvedValue(mockNews);

            const result = await getNewsByTourId(params);
            expect(result).toEqual(mockNews);
            expect(News.getNewsByTourId).toHaveBeenCalledTimes(1);
            expect(News.getNewsByTourId).toHaveBeenCalledWith(params.tourId);
        });
    });

    describe('getNewsByMatchId', () => {
        it('should throw an error if matchId is missing', async () => {
            await expect(getNewsByMatchId(null)).rejects.toThrow('Missing required parameters: matchId');
        });

        it('should return news by matchId', async () => {
            const params = { matchId: 1 };
            const mockNews = [{ id: 1, title: 'News 1' }];
            News.getNewsByMatchId.mockResolvedValue(mockNews);

            const result = await getNewsByMatchId(params);
            expect(result).toEqual(mockNews);
            expect(News.getNewsByMatchId).toHaveBeenCalledTimes(1);
            expect(News.getNewsByMatchId).toHaveBeenCalledWith(params.matchId);
        });
    });

});
