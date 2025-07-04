import { _decorator, Component, Node, SpriteFrame } from 'cc';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
import DataManager from '../Runtime/DataManager';

const { ccclass, property } = _decorator;

@ccclass('ItemManager')
export class ItemManager extends Component {
    label="物品"
    state: ItemStatusEnum
    type: ItemTypeEnum

    @property(SpriteFrame)
    sceneSf: SpriteFrame = null
    @property(SpriteFrame)
    inventorySf: SpriteFrame = null

    protected start(): void {
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this)
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this)
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
