export const calcTime = (date: string) => {
  const time = date.split(/\D/g);
  return `${time[3]}:${time[4]}`;
};

export const nowTime = () => {
  const date = new Date();
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');

  return `${h}:${m}`;
};
