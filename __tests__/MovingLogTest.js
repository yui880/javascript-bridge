import MovingLog from '../src/model/MovingLog.js';

describe('MovingLog 클래스 테스트', () => {
  describe('기능 테스트', () => {
    const movingLog = new MovingLog();

    test.each([
      { direction: 'U', canMove: 'false', expected: [{ direction: 'U', canMove: 'false' }] },
      {
        direction: 'D',
        canMove: 'true',
        expected: [
          { direction: 'U', canMove: 'false' }, // 앞선 테스트에 한 기록이 누적됨
          { direction: 'D', canMove: 'true' },
        ],
      },
    ])(
      '방향과 이동 가능 여부를 입력 받아 이동 기록를 업데이트 할 수 있다.',
      ({ direction, canMove, expected }) => {
        // when
        movingLog.updateLog({ direction, canMove });

        // then
        const result = movingLog.getLog();
        expect(result).toEqual(expected);
      },
    );

    test('이동 기록을 초기화 할 수 있다.', () => {
      // when
      movingLog.resetLog();

      //then
      const result = movingLog.getLog();
      const expected = [];
      expect(result).toEqual(expected);
    });
  });
});
