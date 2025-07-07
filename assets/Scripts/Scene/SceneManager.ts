import { _decorator, Component, director, Node } from 'cc';
import { SceneEnum } from '../Enum';
import { RenderManager } from '../Base/RenderManager';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends RenderManager {

    @property(Node)
    items:Node = null
    protected start(): void {
        super.start()
        director.preloadScene(SceneEnum.H1);
        director.preloadScene(SceneEnum.H2);
        director.preloadScene(SceneEnum.H3);
        director.preloadScene(SceneEnum.H4);
    }

    changeScene(e: Event, scene: string) {
        director.loadScene(scene as SceneEnum);
    }

    render() {
        
    }
}


