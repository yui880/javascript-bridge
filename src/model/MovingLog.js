class MovingLog {
  #log;

  constructor() {
    this.#log = [];
  }

  updateLog({ direction, canMove }) {
    this.#log.push({ direction, canMove });
  }

  getPosition() {
    return this.#log.length;
  }
}

export default MovingLog;
