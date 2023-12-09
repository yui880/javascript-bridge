import ValidationError from './ValidationError.js';
import { ERROR } from '../constant/message.js';

const Validator = {
  checkIsInteger(input) {
    if (!Number.isInteger(input)) {
      throw new ValidationError(ERROR.isNotInteger);
    }
  },
};

export default Validator;
