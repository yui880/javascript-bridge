import MovingLog from './MovingLog.js';
import { INITIAL_TRY_COUNT } from '../constant/constant.js';

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;

  #movingLog;

  #movingState;

  #tryCount;

  constructor(bridge, movingLog = new MovingLog()) {
    this.#bridge = bridge;
    this.#movingLog = movingLog;
    this.#tryCount = INITIAL_TRY_COUNT;
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(targetTile) {
    this.determineMovingState(targetTile);
    this.#movingLog.updateLog({ direction: targetTile, canMove: this.#movingState });
  }

  determineMovingState(targetTile) {
    this.#movingState = this.#bridge.isAccessibleTile({
      position: this.#movingLog.getPosition(),
      bridgeTile: targetTile,
    });
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.#movingState = true;
    this.#movingLog.resetLog();
    this.#tryCount += 1;
  }

  isMovePossible() {
    return this.#movingState === true;
  }

  isArrival() {
    return this.#movingLog.getPosition() === this.#bridge.getSize();
  }

  getMovingLog() {
    return this.#movingLog.getLog();
  }

  getMovingState() {
    return this.#movingState;
  }

  getTryCount() {
    return this.#tryCount;
  }
}

export default BridgeGame;
