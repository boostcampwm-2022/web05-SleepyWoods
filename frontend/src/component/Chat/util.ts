export const calcTimeFromMs = (ms: number | string) => {
  if (typeof ms === 'string') return '';

  const date = new Date(ms);
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');

  return `${h}:${m}`;
};
