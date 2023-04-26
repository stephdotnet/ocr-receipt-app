import { format as prettyFormat } from 'pretty-format';
import envvars from '../env';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Haystack = undefined | null | any[] | Record<string, any>;

export const env = (key: string) => {
  return dataGetValue(envvars, key);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function dataGetValue(object: Haystack, key: string | number, defaultValue: any = null) {
  try {
    if (typeof object === 'undefined' || object === null) {
      return defaultValue;
    }

    const resolved = key
      .toString()
      .split('.')
      /* eslint-disable @typescript-eslint/no-explicit-any */
      .reduce(function (prev: { [x: string]: any }, curr: string | number) {
        return prev ? prev[curr] : defaultValue;
      }, object);

    return typeof resolved !== 'undefined' ? resolved : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function dump(value: any) {
  console.log(prettyFormat(value));
}

export function dumpError(error: any) {
  const errorDetailed = Object.keys(error).map((key) => {
    return { [key]: error[key] };
  });

  dump(errorDetailed);
}
