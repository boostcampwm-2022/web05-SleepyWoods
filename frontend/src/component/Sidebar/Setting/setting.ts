type deviceType = {
  deviceId: string;
  groupId: string;
  label: string;
};

export type deviceListType = {
  [key: string]: deviceType[];
};

export type deviceComponentType = {
  kind: string;
  device: deviceType[];
};
