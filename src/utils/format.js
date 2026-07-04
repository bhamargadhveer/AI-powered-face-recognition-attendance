export const formatNumber = (n) =>
  new Intl.NumberFormat("en-US").format(n);

export const pct = (n) => `${Math.round(n)}%`;

export const initials = (name = "") =>
  name
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const debounce = (fn, ms = 250) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};