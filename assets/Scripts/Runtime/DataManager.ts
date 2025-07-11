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

    readonly H2AAnswer = [0, 1, 2, 3, 4, 5, null]
    readonly H2AInitData = [1, 0, 3, 2, 5, 4, null]
    private _H2AData = [...this.H2AInitData]

    get H2AData() {
        return this._H2AData
    }

    set H2AData(newData: number[]) {
        this._H2AData = newData
        this.render()
    }

    private _curItemType: ItemTypeEnum | null = null

    private _items: Array<IItem> = [
        {
            type: ItemTypeEnum.Key,
            status: ItemStatusEnum.Scene
        },
        {
            type: ItemTypeEnum.Mail,
            status: ItemStatusEnum.Disabled
        }]

    private _isSelect = false
    private _mailboxStatus: TriggerStatusEnum = TriggerStatusEnum.Pengind
    private _grandmaStatus: TriggerStatusEnum = TriggerStatusEnum.Pengind
    private _grandmaDialogIndex = -1
    private _doorStatus: TriggerStatusEnum = TriggerStatusEnum.Pengind

    get mailboxStatus() {
        return this._mailboxStatus
    }

    set mailboxStatus(newData: TriggerStatusEnum) {
        this._mailboxStatus = newData
        this.render()
    }

    get doorStatus() {
        return this._doorStatus
    }

    set doorStatus(newData: TriggerStatusEnum) {
        this._doorStatus = newData
        this.render()
    }

    get grandmaStatus() {
        return this._grandmaStatus
    }

    set grandmaStatus(newData: TriggerStatusEnum) {
        this._grandmaStatus = newData
        this.render()
    }

    get grandmaDialogIndex() {
        return this._grandmaDialogIndex
    }

    set grandmaDialogIndex(newData: number) {
        this._grandmaDialogIndex = newData
        this.render()
    }

    get isSelect() {
        return this._isSelect
    }

    set isSelect(newData: boolean) {
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
