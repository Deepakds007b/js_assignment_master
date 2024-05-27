const Match = require('../../models/match');
const { getAllMatches, getAllMatchesByTourId, updateNewsId } = require('../match');

jest.mock('../../models/match');

describe('Match Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllMatches', () => {
        it('should return all matches', async () => {
            const mockMatches = [{ id: 1, name: 'Match 1' }, { id: 2, name: 'Match 2' }];
            Match.getAllMatches.mockResolvedValue(mockMatches);

            const result = await getAllMatches();

            expect(result).toEqual(mockMatches);
            expect(Match.getAllMatches).toHaveBeenCalledTimes(1);
        });
    });

    describe('getAllMatchesByTourId', () => {
        it('should return all matches by tourId', async () => {
            const tourId = 1;
            const mockMatches = [{ id: 1, name: 'Match 1', tourId: 1 }, { id: 2, name: 'Match 2', tourId: 1 }];
            Match.getAllMatchesByTourId.mockResolvedValue(mockMatches);

            const result = await getAllMatchesByTourId(tourId);
            expect(result).toEqual(mockMatches);
            expect(Match.getAllMatchesByTourId).toHaveBeenCalledTimes(1);
            expect(Match.getAllMatchesByTourId).toHaveBeenCalledWith(tourId);
        });
    });

    describe('updateNewsId', () => {
        it('should update the newsId for a match', async () => {
            const matchId = 1;
            const newsId = 2;
            const mockUpdateResult = { affectedRows: 1 };
            Match.updateNewsId.mockResolvedValue(mockUpdateResult);

            const result = await updateNewsId(matchId, newsId);
            expect(result).toEqual(mockUpdateResult);
            expect(Match.updateNewsId).toHaveBeenCalledTimes(1);
            expect(Match.updateNewsId).toHaveBeenCalledWith(matchId, newsId);
        });
    });

});
