import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constant/message.js';
import { BRIDGE_SEPARATOR } from '../constant/constant.js';
import BridgeMapMaker from '../utils/BridgeMapMaker.js';

/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputView = {
  printStartMessage() {
    Console.print(`${MESSAGE.startMessage}\n`);
  },
  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printMap(movingLog) {
    const bridgeMap = BridgeMapMaker.makeMap(movingLog);
    bridgeMap.forEach((bridgeLine) => {
      Console.print(`[ ${bridgeLine.join(BRIDGE_SEPARATOR)} ]`);
    });
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult() {},
};

export default OutputView;
