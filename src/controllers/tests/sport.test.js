const Sport = require('../../models/sport');
const {
    getAllSportsToursAndMatches,
    createSport,
    getSportById,
    getAllSports
} = require('../sport');

jest.mock('../../models/sport');

describe('Sport Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllSportsToursAndMatches', () => {
        it('should return structured data of sports, tours, and matches', async () => {
            const mockMatches = [
                { sportName: 'Football', tourName: 'Premier League', matchName: 'Match 1', matchId: 1, matchformat: 'Format 1', matchStartTime: '2024-01-01', matchNewsId: 101 },
                { sportName: 'Football', tourName: 'Premier League', matchName: 'Match 2', matchId: 2, matchformat: 'Format 2', matchStartTime: '2024-01-02', matchNewsId: 102 },
                { sportName: 'Basketball', tourName: 'NBA', matchName: 'Match 3', matchId: 3, matchformat: 'Format 3', matchStartTime: '2024-02-01', matchNewsId: 103 }
            ];
            Sport.getAllSportsToursAndMatches.mockResolvedValue(mockMatches);

            const result = await getAllSportsToursAndMatches();
            expect(result).toEqual({
                'Football': {
                    'Premier League': [
                        { matchName: 'Match 1', matchId: 1, matchformat: 'Format 1', matchStartTime: '2024-01-01', matchNewsId: 101 },
                        { matchName: 'Match 2', matchId: 2, matchformat: 'Format 2', matchStartTime: '2024-01-02', matchNewsId: 102 }
                    ]
                },
                'Basketball': {
                    'NBA': [
                        { matchName: 'Match 3', matchId: 3, matchformat: 'Format 3', matchStartTime: '2024-02-01', matchNewsId: 103 }
                    ]
                }
            });
            expect(Sport.getAllSportsToursAndMatches).toHaveBeenCalledTimes(1);
        });
    });

    describe('createSport', () => {
        it('should create a new sport', async () => {
            const params = { name: 'Cricket' };
            const mockResult = { id: 1, name: 'Cricket' };
            Sport.createSport.mockResolvedValue(mockResult);

            const result = await createSport(params);
            expect(result).toEqual(mockResult);
            expect(Sport.createSport).toHaveBeenCalledTimes(1);
            expect(Sport.createSport).toHaveBeenCalledWith(params);
        });
    });

    describe('getSportById', () => {
        it('should throw an error if id is missing', async () => {
            await expect(getSportById()).rejects.toThrow('Missing required parameter: id');
        });

        it('should return sport details by id', async () => {
            const id = 1;
            const mockSport = [{ id: 1, name: 'Cricket' }];
            Sport.getSportById.mockResolvedValue(mockSport);

            const result = await getSportById(id);
            expect(result).toEqual({ id: 1, name: 'Cricket' });
            expect(Sport.getSportById).toHaveBeenCalledTimes(1);
            expect(Sport.getSportById).toHaveBeenCalledWith(id);
        });

        it('should return an empty array if sport not found', async () => {
            const id = 2;
            Sport.getSportById.mockResolvedValue([]);

            const result = await getSportById(id);
            expect(result).toEqual([]);
            expect(Sport.getSportById).toHaveBeenCalledTimes(1);
            expect(Sport.getSportById).toHaveBeenCalledWith(id);
        });
    });

    describe('getAllSports', () => {
        it('should return all sports', async () => {
            const mockSports = [{ id: 1, name: 'Cricket' }, { id: 2, name: 'Football' }];
            Sport.getAllSports.mockResolvedValue(mockSports);

            const result = await getAllSports();
            expect(result).toEqual(mockSports);
            expect(Sport.getAllSports).toHaveBeenCalledTimes(1);
        });
    });

});
