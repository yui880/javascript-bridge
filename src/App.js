import BridgeGameController from './controller/BridgeGameController.js';

class App {
  #bridgeGameController;

  constructor(bridgeGameController = new BridgeGameController()) {
    this.#bridgeGameController = bridgeGameController;
  }

  async play() {
    await this.#bridgeGameController.play();
  }
}

export default App;
