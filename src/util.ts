import { exec as exec_ } from "child_process";
import { promisify } from 'util';
export const exec = promisify(exec_)

export function messageAndExit(status: number, msg: string) {
  console.log(msg);
  process.exit(status);
}
