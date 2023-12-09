import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import BridgeGameController from '../src/controller/BridgeGameController.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe('BridgeGameController 클래스 테스트', () => {
  describe('기능 테스트(통합 테스트)', () => {
    test.each([
      {
        question: ['3', 'U', 'U', 'U'],
        random: [1, 1, 1],
        expected: [
          '최종 게임 결과',
          '[ O | O | O ]',
          '[   |   |   ]',
          '게임 성공 여부: 성공',
          '총 시도한 횟수: 1',
        ],
      },
      {
        question: ['3', 'D', 'R', 'U', 'D', 'U'],
        random: [1, 0, 1],
        expected: [
          '[   ]',
          '[ X ]',
          '최종 게임 결과',
          '[ O |   | O ]',
          '[   | O |   ]',
          '게임 성공 여부: 성공',
          '총 시도한 횟수: 2',
        ],
      },
      {
        question: ['5', 'D', 'Q'],
        random: [1, 0, 1],
        expected: ['최종 게임 결과', '[   ]', '[ X ]', '게임 성공 여부: 실패', '총 시도한 횟수: 1'],
      },
    ])('다리 건너기 게임을 실행할 수 있다.', async ({ question, random, expected }) => {
      // given
      mockQuestions(question);
      mockRandoms(random);
      const logSpy = getLogSpy();

      // when
      const bridgeGameController = new BridgeGameController();
      await bridgeGameController.play();

      // then
      const log = getOutput(logSpy);
      expectLogContains(log, expected);
    });
  });
});
