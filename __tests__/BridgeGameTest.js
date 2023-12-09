import BridgeGame from '../src/model/BridgeGame.js';
import Bridge from '../src/model/Bridge.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const mockBridge = ({ getSize = 0, isAccessibleTile = false }) => ({
  getSize: jest.fn(() => getSize),
  isAccessibleTile: jest.fn(() => isAccessibleTile),
});

describe('BridgeGame 클래스 테스트', () => {
  describe('기능 테스트', () => {
    test.each([
      {
        targetTile: 'U',
        random: [1, 1, 1],
        expected: [{ direction: 'U', canMove: true }],
      },
      {
        targetTile: 'D',
        random: [1, 0, 1],
        expected: [{ direction: 'D', canMove: false }],
      },
    ])(
      '이동하려는 타일을 입력받아 이동할 수 있다.(이동 기록을 저장할 수 있다.)',
      ({ targetTile, random, expected }) => {
        // given
        mockRandoms(random);
        const bridgeGame = new BridgeGame(new Bridge(random.length));

        // when
        bridgeGame.move(targetTile);
        const result = bridgeGame.getMovingLog();

        // then
        expect(result).toStrictEqual(expected);
      },
    );

    test('재시작시 시도 횟수를 증가시킬 수 있다.', () => {
      // when
      const bridgeGame = new BridgeGame(new Bridge(3));
      bridgeGame.retry();
      const result = bridgeGame.getTryCount();

      // then
      expect(result).toBe(2);
    });

    test.each([
      {
        targetTile: 'U',
        random: [1, 1, 1], // [U, U, U]
        expected: true, // 올바른 곳으로 이동해서 이동 가능
      },
      {
        targetTile: 'D',
        random: [1, 0, 1], // [U, D, U]
        expected: false, // 올바르지 못한 곳으로 이동해서 이동 불가능
      },
    ])('이동 가능한 상태인지 파악할 수 있다.', ({ targetTile, random, expected }) => {
      // given
      mockRandoms(random);
      const bridgeGame = new BridgeGame(new Bridge(random.length));

      // when
      bridgeGame.move(targetTile);
      const result = bridgeGame.isMovePossible();

      // then
      expect(result).toBe(expected);
    });

    test.each([
      {
        targetTile: 'U',
        bridgeSize: 1,
        expected: true, // 도착
      },
      {
        targetTile: 'D',
        bridgeSize: 3,
        expected: false, // 도착 x
      },
    ])('현재 도착한 상태인지 파악할 수 있다.', ({ targetTile, bridgeSize, expected }) => {
      // given
      const bridgeMock = mockBridge({ getSize: bridgeSize });
      const bridgeGame = new BridgeGame(bridgeMock);

      // when
      bridgeGame.move(targetTile);
      const result = bridgeGame.isArrival();

      // then
      expect(result).toBe(expected);
    });
  });
});
