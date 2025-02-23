import type { CrossnodeTest } from 'crossnode/crossnode.d.ts'
import CCDeterMine from '../plugin'
import { DeterMineInstance } from '../instance'

let i = 0
function genTest(): CrossnodeTest<{ determineInst: DeterMineInstance }> {
    let myI = i
    i++
    return {
        fps: 60,
        skipFrameWait: true,
        timeoutSeconds: 1000e3,

        determineInst: undefined as any,
        modId: CCDeterMine.mod.id,
        name: `mouse test ${myI}`,
        async setup() {
            this.determineInst = new determine.Instance('welcome to hell')
            determine.append(this.determineInst)
            determine.apply(this.determineInst)

            ig.interact.entries.forEach(e => ig.interact.removeEntry(e))

            sc.model.enterNewGame()
            sc.model.enterGame()
            ig.game.reset()
            ig.game.setPaused(false)

            await window.crossnode.testUtil.loadLevel('determine/bots28')
        },
        update(frame) {
            if (frame >= 3 * 60) {
                const expected = { x: 237.28, y: 257.32, z: 0 }
                const ppos = ig.game.playerEntity.coll.pos
                if (Vec3.equal(ppos, expected)) {
                    this.finish(true)
                } else {
                    function pv(v: Vec3) {
                        return `{ x: ${v.x}, y: ${v.y}, z: ${v.z} }`
                    }
                    this.finish(false, `ig.game.playerEntity.coll.pos is equal ${pv(ppos)}, expected ${pv(expected)}`)
                }
                return
            }
        },
        cleanup() {
            determine.delete(this.determineInst)
            determine.apply(determine.instances[0])
        },
    }
}
for (let i = 0; i < 3; i++) {
    window.crossnode.registerTest(genTest())
}
