import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
import { SceneEnum } from '../Enum';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends RenderManager {

    @property(Node)
    items:Node = null

    @property(Prefab)
    inventoryItemPrefab: Prefab = null

    @property(Prefab)
    menu: Prefab = null
    

    type:SceneEnum

    start(): void {
        super.start()
        // director.preloadScene(SceneEnum.H1);
        // director.preloadScene(SceneEnum.H2);
        // director.preloadScene(SceneEnum.H3);
        // director.preloadScene(SceneEnum.H4);

        if (this.inventoryItemPrefab) {
            const itemNode = instantiate(this.inventoryItemPrefab)
            this.node.addChild(itemNode)
        }

        if (this.menu) {
            const itemNode = instantiate(this.menu)
            this.node.addChild(itemNode)
        }
    }

    changeScene(e: Event, scene: string) {
        DataManager.Instance.curScene = scene as SceneEnum
    }

    render() {
        if (DataManager.Instance.curScene === this.type) {
            return
        }
        director.loadScene(DataManager.Instance.curScene);
    }
}


