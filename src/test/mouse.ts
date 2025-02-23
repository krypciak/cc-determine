import type { CrossnodeTest } from 'crossnode/crossnode.d.ts'
import CCDeterMine from '../plugin'
import { DeterMineInstance } from '../instance'

function genTest1(myI: number): CrossnodeTest<{ determineInst: DeterMineInstance }> {
    return {
        fps: 60,
        skipFrameWait: true,
        timeoutSeconds: 1000e3,

        determineInst: undefined as any,
        modId: CCDeterMine.mod.id,
        name: `mouse test 1 mouse ${myI}`,
        async setup() {
            this.determineInst = new determine.Instance('welcome to hell')
            determine.append(this.determineInst)
            determine.apply(this.determineInst)

            ig.interact.entries.forEach(e => ig.interact.removeEntry(e))

            sc.model.enterNewGame()
            sc.model.enterGame()
            ig.game.reset()
            ig.game.setPaused(false)

            await window.crossnode.testUtil.loadLevel('determine/bots1')
        },
        update(frame) {
            if (frame >= 3 * 60) {
                const expected = { x: 218, y: 150.71, z: 0 }
                const pos = ig.game.entities.filter(e => e instanceof ig.ENTITY.Enemy)[0].coll.pos
                if (Vec3.equal(pos, expected)) {
                    this.finish(true)
                } else {
                    function pv(v: Vec3) {
                        return `{ x: ${v.x}, y: ${v.y}, z: ${v.z} }`
                    }
                    this.finish(false, `mouse.coll.pos is equal ${pv(pos)}, expected ${pv(expected)}`)
                }
                return
            }
        },
        cleanup() {
            // DeterMineInstance.printCompressedLog(this.determineInst.eventLog)
            determine.delete(this.determineInst)
            determine.apply(determine.instances[0])
        },
    }
}
for (let i = 0; i < 3; i++) {
    window.crossnode.registerTest(genTest1(i))
}

function genTest28(myI: number): CrossnodeTest<{ determineInst: DeterMineInstance }> {
    return {
        fps: 60,
        skipFrameWait: true,
        timeoutSeconds: 1000e3,

        determineInst: undefined as any,
        modId: CCDeterMine.mod.id,
        name: `mouse test 28 mouse ${myI}`,
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
            // DeterMineInstance.printCompressedLog(this.determineInst.eventLog)
            determine.delete(this.determineInst)
            determine.apply(determine.instances[0])
        },
    }
}
for (let i = 0; i < 3; i++) {
    window.crossnode.registerTest(genTest28(i))
}
