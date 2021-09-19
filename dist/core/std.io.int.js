"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StdIoInterface = void 0;
const chalk_1 = __importDefault(require("chalk"));
class StdIoInterface {
    constructor() { }
    stdOut(...args) {
        console.log(chalk_1.default.green.bgBlack(args));
    }
    stdError(...args) {
        console.error(chalk_1.default.red.bgBlack(args));
    }
}
exports.StdIoInterface = StdIoInterface;
