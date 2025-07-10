import { _decorator, Component, instantiate, Node, Prefab, UITransform } from 'cc';
import { CircleManager } from './CircleManager';
import { RenderManager } from '../Base/RenderManager';
const { ccclass, property } = _decorator;

const CIRCLE_RADIUS = 80

@ccclass('H2AGameManager')
export class H2AGameManager extends RenderManager {
    @property([CircleManager])
    circles: CircleManager[] = []

    @property(Node)
    lines: Node = null

    @property(Prefab)
    line: Prefab = null

    private circleMap: Map<CircleManager, CircleManager[]> = new Map()

    start(): void {
        this.generateCircleMap()
        this.generateLines()

        super.start()
    }

    render() {

    }

    generateCircleMap() {
        this.circleMap.set(this.circles[0], [this.circles[1], this.circles[4], this.circles[6]])
        this.circleMap.set(this.circles[1], [this.circles[0], this.circles[5], this.circles[6]])
        this.circleMap.set(this.circles[2], [this.circles[4], this.circles[6]])
        this.circleMap.set(this.circles[3], [this.circles[5], this.circles[6]])
        this.circleMap.set(this.circles[4], [this.circles[0], this.circles[2], this.circles[5], this.circles[6]])
        this.circleMap.set(this.circles[5], [this.circles[1], this.circles[3], this.circles[4], this.circles[6]])
        this.circleMap.set(this.circles[6], [this.circles[0], this.circles[1], this.circles[2], this.circles[3], this.circles[4], this.circles[5]])
    }

    generateLines() {
        for (const [curCircle, circles] of this.circleMap) {
            for (const nextCircle of circles) {
                const curIndex = this.circles.findIndex(i => i === curCircle)
                const nextIndex = this.circles.findIndex(i => i === nextCircle)
                if (curIndex < nextIndex) {
                    this.generateLine(curCircle, nextCircle)
                }
            }
        }
    }

    generateLine(curCircle: CircleManager, nextCircle: CircleManager) {
        const line = instantiate(this.line)
        this.lines.addChild(line)
        const { x: x1, y: y1 } = curCircle.node.getPosition()
        const { x: x2, y: y2 } = nextCircle.node.getPosition()
        const x = (x1 + x2) / 2
        const y = (y1 + y2) / 2
        const side1 = Math.abs(x1 - x2)
        const side2 = Math.abs(y1 - y2)
        const side3 = Math.sqrt(side1 ** 2 + side2 ** 2)

        const uiTransform = line.getComponent(UITransform)
        uiTransform.setContentSize(side3 - 2 * CIRCLE_RADIUS, uiTransform.contentSize.height)

        const rad = Math.atan(side2 / side1)
        const angle = rad * 180 / Math.PI

        const sign = (x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2)?1:-1

        line.setRotationFromEuler(0, 0, sign * angle)

        line.setPosition(x, y)
    }
}


