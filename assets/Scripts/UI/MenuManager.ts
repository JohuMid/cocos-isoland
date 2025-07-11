import { _decorator, Component, director } from "cc";
import { SceneEnum } from "../Enum";

const { ccclass, property } = _decorator;

@ccclass('MenuManager')
export abstract class MenuManager extends Component {
    handleBackMenu(){
        director.loadScene(SceneEnum.Menu)
    }
}