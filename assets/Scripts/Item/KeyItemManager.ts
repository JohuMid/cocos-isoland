import { _decorator, Component, Node } from 'cc';
import { ItemManager } from './ItemManager';
import { ItemTypeEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('KeyItemManager')
export class KeyItemManager extends ItemManager {
    label = "信箱钥匙"
    type: ItemTypeEnum = ItemTypeEnum.Key
}
