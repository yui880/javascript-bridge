import InputView from '../view/InputView.js';
import Bridge from '../model/Bridge.js';
import BridgeGame from '../model/BridgeGame.js';
import { COMMAND } from '../constant/constant.js';
import OutputView from '../view/OutputView.js';

class BridgeGameController {
  #bridgeGame;

  async play() {
    OutputView.printStartMessage();
    const bridgeSize = await this.#getBridgeSize();
    const bridge = new Bridge(bridgeSize);
    this.#bridgeGame = new BridgeGame(bridge);

    await this.gameLoop();
    await this.decideRetry();
  }

  async gameLoop() {
    while (true) {
      const movingTile = await this.#getMoving();
      this.#bridgeGame.move(movingTile);

      if (!this.#bridgeGame.isMovePossible()) break;
      if (this.#bridgeGame.isArrival()) break;
    }
  }

  async decideRetry() {
    const command = await this.#getGameCommand();

    if (command === COMMAND.retry) {
      this.#bridgeGame.retry();
      return await this.gameLoop();
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

  async #getGameCommand() {
    const command = await InputView.readGameCommand();

    return command;
  }
}

export default BridgeGameController;
