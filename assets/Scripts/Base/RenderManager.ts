import { _decorator, Component, Node, SpriteFrame } from 'cc';
import EventManager from '../Runtime/EventManager';
import { EventEnum } from '../Enum';

const { ccclass, property } = _decorator;

@ccclass('RenderManager')
export abstract class RenderManager extends Component {

    protected onLoad(): void {
        EventManager.Instance.on(EventEnum.Render, this.render, this)
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EventEnum.Render, this.render)
    }

    protected start(): void {
        this.render()
    }

    abstract render(): void
}
