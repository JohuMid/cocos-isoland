import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
import { SceneEnum } from '../Enum';
import { RenderManager } from '../Base/RenderManager';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends RenderManager {

    @property(Node)
    items:Node = null

    @property(Prefab)
    inventoryItemPrefab: Prefab = null

    protected start(): void {
        super.start()
        // director.preloadScene(SceneEnum.H1);
        // director.preloadScene(SceneEnum.H2);
        // director.preloadScene(SceneEnum.H3);
        // director.preloadScene(SceneEnum.H4);

        if (this.inventoryItemPrefab) {
            const itemNode = instantiate(this.inventoryItemPrefab)
            this.node.addChild(itemNode)
        }
    }

    changeScene(e: Event, scene: string) {
        director.loadScene(scene as SceneEnum);
    }

    render() {
        
    }
}


