/**
 * Canonical form used to decide whether two quiz titles are the same:
 * case-insensitive, ignoring leading/trailing and repeated whitespace
 */
export const normalizeQuizTitle = (title: string): string =>
  title.trim().replace(/\s+/g, " ").toLowerCase();
