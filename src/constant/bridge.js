export const DIRECTION = Object.freeze({
  up: {
    random: 1,
    position: 0,
    format: 'U',
  },
  down: {
    random: 0,
    position: 1,
    format: 'D',
  },
});

export const LOG = Object.freeze({
  true: {
    format: 'O',
    result: '성공',
  },
  false: {
    format: 'X',
    result: '실패',
  },
});
