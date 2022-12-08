export const calcTimeFromMs = (ms: number) => {
  const date = new Date(ms);
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');

  return `${h}:${m}`;
};
