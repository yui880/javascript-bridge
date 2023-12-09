import BridgeMaker from '../BridgeMaker.js';
import BridgeRandomNumberGenerator from '../BridgeRandomNumberGenerator.js';
import Validator from '../validator/Validator.js';

class Bridge {
  #accessibleBridge;

  constructor(bridgeSize) {
    Validator.validateBridgeSize(bridgeSize);
    this.#makeBridge(bridgeSize);
  }

  #makeBridge(bridgeSize) {
    this.#accessibleBridge = BridgeMaker.makeBridge(
      bridgeSize,
      BridgeRandomNumberGenerator.generate,
    );
  }

  isAccessibleTile({ position, bridgeTile }) {
    return this.#accessibleBridge[position] === bridgeTile;
  }

  getSize() {
    return this.#accessibleBridge.length;
  }
}

export default Bridge;
