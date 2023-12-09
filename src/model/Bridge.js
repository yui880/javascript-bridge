import BridgeMaker from '../BridgeMaker.js';
import BridgeRandomNumberGenerator from '../BridgeRandomNumberGenerator.js';

class Bridge {
  #accessibleBridge;

  constructor(bridgeSize) {
    this.#makeBridge(bridgeSize);
  }

  #makeBridge(bridgeSize) {
    this.#accessibleBridge = BridgeMaker.makeBridge(
      bridgeSize,
      BridgeRandomNumberGenerator.generate,
    );
  }
}

export default Bridge;
