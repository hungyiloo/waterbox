/**
 * Gets a single element by ID
 * @param {string} id The ID to search for
 * @returns The resulting single element, null if not found
 */
export function getById<E extends HTMLElement = HTMLElement>(id: string): E {
  return document.querySelector<E>(`#${id}`);
}

/**
 * Gets all elements by matching their class names
 * @param {string} className The class name to search for
 * @returns The resulting collection of elements, empty array if nothing found
 */
export function getByClass<E extends HTMLElement = HTMLElement>(className: string): E[] {
  return Array.from(document.querySelectorAll<E>(`.${className}`));
}

/**
 * Gets the first element by matching its class name
 * @param {string} className The class name to search for
 * @returns The resulting single element, null if not found
 */
export function getFirstByClass<E extends HTMLElement = HTMLElement>(className: string): E {
  return document.querySelector<E>(`.${className}`);
}
