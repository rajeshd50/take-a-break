import { config } from "./config";
import { AbstractCommand } from "./core/abstract.command";
import ioHook from 'iohook'
import robot from 'robotjs'

export class App extends AbstractCommand {
  private screenHeight: number = 0
  private screenWidth: number = 0
  private workProcessInterval: NodeJS.Timer | null = null
  private counter = 0
  constructor() {
    super()
    const screenSize = robot.getScreenSize()
    this.screenHeight = screenSize.height
    this.screenWidth = screenSize.width
    ioHook.start()
    ioHook.registerShortcut([29, 20], (keys: any) => {
      ioHook.stop()
      this.writeStdOut('Stopping tab')
      this.stopRobotRandomEvents()
      process.exit(0) 
    })
  }
  async run(): Promise<any> {
    try {
      this.writeStdOut('Starting tab, press `Ctrl+T` to stop')
      await this.startRobotRandomEvents()
      return true
    } catch(e: any) {
      return e
    }
  }

  async startRobotRandomEvents() {
    try {
      if (this.workProcessInterval) {
        clearInterval(this.workProcessInterval)
      }
      this.workProcessInterval = setInterval(() => {
        this.startAnyEventMouseOrKeyboard()
      }, 1000*30)
    } catch(e: any) {
      return e
    }
  }
  async stopRobotRandomEvents() {
    try {
      if (this.workProcessInterval) {
        clearInterval(this.workProcessInterval)
      }
    } catch(e: any) {
      return e
    }
  }

  private startAnyEventMouseOrKeyboard() {
    this.counter++
    this.stopRobotRandomEvents()
    if (this.counter % 2 === 0) {
      this.drawCircle()
    } else {
      this.openNotepadAndType()
    }
    this.startRobotRandomEvents()
  }
  private openNotepadAndType() {
    robot.setKeyboardDelay(500)
    robot.keyTap('r', 'command')
    robot.typeString('notepad')
    robot.keyTap('enter')
    /**
     * write something
     */
    robot.setKeyboardDelay(0)
    let randomNo = 4 + Math.ceil(Math.random() * 2)
    for (let i = 0; i < randomNo; i++) {
      let randomWord = config.random_words[Math.floor(Math.random() * config.random_words.length)]
      robot.typeString(randomWord)
    }
    robot.keyTap('w', 'control')
    robot.keyTap('right')
    robot.keyTap('enter')
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