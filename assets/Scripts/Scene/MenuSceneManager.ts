import { _decorator, Component, director, instantiate, Node, Prefab, Scene } from 'cc';

import { SceneManager } from './SceneManager';
import { SceneEnum } from '../Enum';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('MenuSceneManager')
export class MenuSceneManager extends SceneManager {
    type: SceneEnum = SceneEnum.Menu;

    handleNewGame() {
        DataManager.Instance.reset()
        director.loadScene(SceneEnum.H1)
    }

    handleContinue() {
        DataManager.Instance.restore()
        director.loadScene(DataManager.Instance.curScene)
    }

    render() {

    }
}


