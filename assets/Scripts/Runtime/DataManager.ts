import { sys } from "cc"
import Singleton from "../Base/Singleton"
import { EventEnum, ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum } from "../Enum"
import EventManager from "./EventManager"

interface IItem {
    type: ItemTypeEnum
    status: ItemStatusEnum
}

const STORAGE_KEY = 'STORAGE_KEY'

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
        this.renderAndSave()
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
    private _curScene: SceneEnum = SceneEnum.H1

    get curScene() {
        return this._curScene
    }

    set curScene(newData: SceneEnum) {
        this._curScene = newData
        this.renderAndSave()
    }

    get mailboxStatus() {
        return this._mailboxStatus
    }

    set mailboxStatus(newData: TriggerStatusEnum) {
        this._mailboxStatus = newData
        this.renderAndSave()
    }

    get doorStatus() {
        return this._doorStatus
    }

    set doorStatus(newData: TriggerStatusEnum) {
        this._doorStatus = newData
        this.renderAndSave()
    }

    get grandmaStatus() {
        return this._grandmaStatus
    }

    set grandmaStatus(newData: TriggerStatusEnum) {
        this._grandmaStatus = newData
        this.renderAndSave()
    }

    get grandmaDialogIndex() {
        return this._grandmaDialogIndex
    }

    set grandmaDialogIndex(newData: number) {
        this._grandmaDialogIndex = newData
        this.renderAndSave()
    }

    get isSelect() {
        return this._isSelect
    }

    set isSelect(newData: boolean) {
        this._isSelect = newData
        this.renderAndSave()
    }

    get curItemType() {
        return this._curItemType
    }

    set curItemType(newData) {
        this._curItemType = newData
        this.renderAndSave()
    }

    get items() {
        return this._items
    }

    set items(newData) {
        this._items = newData
        this.renderAndSave()
    }

    renderAndSave() {
        // 触发渲染
        EventManager.Instance.emit(EventEnum.Render)

        sys.localStorage.setItem(STORAGE_KEY, JSON.stringify({
            curScene: this._curScene,
            curItemType: this.curItemType,
            mailboxStatus: this._mailboxStatus,
            grandmaStatus: this._grandmaStatus,
            grandmaDialogIndex: this._grandmaDialogIndex,
            doorStatus: this._doorStatus,
            items: this._items,
            H2AData: this._H2AData,
            isSelect: this.isSelect
        }))
    }

    restore() {
        const _data = sys.localStorage.getItem(STORAGE_KEY)
        try {
            const data = JSON.parse(_data)
            this.curScene = data.curScene
            this.curItemType = data.curItemType
            this.mailboxStatus = data.mailboxStatus
            this.grandmaStatus = data.grandmaStatus
            this.grandmaDialogIndex = data.grandmaDialogIndex
            this.doorStatus = data.doorStatus
            this.items = data.items
            this.H2AData = data.H2AData
            this.isSelect = data.isSelect
        } catch {
            this.reset()
        }
    }

    reset() {
        // 重置数据
        this.curScene = SceneEnum.H1
        this.curItemType = null
        this.mailboxStatus = TriggerStatusEnum.Pengind
        this.grandmaStatus = TriggerStatusEnum.Pengind
        this.grandmaDialogIndex = -1
        this.doorStatus = TriggerStatusEnum.Pengind
        this.items = [
            {
                type: ItemTypeEnum.Key,
                status: ItemStatusEnum.Scene
            },
            {
                type: ItemTypeEnum.Mail,
                status: ItemStatusEnum.Disabled
            }]
        this.H2AData = [...this.H2AInitData]
        this.isSelect = false
    }
}
