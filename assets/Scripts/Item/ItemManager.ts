import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
import DataManager from '../Runtime/DataManager';
import { RenderManager } from '../Base/RenderManager';

const { ccclass, property } = _decorator;

@ccclass('ItemManager')
export class ItemManager extends RenderManager {
    label = "物品"
    state: ItemStatusEnum
    type: ItemTypeEnum

    @property(SpriteFrame)
    sceneSf: SpriteFrame = null
    @property(SpriteFrame)
    inventorySf: SpriteFrame = null

    protected start(): void {
        super.start()
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this)
    }

    protected onDestroy(): void {
        super.onDestroy()
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this)
    }

    render(): void {
        const status = DataManager.Instance.items.find((item) => item.type === this.type)?.status
        const spriteComponent = this.node?.getComponent(Sprite)
        switch (status) {
            case ItemStatusEnum.Scene:
                this.node.active = true
                spriteComponent.spriteFrame = this.sceneSf
                break;
            case ItemStatusEnum.Inventory:
                this.node.active = true
                spriteComponent.spriteFrame = this.inventorySf
                break;
            case ItemStatusEnum.Disable:
                this.node.active = false
                break;
            default:
                break;
        }
    }

    touchEnd() {
        let item = DataManager.Instance.items.find((item) => item.type === this.type)
        if (!item) {
            return
        }
        if (item.status === ItemStatusEnum.Scene) {
            item.status = ItemStatusEnum.Inventory
            DataManager.Instance.items = [...DataManager.Instance.items]
        }
    }
}
