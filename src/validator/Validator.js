import ValidationError from './ValidationError.js';
import { ERROR } from '../constant/message.js';
import { BRIDGE_SIZE } from '../constant/bridge.js';

const Validator = {
  checkIsInteger(input) {
    if (!Number.isInteger(input)) {
      throw new ValidationError(ERROR.isNotInteger);
    }
  },

  checkValidSize(input) {
    if (Number(input) < BRIDGE_SIZE.min || Number(input) > BRIDGE_SIZE.max) {
      throw new ValidationError(ERROR.invalidBridgeSize);
    }
  },
};

export default Validator;
