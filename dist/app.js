"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const config_1 = require("./config");
const abstract_command_1 = require("./core/abstract.command");
const iohook_1 = __importDefault(require("iohook"));
const robotjs_1 = __importDefault(require("robotjs"));
class App extends abstract_command_1.AbstractCommand {
    constructor() {
        super();
        this.screenHeight = 0;
        this.screenWidth = 0;
        this.workProcessInterval = null;
        this.counter = 0;
        const screenSize = robotjs_1.default.getScreenSize();
        this.screenHeight = screenSize.height;
        this.screenWidth = screenSize.width;
        iohook_1.default.start();
        iohook_1.default.registerShortcut([29, 20], (keys) => {
            iohook_1.default.stop();
            this.writeStdOut('Stopping tab');
            this.stopRobotRandomEvents();
            process.exit(0);
        });
    }
    async run() {
        try {
            this.writeStdOut('Starting tab, press `Ctrl+T` to stop');
            await this.startRobotRandomEvents();
            return true;
        }
        catch (e) {
            return e;
        }
    }
    async startRobotRandomEvents() {
        try {
            if (this.workProcessInterval) {
                clearInterval(this.workProcessInterval);
            }
            this.workProcessInterval = setInterval(() => {
                this.startAnyEventMouseOrKeyboard();
            }, 1000 * 30);
        }
        catch (e) {
            return e;
        }
    }
    async stopRobotRandomEvents() {
        try {
            if (this.workProcessInterval) {
                clearInterval(this.workProcessInterval);
            }
        }
        catch (e) {
            return e;
        }
    }
    startAnyEventMouseOrKeyboard() {
        this.counter++;
        this.stopRobotRandomEvents();
        if (this.counter % 2 === 0) {
            this.drawCircle();
        }
        else {
            this.openNotepadAndType();
        }
        this.startRobotRandomEvents();
    }
    openNotepadAndType() {
        robotjs_1.default.setKeyboardDelay(500);
        robotjs_1.default.keyTap('r', 'command');
        robotjs_1.default.typeString('notepad');
        robotjs_1.default.keyTap('enter');
        robotjs_1.default.setKeyboardDelay(0);
        let randomNo = 4 + Math.ceil(Math.random() * 2);
        for (let i = 0; i < randomNo; i++) {
            let randomWord = config_1.config.random_words[Math.floor(Math.random() * config_1.config.random_words.length)];
            robotjs_1.default.typeString(randomWord);
        }
        robotjs_1.default.keyTap('w', 'control');
        robotjs_1.default.keyTap('right');
        robotjs_1.default.keyTap('enter');
    }
    drawCircle() {
        try {
            let cx = this.screenWidth / 2;
            let cy = this.screenHeight / 2;
            let r = cy / 1.4;
            robotjs_1.default.setMouseDelay(20);
            for (let i = 0; i <= 360; i++) {
                let dx = cx + (r * Math.cos(i * Math.PI / 180));
                let dy = cy + (r * Math.sin(i * Math.PI / 180));
                robotjs_1.default.moveMouse(dx, dy);
            }
        }
        catch (e) { }
    }
}
exports.App = App;
