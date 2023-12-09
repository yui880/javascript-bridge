import { MissionUtils } from '@woowacourse/mission-utils';
import Bridge from '../src/model/Bridge.js';
import { BRIDGE_SIZE } from '../src/constant/bridge.js';
import { ERROR } from '../src/constant/message.js';

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

describe('Bridge 클래스 테스트', () => {
  describe('기능 테스트', () => {
    test.each([
      {
        random: [1, 1, 0], // [U,U,D]
        position: 0, // 0번째(첫번째) 위치의 다리를 검사
        guessTile: 'U',
        expected: true,
      },
      {
        random: [0, 1, 0, 1, 1], // [D,U,D,U,U]
        position: 4, // 0번째(첫번째) 위치의 다리를 검사
        guessTile: 'D',
        expected: false,
      },
    ])(
      '특정 다리의 칸이 건널 수 있는 칸인지 판단할 수 있다.',
      ({ random, position, guessTile, expected }) => {
        // given
        mockRandoms(random);

        // when
        const bridge = new Bridge(random.length);
        const result = bridge.isAccessibleTile({ position, bridgeTile: guessTile });

        // then
        expect(result).toBe(expected);
      },
    );
  });

  describe('예외 테스트', () => {
    test.each([['유나'], ['3a'], [3.14]])(
      '다리의 길이가 정수가 아니면 예외가 발생한다.',
      (input) => {
        expect(() => new Bridge(input)).toThrow(ERROR.errorPrefix);
      },
    );

    test.each([[BRIDGE_SIZE.min - 1], [BRIDGE_SIZE.max + 1]])(
      `다리의 길이가 ${BRIDGE_SIZE.min}~${BRIDGE_SIZE.max} 사이의 값이 아니면 예외가 발생한다.`,
      (input) => {
        expect(() => new Bridge(input)).toThrow(ERROR.errorPrefix);
      },
    );
  });
});
