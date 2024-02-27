import {
  _decorator,
  CCInteger,
  Component,
  director,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  Node,
} from "cc";
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";
import { PipePool } from "./PipePool";
const { ccclass, property } = _decorator;

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  @property({
    type: Ground,
    tooltip: "This is ground",
  })
  public ground: Ground;

  @property(Results)
  public result: Results;

  @property(Bird)
  public bird: Bird;

  @property(PipePool)
  public pipeQueue: PipePool;

  @property({
    type: CCInteger,
  })
  public speed = 300;

  @property(CCInteger)
  public pipeSpeed: number = 200;

  onLoad() {
    this.initListener();
    this.result.resetScore();
    director.pause();
  }

  initListener() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(Node.EventType.TOUCH_START, () => this.bird.fly());
  }

  //testing method - delete
  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.gameOver();
        break;
      case KeyCode.KEY_P:
        this.result.addScore();
        break;
      case KeyCode.KEY_Q:
        this.resetGame();
        this.bird.resetBird();
        break;
    }
  }

  startGame() {
    this.result.hideResults();
    director.resume();
  }
  resetGame() {
    this.result.resetScore();
    this.pipeQueue.resetPool();
    this.startGame();
  }
  gameOver() {
    this.result.showResults();
    director.pause();
  }

  createPipe() {
    this.pipeQueue.addPool();
  }

  passPipe() {
    this.result.addScore();
  }
}
