import { _decorator, Button, Component, director, instantiate, Label, log, Node, Prefab } from 'cc';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
import { ItemManager } from '../Item/ItemManager';
const { ccclass, property } = _decorator;

@ccclass('InventoryManager')
export class InventoryManager extends RenderManager {
    @property(Prefab)
    keyPrefab: Prefab = null

    @property(Prefab)
    mailPrefab: Prefab = null

    @property(Label)
    label: Label = null

    @property(Button)
    leftBtn: Button = null

    @property(Button)
    rightBtn: Button = null

    @property(Node)
    placeholder: Node = null

    @property(Node)
    hand: Node = null

    render() {
        this.placeholder.destroyAllChildren()
        const isInventoryItems = DataManager.Instance.items.filter(i => i.status == ItemStatusEnum.Inventory)
        this.node.active = isInventoryItems.length > 0
        if (isInventoryItems.length) {
            if (DataManager.Instance.curItemType) {
                const item = DataManager.Instance.items.find(i => i.type === DataManager.Instance.curItemType)
                if (item.status === ItemStatusEnum.Inventory) {
                    this.generateItem(DataManager.Instance.curItemType)
                } else {
                    const type = isInventoryItems[0].type
                    this.generateItem(type)
                    DataManager.Instance.curItemType = type
                }
            } else {
                const type = isInventoryItems[0].type
                this.generateItem(type)
                DataManager.Instance.curItemType = type
            }
        }

        this.hand.active = Boolean(DataManager.Instance.curItemType) && DataManager.Instance.isSelect
        this.changeBtnInteractable()
    }

    generateItem(type: ItemTypeEnum) {
        switch (type) {
            case ItemTypeEnum.Key:
                const keyNode = instantiate(this.keyPrefab)
                this.placeholder.addChild(keyNode)
                this.label.string = keyNode.getComponent(ItemManager).label
                break
            case ItemTypeEnum.Mail:
                const mailNode = instantiate(this.mailPrefab)
                this.placeholder.addChild(mailNode)
                this.label.string = mailNode.getComponent(ItemManager).label
                break
            default:
                break
        }
    }

    handleSelect() {
        DataManager.Instance.isSelect = !DataManager.Instance.isSelect
    }

    handleLeftBtn() {
        if (DataManager.Instance.curItemType === null) {
            return
        }

        const isInventoryItems = DataManager.Instance.items.filter(i => i.status == ItemStatusEnum.Inventory)
        const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType)
        if (index > 0) {
            DataManager.Instance.isSelect = false
            DataManager.Instance.curItemType = isInventoryItems[index - 1].type
        }
    }

    handleRightBtn() {
        if (DataManager.Instance.curItemType === null) {
            return
        }

        const isInventoryItems = DataManager.Instance.items.filter(i => i.status == ItemStatusEnum.Inventory)
        const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType)
        if (index < isInventoryItems.length - 1) {
            DataManager.Instance.isSelect = false
            DataManager.Instance.curItemType = isInventoryItems[index + 1].type
        }
    }

    changeBtnInteractable() { // 修改按钮可交互状态，在每次 render 的时候调用
        if (DataManager.Instance.curItemType === null) {
            this.leftBtn.interactable = false
            this.rightBtn.interactable = false
            return
        }

        const isInventoryItems = DataManager.Instance.items.filter(i => i.status == ItemStatusEnum.Inventory)
        const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType)
        this.leftBtn.interactable = index > 0
        this.rightBtn.interactable = index < isInventoryItems.length - 1
    }
}