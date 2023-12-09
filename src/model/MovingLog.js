class MovingLog {
  #log;

  constructor() {
    this.#log = [];
  }

  updateLog({ direction, canMove }) {
    this.#log.push({ direction, canMove });
  }

  resetLog() {
    this.#log = [];
  }

  getPosition() {
    return this.#log.length;
  }

  getLog() {
    return this.#log;
  }
}

export default MovingLog;
