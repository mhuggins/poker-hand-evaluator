import * as oddsAsyncModule from '../../oddsAsync';
import { oddsPineappleAsync } from '../../helpers/oddsPineappleAsync';
import { Card, Hand } from '../../types';

describe('oddsPineappleAsync', () => {
  const callback = () => {};

  it('delegates to `oddsAsync`', () => {
    const oddsAsyncSpy = jest.spyOn(oddsAsyncModule, 'oddsAsync');

    const allHoleCards: Hand[] = [
      ['As', 'Kd', 'Ts'],
      ['Jd', 'Jh', '2h'],
    ];
    const communityCards: Card[] = ['Ac', '9h', 'Qd', '2d', '2s'];

    const abort = oddsPineappleAsync({ allHoleCards, communityCards, callback });
    abort();

    expect(oddsAsyncSpy).toHaveBeenCalledWith({
      allHoleCards,
      communityCards,
      expectedCommunityCardCount: 5,
      expectedHoleCardCount: 3,
      minimumHoleCardsUsed: 0,
      maximumHoleCardsUsed: 2,
      callback,
    });
  });

  it('throws if too many hole cards are provided', () => {
    const allHoleCards: Hand[] = [
      ['As', 'Kd', 'Ts', 'Td'],
      ['Jd', 'Jh', '2h', '5c'],
    ];
    const communityCards: Card[] = ['Ac', '9h', 'Qd', '2d', '2s'];

    expect(() => oddsPineappleAsync({ allHoleCards, communityCards, callback })).toThrow(
      'Each collection of hole cards accept a maximum of 3 elements',
    );
  });

  it('throws if too many community cards are provided', () => {
    const allHoleCards: Hand[] = [
      ['As', 'Kd', 'Ts'],
      ['Jd', 'Jh', '2h'],
    ];
    const communityCards: Card[] = ['Ac', '9h', 'Qd', '2d', '2s', 'Td'];

    expect(() => oddsPineappleAsync({ allHoleCards, communityCards, callback })).toThrow(
      'communityCards accepts a maximum of 5 elements',
    );
  });
});