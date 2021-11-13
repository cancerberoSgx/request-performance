let _counter = 0
export function counter() {
  return _counter++
}
/**
 * adds a parameter named `param` with a value that tries to be unique. The intending behavior is to add a "nocache" parameter
 */
export function addUniqueParameter(url: string, param: string) {
  const value = `${counter()+Math.random()}`//.replace(/\./g, '')
  if (url.includes('?')) {
    return `${url}&${param}=${value}`;
  } else {
    return `${url}?${param}=${value}`;
  }
}

import { exec as exec_ } from "child_process";
import { promisify } from 'util';
export const exec = promisify(exec_)

export const average = (arr: number[]) => arr.reduce((a,b) => a + b, 0) / arr.length;
export const median = (arr: number[]) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};