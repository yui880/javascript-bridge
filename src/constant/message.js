import { DIRECTION } from './bridge.js';
import { COMMAND } from './constant.js';

export const MESSAGE = Object.freeze({
  enterBridgeSize: '다리의 길이를 입력해주세요.',
  enterMoving: `이동할 칸을 선택해주세요. (위: ${DIRECTION.up.format}, 아래: ${DIRECTION.down.format})`,
  enterGameCommand: `게임을 다시 시도할지 여부를 입력해주세요. (재시도: ${COMMAND.retry}, 종료: ${COMMAND.quit})`,
  startMessage: '다리 건너기 게임을 시작합니다.',
  totalResult: '최종 게임 결과',
  isSuccess: '게임 성공 여부',
  tryCount: '총 시도한 횟수',
});

export const ERROR = {
  errorPrefix: '[ERROR]',
};
