export const calcTimeFromMs = (ms: number | string, option: boolean) => {
  if (typeof ms === 'string') return;
  const date = new Date(ms);

  if (option) {
    const todayDate = new Date();
    const todayM = todayDate.getMonth() + 1;
    const todayD = todayDate.getDate();

    const m = date.getMonth() + 1;
    const d = date.getDate();
    if (todayM !== m || todayD !== d) return `${m}월 ${d}일`;
  }

  const h = date.getHours() ? date.getHours() : 24;
  const m = date.getMinutes().toString().padStart(2, '0');

  return `${h > 13 && h !== 24 ? '오후' : '오전'} ${h > 13 ? h - 12 : h}:${m}`;
};

export const calcDate = (time: string | number) => {
  if (typeof time === 'string') time = Date.parse(time);

  const date = new Date(time);

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return `${y}년 ${m}월 ${d}일`;
};
