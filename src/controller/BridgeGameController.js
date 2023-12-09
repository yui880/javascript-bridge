import InputView from '../view/InputView.js';
import Bridge from '../model/Bridge.js';

class BridgeGameController {
  #bridgeGame;

  async play() {
    const bridgeSize = await this.#getBridgeSize();
    const bridge = new Bridge(bridgeSize);
  }

  async #getBridgeSize() {
    const bridgeSize = await InputView.readBridgeSize();

    return Number(bridgeSize);
  }
}

export default BridgeGameController;
