const hairName: { [key: string]: string } = {
  '-1': 'nohair',
  0: 'longhair',
  1: 'mophair',
  2: 'shorthair',
  3: 'spikeyhair',
  4: 'bowlhair',
  5: 'curlyhair',
};

const hairPos: { [key: string]: number } = {
  nohair: 0,
  longhair: 64,
  mophair: 128,
  shorthair: 192,
  spikeyhair: 256,
  bowlhair: 320,
  curlyhair: 384,
};

export { hairName, hairPos };
