import Singleton from "../Base/Singleton"
import { ItemStatusEnum, ItemTypeEnum } from "../Enum"

interface IItem {
    type: ItemTypeEnum
    status: ItemStatusEnum
}
export default class DataManager extends Singleton {

    static get Instance() {
        return super.GetInstance<DataManager>()
    }

    private _items: Array<IItem> = [
        {
            type: ItemTypeEnum.Key,
            status: ItemStatusEnum.Scene
        },
        {
            type: ItemTypeEnum.Mail,
            status: ItemStatusEnum.Scene
        }]

    get items() {
        return this._items
    }

    set items(newData) {
        this._items = newData

        // 触发渲染
    }
}
