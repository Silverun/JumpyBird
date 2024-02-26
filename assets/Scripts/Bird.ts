import { _decorator, Animation, CCFloat, Component, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
  @property(CCFloat)
  public jumpHeight: number;

  @property(CCFloat)
  public jumpDuration: number;

  public birdAnimation: Animation;
  public birdLocation: Vec3;

  onLoad() {
    this.resetBird();
    this.birdAnimation = this.getComponent(Animation);
  }

  resetBird() {
    this.birdLocation = new Vec3(0, 0);
    this.node.setPosition(this.birdLocation);
  }

  fly() {
    this.birdAnimation.stop();

    tween(this.node.position)
      .to(
        this.jumpDuration,
        new Vec3(
          this.node.position.x,
          this.node.position.y + this.jumpHeight,
          0
        ),
        {
          easing: "smooth",
          onUpdate: (target: Vec3, ratio: number) => {
            this.node.position = target;
          },
        }
      )
      .start();

    this.birdAnimation.play();
  }
}
