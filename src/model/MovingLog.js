class MovingLog {
  #log;

  constructor() {
    this.#log = [];
  }

  updateLog({ direction, canMove }) {
    this.#log.push({ direction, canMove });
  }
}

export default MovingLog;
