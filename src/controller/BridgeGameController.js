import InputView from '../view/InputView.js';
import Bridge from '../model/Bridge.js';
import BridgeGame from '../model/BridgeGame.js';

class BridgeGameController {
  #bridgeGame;

  async play() {
    const bridgeSize = await this.#getBridgeSize();
    const bridge = new Bridge(bridgeSize);
    this.#bridgeGame = new BridgeGame(bridge);

    const movingTile = await this.#getMoving();
    this.#bridgeGame.move(movingTile);
  }

  async #getBridgeSize() {
    const bridgeSize = await InputView.readBridgeSize();

    return Number(bridgeSize);
  }

  async #getMoving() {
    const moving = await InputView.readMoving();

    return moving;
  }
}

export default BridgeGameController;
