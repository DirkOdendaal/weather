/**
 * Get the day of the week from a date string
 * @param dateString the date string to get the day of the week from.
 * @returns the day of the week.
 */
export const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", { weekday: "long" });
};

/**
 * Capitalize the first letter of each word in a string
 * @param str the string to capitalize.
 * @returns the capitalized string.
 */
export const capitalizeWords = (str: string): string => str.replace(/\b\w/g, (char) => char.toUpperCase());

