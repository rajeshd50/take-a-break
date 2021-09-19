import chalk from "chalk"

export class StdIoInterface {
  constructor() {}

  stdOut(...args: any[]) {
    console.log(chalk.green.bgBlack(args))
  }
  stdError(...args: any[]) {
    console.error(chalk.red.bgBlack(args))
  }
}