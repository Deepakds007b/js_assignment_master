const Tour = require('../../models/tour');
const {
    getAllTours,
    getMatchesByTourName,
    getTourById,
    getAllToursBySportId,
    updateNewsId
} = require('../tour');

jest.mock('../../models/tour');

describe.only('Tour Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTours', () => {
        it('should return all tours', async () => {
            const mockTours = [{ id: 1, name: 'Tour 1' }, { id: 2, name: 'Tour 2' }];
            Tour.getAllTours.mockResolvedValue(mockTours);

            const result = await getAllTours();
            expect(result).toEqual(mockTours);
            expect(Tour.getAllTours).toHaveBeenCalledTimes(1);
        });
    });

    describe('getMatchesByTourName', () => {
        it('should throw an error if name is missing', async () => {
            await expect(getMatchesByTourName({})).rejects.toThrow('Missing required parameter: name');
        });

        it('should return matches by tour name', async () => {
            const params = { name: 'Tour 1' };
            const mockMatches = [{ id: 1, name: 'Match 1' }, { id: 2, name: 'Match 2' }];
            Tour.getMatchesByTourName.mockResolvedValue(mockMatches);

            const result = await getMatchesByTourName(params);
            expect(result).toEqual(mockMatches);
            expect(Tour.getMatchesByTourName).toHaveBeenCalledTimes(1);
            expect(Tour.getMatchesByTourName).toHaveBeenCalledWith(params);
        });
    });

    describe('getTourById', () => {
        it('should throw an error if id is missing', async () => {
            await expect(getTourById()).rejects.toThrow('Missing required parameter: id');
        });

        it('should return tour details by id', async () => {
            const id = 1;
            const mockTour = [{ id: 1, name: 'Tour 1' }];
            Tour.getTourById.mockResolvedValue(mockTour);

            const result = await getTourById(id);
            expect(result).toEqual({ id: 1, name: 'Tour 1' });
            expect(Tour.getTourById).toHaveBeenCalledTimes(1);
            expect(Tour.getTourById).toHaveBeenCalledWith(id);
        });

        it('should return an empty array if tour not found', async () => {
            const id = 2;
            Tour.getTourById.mockResolvedValue([]);

            const result = await getTourById(id);
            expect(result).toEqual([]);
            expect(Tour.getTourById).toHaveBeenCalledTimes(1);
            expect(Tour.getTourById).toHaveBeenCalledWith(id);
        });
    });

    describe('getAllToursBySportId', () => {
        it('should throw an error if sportId is missing', async () => {
            await expect(getAllToursBySportId()).rejects.toThrow('Missing required parameter: sportId');
        });

        it('should return all tours by sportId', async () => {
            const sportId = 1;
            const mockTours = [{ id: 1, name: 'Tour 1' }, { id: 2, name: 'Tour 2' }];
            Tour.getAllToursBySportId.mockResolvedValue(mockTours);

            const result = await getAllToursBySportId(sportId);
            expect(result).toEqual(mockTours);
            expect(Tour.getAllToursBySportId).toHaveBeenCalledTimes(1);
            expect(Tour.getAllToursBySportId).toHaveBeenCalledWith(sportId);
        });
    });

    describe('updateNewsId', () => {
        it('should throw an error if id or newsId is missing', async () => {
            await expect(updateNewsId(1)).rejects.toThrow('Missing required parameter: id, newsId');
            await expect(updateNewsId(null, 1)).rejects.toThrow('Missing required parameter: id, newsId');
        });

        it('should update the newsId for a tour', async () => {
            const id = 1;
            const newsId = 101;
            const mockResult = { affectedRows: 1 };
            Tour.updateNewsId.mockResolvedValue(mockResult);

            const result = await updateNewsId(id, newsId);
            expect(result).toEqual(mockResult);
            expect(Tour.updateNewsId).toHaveBeenCalledTimes(1);
            expect(Tour.updateNewsId).toHaveBeenCalledWith(id, newsId);
        });
    });

});
