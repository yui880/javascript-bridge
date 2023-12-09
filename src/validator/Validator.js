import ValidationError from './ValidationError.js';
import { ERROR } from '../constant/message.js';
import { BRIDGE_SIZE } from '../constant/bridge.js';

const Validator = {
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
