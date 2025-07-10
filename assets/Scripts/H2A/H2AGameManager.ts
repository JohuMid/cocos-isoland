import { _decorator, Component, instantiate, Node, Prefab, UITransform } from 'cc';
import { CircleManager } from './CircleManager';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
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

    @property([Prefab])
    contentPrefab: Prefab[] = []

    private circleMap: Map<CircleManager, CircleManager[]> = new Map()

    start(): void {
        this.generateCircleMap()
        this.generateLines()

        super.start()
    }

    render() {
        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i];
            circle.node.destroyAllChildren()

            const contentIndex = DataManager.Instance.H2AData[i]
            if (contentIndex !== null && this.contentPrefab[contentIndex]) {
                const content = instantiate(this.contentPrefab[contentIndex])
                circle.node.addChild(content)
            }
        }
        // DataManager.Instance.H2AData

    }

    handleCircleTouth(e: Event, _index: string) {
        // BUG 点击没有到空余的位置上去
        const index = parseInt(_index)
        const curCircleContentIndex = DataManager.Instance.H2AData[index]
        if (curCircleContentIndex === null) {
            return
        }
        const curCircle = this.circles[index]
        const circles = this.circleMap.get(curCircle)
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            const nullIndex = DataManager.Instance.H2AData.findIndex(i => i === null)
            const circleIndex = this.circles.findIndex(i => i === circle)

            if (circleIndex === nullIndex) {
                DataManager.Instance.H2AData[circle.index] = curCircleContentIndex
                DataManager.Instance.H2AData[index] = null
                DataManager.Instance.H2AData = [...DataManager.Instance.H2AData]
            }
        }
    }

    generateCircleMap() {
        this.circleMap.set(this.circles[0], [this.circles[1], this.circles[4], this.circles[6]])
        this.circleMap.set(this.circles[1], [this.circles[0], this.circles[5], this.circles[6]])
        this.circleMap.set(this.circles[2], [this.circles[4], this.circles[6]])
        this.circleMap.set(this.circles[3], [this.circles[5], this.circles[6]])
        this.circleMap.set(this.circles[4], [this.circles[0], this.circles[2], this.circles[5], this.circles[6]])
        this.circleMap.set(this.circles[5], [this.circles[1], this.circles[3], this.circles[4], this.circles[6]])
        this.circleMap.set(this.circles[6], [this.circles[0], this.circles[1], this.circles[2], this.circles[3], this.circles[4], this.circles[5]])

        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i];
            circle.index = i
        }
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

        const sign = (x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2) ? 1 : -1

        line.setRotationFromEuler(0, 0, sign * angle)

        line.setPosition(x, y)
    }
}


