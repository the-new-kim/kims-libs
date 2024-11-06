function getDateMethods(): string[] {
  const datePrototype = Object.getPrototypeOf(new Date());
  const propertyNames = Object.getOwnPropertyNames(datePrototype);

  const methods = propertyNames.filter((propertyName) => {
    const property = datePrototype[propertyName];
    return typeof property === 'function';
  });

  return methods;
}

function getDateSetters(): string[] {
  const methods = getDateMethods();
  const setters = methods.filter((method) => method.startsWith('set'));

  return setters;
}

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

export const freezeDate = (date: Date) => new Proxy(date, handler);
