import InputView from '../view/InputView.js';
import Bridge from '../model/Bridge.js';
import BridgeGame from '../model/BridgeGame.js';

class BridgeGameController {
  #bridgeGame;

  async play() {
    const bridgeSize = await this.#getBridgeSize();
    const bridge = new Bridge(bridgeSize);
    this.#bridgeGame = new BridgeGame(bridge);

    await this.gameLoop();
  }

  async gameLoop() {
    while (true) {
      const movingTile = await this.#getMoving();
      this.#bridgeGame.move(movingTile);

      if (!this.#bridgeGame.isMovePossible()) break;
      if (this.#bridgeGame.isArrival()) break;
    }
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
