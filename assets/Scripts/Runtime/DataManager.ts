import Singleton from "../Base/Singleton"
import { EventEnum, ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum } from "../Enum"
import EventManager from "./EventManager"

interface IItem {
    type: ItemTypeEnum
    status: ItemStatusEnum
}
export default class DataManager extends Singleton {

    static get Instance() {
        return super.GetInstance<DataManager>()
    }

    private _curItemType: ItemTypeEnum | null = null

    private _items: Array<IItem> = [
        {
            type: ItemTypeEnum.Key,
            status: ItemStatusEnum.Scene
        },
        {
            type: ItemTypeEnum.Mail,
            status: ItemStatusEnum.Disable
        }]

    private _isSelect = false
    private _mailboxStatus:TriggerStatusEnum = TriggerStatusEnum.Pengind

    get mailboxStatus() {
        return this._mailboxStatus
    }

    set mailboxStatus(newData:TriggerStatusEnum) {
        this._mailboxStatus = newData
        this.render()
    }

    get isSelect() {
        return this._isSelect
    }

    set isSelect(newData:boolean){
        this._isSelect = newData
        this.render()
    }

    get curItemType() {
        return this._curItemType
    }

    set curItemType(newData) {
        this._curItemType = newData
        this.render()
    }

    get items() {
        return this._items
    }

    set items(newData) {
        this._items = newData
        this.render()
    }

    render() {
        // 触发渲染
        EventManager.Instance.emit(EventEnum.Render)
    }
}
