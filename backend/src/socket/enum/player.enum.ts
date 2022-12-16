export enum directionOptions {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum stateOptions {
  WAIT = 'wait',
  RUN = 'run',
  WALK = 'walk',
  ROLL = 'roll',
  JUMP = 'jump',
  ATTACK = 'attack',
  SWIMMING = 'swimming',
}

export enum userStateOptions {
  ON = 'on',
  OFF = 'off',
  BUSY = 'busy',
  CALL_REQUESTING = 'callRequesting',
}

export const initPositionByRoomName = {
  town: {
    x: 800,
    y: 800,
  },
  Maze: {
    x: 1000,
    y: 1500,
  },
  Running: {
    x: 1750,
    y: 1900,
  },
  Survival: {
    x: 1000,
    y: 1500,
  },
};
