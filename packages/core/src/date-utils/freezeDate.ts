/**
 * Retrieves the method names available on the `Date` prototype.
 *
 * This function returns an array of strings representing all the method names
 * that exist on the prototype of a `Date` object. It filters out any properties
 * that are not functions, effectively providing only callable methods.
 *
 * @returns An array of method names available on the `Date` prototype.
 *
 * @example
 * // Example usage
 * getDateMethods();
 * // Output: ['getDate', 'getDay', 'getFullYear', ...]
 */
function getDateMethods(): string[] {
  const datePrototype = Object.getPrototypeOf(new Date());
  const propertyNames = Object.getOwnPropertyNames(datePrototype);

  const methods = propertyNames.filter((propertyName) => {
    const property = datePrototype[propertyName];
    return typeof property === 'function';
  });

  return methods;
}

/**
 * Retrieves the setter methods available on the `Date` prototype.
 *
 * This function returns an array of strings representing the setter methods
 * that start with 'set' on the `Date` prototype. These methods can be used to
 * modify the individual parts of a `Date` object, such as setting the year, month, day, etc.
 *
 * @returns An array of setter method names available on the `Date` prototype.
 *
 * @example
 * // Example usage
 * getDateSetters();
 * // Output: ['setDate', 'setFullYear', 'setHours', ...]
 */
function getDateSetters(): string[] {
  const methods = getDateMethods();
  const setters = methods.filter((method) => method.startsWith('set'));

  return setters;
}

/**
 * Creates a frozen `Date` object where setter methods throw errors.
 *
 * This function takes a `Date` object and returns a new proxy-wrapped date object.
 * Any attempts to call setter methods (e.g., `setFullYear`, `setMonth`, etc.) will
 * throw an error, effectively making the date immutable.
 *
 * @param date - The `Date` object to be frozen.
 * @returns A new `Date` object proxy that prevents modifications.
 *
 * @example
 * // Example usage
 * const frozenDate = freezeDate(new Date('2024-01-01'));
 * frozenDate.setFullYear(2025); // Throws an error: Cannot set property setFullYear of frozen Date object
 */
export const freezeDate = (date: Date) => new Proxy(date, handler);

const DATE_SETTERS = [...getDateSetters()] as const;

const handler: ProxyHandler<Date> = {
  get(target, prop: keyof Date, receiver) {
    if (typeof prop === 'string' && DATE_SETTERS.includes(prop)) {
      return function () {
        throw new Error(`Cannot set property ${prop} of frozen Date object`);
      };
    }
    const value = Reflect.get(target, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(target);
    }
    return value;
  },
};
