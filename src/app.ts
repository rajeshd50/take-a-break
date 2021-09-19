import { config } from "./config";
import { AbstractCommand } from "./core/abstract.command";
import ioHook from 'iohook'
import robot from 'robotjs'

export class App extends AbstractCommand {
  private screenHeight: number = 0
  private screenWidth: number = 0
  private keyboardInterval: NodeJS.Timer | null = null
  private mouseInterval: NodeJS.Timer | null = null
  constructor() {
    super()
    const screenSize = robot.getScreenSize()
    this.screenHeight = screenSize.height
    this.screenWidth = screenSize.width
    ioHook.start()
    ioHook.registerShortcut([29, 20], (keys: any) => {
      ioHook.stop()
      this.writeStdOut('Stopping tab')
      this.stopRobotMouse()
      this.startRobotKeyboard()
      process.exit(0) 
    })
  }
  async run(): Promise<any> {
    try {
      this.writeStdOut('Starting tab, press `Ctrl+T` to stop')
      await this.startRobotMouse()
      // await this.startRobotKeyboard()
      return true
    } catch(e: any) {
      return e
    }
  }

  async startRobotKeyboard() {
    try {
      if (this.keyboardInterval) {
        clearInterval(this.keyboardInterval)
      }
      this.keyboardInterval = setInterval(() => {
        this.sendRandomKeys()
      }, 1000*60)
    } catch(e: any) {
      return e
    }
  }
  async stopRobotKeyboard() {
    try {
      if (this.keyboardInterval) {
        clearInterval(this.keyboardInterval)
      }
    } catch(e: any) {
      return e
    }
  }
  async startRobotMouse() {
    try {
      if (this.mouseInterval) {
        clearInterval(this.mouseInterval)
      }
      this.mouseInterval = setInterval(() => {
        this.drawCircle()
      }, 1000*30)
    } catch(e: any) {
      return e
    }
  }
  async stopRobotMouse() {
    try {
      if (this.mouseInterval) {
        clearInterval(this.mouseInterval)
      }
    } catch(e: any) {
      return e
    }
  }

  private sendRandomKeys() {
    try {
      robot.setKeyboardDelay(1000)
      robot.typeString(config.random_words[Math.floor(Math.random() * config.random_words.length)])
      robot.keyTap('enter')
      robot.keyTap('tab')
    } catch(e: any) {}
  }
  private drawCircle() {
    try {
      let cx = this.screenWidth / 2
      let cy = this.screenHeight / 2
      let r = cy / 1.4
      robot.setMouseDelay(20)
      for (let i = 0; i <= 360; i++) {
        let dx = cx + (r * Math.cos(i*Math.PI/180))
        let dy = cy + (r * Math.sin(i*Math.PI/180))
        robot.moveMouse(dx, dy)
      }
    } catch(e: any) {}
  }
}