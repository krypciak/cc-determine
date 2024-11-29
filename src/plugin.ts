import { PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod'
import { Mod1 } from './types'
import { DeterMineInstance } from './instance'

export default class CCDeterMine implements PluginClass {
    static dir: string
    static mod: Mod1

    constructor(mod: Mod1) {
        CCDeterMine.dir = mod.baseDirectory
        CCDeterMine.mod = mod
        CCDeterMine.mod.isCCL3 = mod.findAllAssets ? true : false
        CCDeterMine.mod.isCCModPacked = mod.baseDirectory.endsWith('.ccmod/')
        if (!CCDeterMine.mod.isCCL3) Object.assign(mod, { id: CCDeterMine.mod.name })

        global.determine = window.determine = new DeterMine()
    }

    async prestart() {
        determine.append(new determine.Instance('cross the codes', true))
    }
}

class DeterMine {
    Instance = DeterMineInstance

    instanceId: number = 0
    instances: Record<number, DeterMineInstance> = {}

    append(instance: DeterMineInstance) {
        this.instances[instance.id] = instance
    }

    delete(instance: DeterMineInstance) {
        delete this.instances[instance.id]
    }
}

declare global {
    var determine: DeterMine
    namespace NodeJS {
        interface Global {
            determine: DeterMine
        }
    }
}
