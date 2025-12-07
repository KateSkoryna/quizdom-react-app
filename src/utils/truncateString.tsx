// truncate news description and title
export const truncateString = (s: string, w: number): string =>
  s.length > w ? s.slice(0, w) + "..." : s;
