/**
 * Security & Sanitization Utilities for ZIPS Backend
 */

/**
 * Escapes regex special characters in user input to prevent ReDoS and Regex Injection
 * @param {string} text 
 * @returns {string} escaped string safe for RegExp constructor
 */
export const escapeRegex = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

/**
 * Ensures value is a valid string, safely trimmed
 * @param {*} val 
 * @returns {string}
 */
export const sanitizeString = (val) => {
  if (typeof val !== 'string') return '';
  return val.trim();
};

/**
 * Validates that an input is a non-empty string
 * @param {*} val 
 * @returns {boolean}
 */
export const isNonEmptyString = (val) => {
  return typeof val === 'string' && val.trim().length > 0;
};
