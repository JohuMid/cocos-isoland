import { _decorator, Component, Node } from 'cc';
import { ItemManager } from './ItemManager';
import { ItemTypeEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends ItemManager {
    label = "船票"
    type: ItemTypeEnum = ItemTypeEnum.Mail
}
