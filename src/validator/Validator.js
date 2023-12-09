import ValidationError from './ValidationError.js';
import { ERROR } from '../constant/message.js';
import { BRIDGE_SIZE, DIRECTION_COMMAND } from '../constant/bridge.js';
import { COMMAND } from '../constant/constant.js';

const Validator = {
  validateBridgeSize(bridgeSize) {
    this.checkIsInteger(bridgeSize);
    this.checkIsValidSize(bridgeSize);
  },

  validateMoving(moving) {
    this.checkIsValidCommand(moving, DIRECTION_COMMAND);
  },

  validateGameCommand(command) {
    this.checkIsValidCommand(command, Object.values(COMMAND));
  },

  checkIsInteger(input) {
    if (!Number.isInteger(input)) {
      throw new ValidationError(ERROR.isNotInteger);
    }
  },

  checkIsValidSize(input) {
    if (Number(input) < BRIDGE_SIZE.min || Number(input) > BRIDGE_SIZE.max) {
      throw new ValidationError(ERROR.invalidBridgeSize);
    }
  },

  checkIsValidCommand(input, commandList) {
    if (!commandList.includes(input)) {
      throw new ValidationError(ERROR.invalidCommand(commandList));
    }
  },
};

export default Validator;
