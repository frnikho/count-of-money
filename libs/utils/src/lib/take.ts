export const take = <T>(type: T, keys: Partial<keyof T>[]) => {
  const a: any = {};
  for (const objKey of keys) {
    a[objKey] = type[objKey];
  }
  return a;
}
