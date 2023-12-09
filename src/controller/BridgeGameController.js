import InputView from '../view/InputView.js';
import Bridge from '../model/Bridge.js';
import BridgeGame from '../model/BridgeGame.js';
import { COMMAND } from '../constant/constant.js';
import OutputView from '../view/OutputView.js';
import Validator from '../validator/Validator.js';

class BridgeGameController {
  #bridgeGame;

  async play() {
    OutputView.printStartMessage();
    const bridge = await this.handleException(() => this.#getBridge());
    this.#bridgeGame = new BridgeGame(bridge);

    await this.#gameLoop();
    this.#printResult();
  }

  async #gameLoop() {
    while (true) {
      const movingTile = await this.handleException(() => this.#getMoving());
      this.#bridgeGame.move(movingTile);
      OutputView.printMap(this.#bridgeGame.getMovingLog());

      if (!this.#bridgeGame.isMovePossible()) break;
      if (this.#bridgeGame.isArrival()) break;
    }

    if (!this.#bridgeGame.isMovePossible()) await this.#decideRetry();
  }

  async #decideRetry() {
    const command = await this.handleException(() => this.#getGameCommand());

    if (command === COMMAND.retry) {
      this.#bridgeGame.retry();
      return await this.#gameLoop();
    }
  }

  #printResult() {
    OutputView.printResult({
      movingLog: this.#bridgeGame.getMovingLog(),
      isSuccess: this.#bridgeGame.getMovingState(),
      tryCount: this.#bridgeGame.getTryCount(),
    });
  }

  async handleException(callback) {
    while (true) {
      try {
        return await callback();
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  async #getBridge() {
    const bridgeSize = await InputView.readBridgeSize();

    return new Bridge(Number(bridgeSize));
  }

  async #getMoving() {
    const moving = await InputView.readMoving();
    Validator.validateMoving(moving);

    return moving;
  }

  async #getGameCommand() {
    const command = await InputView.readGameCommand();
    Validator.validateGameCommand(command);

    return command;
  }
}

export default BridgeGameController;
