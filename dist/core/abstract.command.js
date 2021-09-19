"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCommand = void 0;
const std_io_int_1 = require("./std.io.int");
class AbstractCommand {
    constructor() {
        this.stdInt = new std_io_int_1.StdIoInterface();
    }
    writeStdOut(...arg) {
        this.stdInt.stdOut(arg);
    }
    writeStdError(...arg) {
        this.stdInt.stdError(arg);
    }
}
exports.AbstractCommand = AbstractCommand;
