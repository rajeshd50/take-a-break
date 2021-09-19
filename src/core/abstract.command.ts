import { StdIoInterface } from "./std.io.int";

export abstract class AbstractCommand {
  private stdInt: StdIoInterface;
  constructor() {
    this.stdInt = new StdIoInterface()
  }
  writeStdOut(...arg: any[]): void {
    this.stdInt.stdOut(arg)
  }
  writeStdError(...arg: any[]): void {
    this.stdInt.stdError(arg)
  }

  abstract run(): Promise<any>
}