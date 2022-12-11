export const calcTime = (date: string) => {
  const time = date.split(/\D/g);
  return `${time[0]}년 ${time[1]}월 ${time[2]}일`;
};

export const formattingWalk = (walk: number | string) => {
  return walk.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
