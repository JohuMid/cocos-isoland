import { _decorator, Component, Node, SpriteFrame } from 'cc';
import EventManager from '../Runtime/EventManager';
import { EventEnum } from '../Enum';

const { ccclass, property } = _decorator;


@ccclass('RenderManager')
export abstract class RenderManager extends Component {
    onLoad() {
        EventManager.Instance.on(EventEnum.Render, this.render, this)
    }

    onDestroy() {
        EventManager.Instance.off(EventEnum.Render, this.render, this)
    }

    start() {
        this.render()
    }

    abstract render(): void
}

