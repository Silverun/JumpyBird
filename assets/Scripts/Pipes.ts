import {
  _decorator,
  Component,
  Node,
  Vec3,
  screen,
  find,
  UITransform,
} from "cc";
import { GameCtrl } from "./GameCtrl";
const { ccclass, property } = _decorator;

const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

@ccclass("Pipes")
export class Pipes extends Component {
  @property(Node)
  public topPipe: Node;

  @property(Node)
  public bottomPipe: Node;

  public tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
  public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);
  public scene = screen.windowSize;

  public game: GameCtrl;
  public pipeSpeed: number;
  public tempSpeed: number;

  public isPass: boolean;

  onLoad() {
    this.game = find("GameCtrl").getComponent("GameCtrl") as GameCtrl;
    this.pipeSpeed = this.game.pipeSpeed;
    this.initPos();
    this.isPass = false;
  }

  initPos() {
    this.tempStartLocationUp.x =
      this.topPipe.getComponent(UITransform).width + this.scene.width;
    this.tempStartLocationDown.x =
      this.bottomPipe.getComponent(UITransform).width + this.scene.width;

    let gap = random(90, 100);
    let topHeight = random(0, 450);

    this.tempStartLocationUp.y = topHeight;
    this.tempStartLocationDown.y = topHeight - gap * 10;

    this.topPipe.setPosition(this.tempStartLocationUp);
    this.bottomPipe.setPosition(this.tempStartLocationDown);
  }

  update(deltaTime: number) {
    //Movement of pipes left
    this.tempSpeed = this.pipeSpeed * deltaTime;

    this.tempStartLocationDown = this.topPipe.position;
    this.tempStartLocationDown = this.bottomPipe.position;

    this.tempStartLocationDown.x -= this.tempSpeed;
    this.tempStartLocationUp.x -= this.tempSpeed;

    this.topPipe.setPosition(this.tempStartLocationUp);
    this.bottomPipe.setPosition(this.tempStartLocationDown);

    //If pipes cleared the screen
    if (this.isPass === false && this.topPipe.position.x <= 0) {
      console.log("ISPASS TRUE");
      this.isPass = true;
      this.game.passPipe();
    }

    if (this.topPipe.position.x < -this.scene.width) {
      console.log("should delete!");
      this.game.createPipe();
      this.node.destroy();
    }
  }
}
