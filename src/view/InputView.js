import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constant/message.js';

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  async readBridgeSize() {
    return await Console.readLineAsync(`${MESSAGE.enterBridgeSize}\n`);
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  async readMoving() {
    return await Console.readLineAsync(`${MESSAGE.enterMoving}\n`);
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  async readGameCommand() {
    return await Console.readLineAsync(`${MESSAGE.enterGameCommand}\n`);
  },
};

export default InputView;
