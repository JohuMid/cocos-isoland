import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
import DataManager from '../Runtime/DataManager';
import { RenderManager } from '../Base/RenderManager';

const { ccclass, property } = _decorator;

@ccclass('ItemManager')
export class ItemManager extends RenderManager {
    label = "物品"
    // status: ItemStatusEnum
    type: ItemTypeEnum

    // 在场景里的图片
    @property(SpriteFrame)
    sceneSf: SpriteFrame = null

    // 在背包里的图片
    @property(SpriteFrame)
    inventorySf: SpriteFrame = null

    start() {
        super.start()
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this)
    }

    onDestroy() {
        super.onDestroy()
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this)
    }

    render() {
        const status = DataManager.Instance.items.find(i => i.type === this.type)?.status
        const spriteComponent = this.node.getComponent(Sprite)
        switch (status) {
            case ItemStatusEnum.Scene:
                this.node.active = true
                spriteComponent.spriteFrame = this.sceneSf
                break
            case ItemStatusEnum.Inventory:
                this.node.active = true
                spriteComponent.spriteFrame = this.inventorySf
                break
            case ItemStatusEnum.Disabled:
                this.node.active = false
                break
            default:
                break
        }
    }

    touchEnd() {
        // if (this.status === ItemStatusEnum.Scene) {
        //     this.status = ItemStatusEnum.Inventory
        // }
        const item = DataManager.Instance.items.find(i => i.type === this.type)

        if (!item) {
            return
        }

        if (item.status === ItemStatusEnum.Scene) {
            item.status = ItemStatusEnum.Inventory
            DataManager.Instance.items = [...DataManager.Instance.items] // 重新赋值，触发 set items()
        }
    }
}