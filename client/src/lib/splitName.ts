export const spltName = (first: string, last: string): string => {
  const x = first.length;
  if (last) {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  }
  if (first.length >= 2) {
    return `${first.charAt(0)}${first.charAt(x - 1)}`.toUpperCase();
  }
  return first;
};
