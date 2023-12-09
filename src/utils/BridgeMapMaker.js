import { DIRECTION, LOG } from '../constant/bridge.js';

const BridgeMapMaker = {
  bridgeMap: [],

  makeMap(movingLog) {
    this.initMap(movingLog);
    this.updateBridgeMap(movingLog);

    return this.bridgeMap;
  },

  initMap(movingLog) {
    this.bridgeMap = Array.from({ length: DIRECTION.length }, () =>
      new Array(movingLog.length).fill(''),
    );
  },

  updateBridgeMap(movingLog) {
    movingLog.forEach(({ direction, canMove }, index) => {
      if (direction === DIRECTION.up.format) {
        this.bridgeMap[DIRECTION.up.position][index] = LOG[canMove];
        return;
      }
      this.bridgeMap[DIRECTION.down.position][index] = LOG[canMove];
    });
  },
};

export default BridgeMapMaker;