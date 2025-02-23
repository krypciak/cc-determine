import { DeterMineInstance } from './instance'

export function injectDeterminism() {
    Math.random = function () {
        if (!ci()?.general) throw new Error('determinism: seed not set!')
        console.log('Math.random()')
        console.trace()
        console.log()
        return ci().general()
    }

    sound()
    visual()
    event()
    misc()
}

function ci(): DeterMineInstance {
    return determine.instances[determine.instanceId]
}

function sound() {
    const replace: (path: string) => (...args: unknown[]) => any = function (path: string) {
        return function (this: any, ...args) {
            const back = Math.random
            Math.random = (...args) => {
                const inst = ci()
                if (inst.logEvents) inst.soundLog.push(path)
                return inst.sound(...args)
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        }
    }
    ig.SoundWebAudio.inject({
        play: replace('ig.SoundWebAudio#play'),
    })
    ig.MapSoundEntry.inject({
        _selectSegment: replace('ig.MapSoundEntry#_selectSegment'),
    })
    sc.ArenaCrowdCheerController.inject({
        play: replace('sc.ArenaCrowdCheerController#play'),
    })
}

function visual() {
    const replace: (path: string) => (...args: unknown[]) => any = function (path: string) {
        return function (this: any, ...args) {
            const back = Math.random
            Math.random = (...args) => {
                const inst = ci()
                if (inst.logEvents) inst.visualLog.push(path)
                return inst.visual(...args)
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        }
    }
    const regularReplace = (orig: (...args: any[]) => any, path: string) => {
        return function (...args: unknown[]) {
            const back = Math.random
            Math.random = (...args) => {
                const inst = ci()
                if (inst.logEvents) inst.visualLog.push(path)
                return inst.visual(...args)
            }
            const ret = orig(...args)
            Math.random = back
            return ret
        }
    }

    /* only used in ig.TIMER_MODE.SINUS_RND, and that is used only for prop visuals */
    ig.WeightTimer.inject({
        set: replace('ig.WeightTimer#set'),
    })
    ig.AnimationState.inject({
        shuffleTime: replace('ig.AnimationState#shuffleTime'),
    })
    /* only used for visual dream stuff */
    ig.UniformRNG.inject({
        init: replace('ig.UniformRNG#init'),
        get: replace('ig.UniformRNG#get'),
    })
    /* IS_IT_CUBAUM */
    ig.Game.inject({
        preloadLevel: replace('ig.Game#preloadLevel'),
    })
    ig.Rumble.RumbleHandle.inject({
        _updatePosition: replace('ig.Rumble.RumbleHandle#_updatePosition'),
    })
    ig.ParticleHandle.inject({
        setData: replace('ig.ParticleHandle#setData'),
    })
    ig.ENTITY.HomingParticle.inject({
        _initOffsetParticle: replace('ig.ENTITY.HomingParticle#_initOffsetParticle'),
    })
    ig.EFFECT_ENTRY.PLAY_ANIM_RANGE.inject({
        update: replace('ig.EFFECT_ENTRY.PLAY_ANIM_RANGE#update'),
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.PLAY_ANIMS_OVER_ENTITY.inject({
        update: replace('ig.EFFECT_ENTRY.PLAY_ANIMS_OVER_ENTITY#update'),
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.DEBRIS_OVER_ENTITY.inject({
        start: replace('ig.EFFECT_ENTRY.DEBRIS_OVER_ENTITY#start'),
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.PARTICLE_BOX.inject({
        spawnBoxLine: replace('ig.EFFECT_ENTRY.PARTICLE_BOX#spawnBoxLine'),
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.OFFSET_PARTICLE_CIRCLE.inject({
        spawn: replace('ig.EFFECT_ENTRY.OFFSET_PARTICLE_CIRCLE#spawn'),
        _spawnParticles: replace('ig.EFFECT_ENTRY.OFFSET_PARTICLE_CIRCLE#_spawnParticles'),
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.PARTICLE_CIRCLE.inject({
        spawn: replace('ig.EFFECT_ENTRY.PARTICLE_CIRCLE#spawn'),
        _spawnParticles: replace('ig.EFFECT_ENTRY.PARTICLE_CIRCLE#_spawnParticles'),
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.DEBRIS_CIRCLE.inject({
        spawn: replace('ig.EFFECT_ENTRY.DEBRIS_CIRCLE#spawn'),
        _spawnParticles: replace('ig.EFFECT_ENTRY.DEBRIS_CIRCLE#_spawnParticles'),
        spawnVel: replace('ig.EFFECT_ENTRY.DEBRIS_CIRCLE#spawnVel'),
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.SHOOT_HOMING_PARTICLE.inject({
        _spawnParticles: replace('ig.EFFECT_ENTRY.SHOOT_HOMING_PARTICLE#_spawnParticles'),
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.PARTICLE_RHOMBUS.inject({
        update: replace('ig.EFFECT_ENTRY.PARTICLE_RHOMBUS#update'),
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.WIPE_PARTICLES.inject({
        update: replace('ig.EFFECT_ENTRY.WIPE_PARTICLES#update'),
    })
    ig.Clouds.inject({
        addCloud: replace('ig.Clouds#addCloud'),
    })
    ig.Rain.inject({
        spawnRain: replace('ig.Rain#spawnRain'),
        spawnRainDrop: replace('ig.Rain#spawnRainDrop'),
    })
    ig.DreamSideGui.inject({
        spawnParticle: replace('ig.DreamSideGui#spawnParticle'),
    })
    ig.DreamDotGui.inject({
        spawnParticle: replace('ig.DreamDotGui#spawnParticle'),
    })
    ig.EnvParticleSpawner.inject({
        setQuantity: replace('ig.EnvParticleSpawner#setQuantity'),
        spawnParticle: replace('ig.EnvParticleSpawner#spawnParticle'),
    })
    sc.ItemGuiLayer.inject({
        addItem: replace('sc.ItemGuiLayer#addItem'),
    })
    sc.Combat.inject({
        showHitEffect: replace('sc.Combat#showHitEffect'),
    })
    sc.HitNumberTools.placeHitNumber = regularReplace(
        sc.HitNumberTools.placeHitNumber,
        'sc.HitNumberTools.placeHitNumber'
    )
    sc.DropEntity.inject({
        init: replace('sc.DropEntity#init'),
    })
    sc.DropEntity.spawnGenericDrops = regularReplace(sc.DropEntity.spawnGenericDrops, 'sc.DropEntity.spawnGenericDrops')
    sc.ItemDropEntity.inject({
        init: replace('sc.ItemDropEntity#init'),
    })
    ig.ENTITY.Elevator.inject({
        moveToDestination: replace('ig.ENTITY.Elevator#moveToDestination'),
    })
    sc.NpcRunnerSpawner.inject({
        getRandomCharacter: replace('sc.NpcRunnerSpawner#getRandomCharacter'),
    })
    ig.EVENT_STEP.DO_THE_SHAKE.inject({
        start: replace('ig.EVENT_STEP.DO_THE_SHAKE#start'),
    })
    sc.PlayerPetEntity.inject({
        resetIdleTimer: replace('sc.PlayerPetEntity#resetIdleTimer'),
        update: replace('sc.PlayerPetEntity#update'),
    })
    ig.ENTITY.Player.inject({
        update: replace('ig.ENTITY.Player#update'),
    })
    sc.FerroEntity.inject({
        setState: replace('sc.FerroEntity#setState'),
    })
    ig.ENTITY.Destructible.inject({
        init: replace('ig.ENTITY.Destructible#init'),
        update: replace('ig.ENTITY.Destructible#update'),
    })
    ig.ENTITY.ItemDestruct.inject({
        init: replace('ig.ENTITY.ItemDestruct#init'),
        update: replace('ig.ENTITY.ItemDestruct#update'),
        destroy: replace('ig.ENTITY.ItemDestruct#destroy'),
        dropItem: replace('ig.ENTITY.ItemDestruct#dropItem'),
    })
    ig.ENTITY.RegenDestruct.inject({
        init: replace('ig.ENTITY.RegenDestruct#init'),
        regenComplete: replace('ig.ENTITY.RegenDestruct#regenComplete'),
        update: replace('ig.ENTITY.RegenDestruct#update'),
    })
    ig.ENTITY.EnemyCounter.inject({
        updateSprites: replace('ig.ENTITY.EnemyCounter#updateSprites'),
    })
    // @ts-expect-error
    ig.EVENT_STEP.FIX_SHOCKWAVE_PLATFORMS.inject({
        start: replace('ig.EVENT_STEP.FIX_SHOCKWAVE_PLATFORMS#start'),
    })
}

function event() {
    const replace: (path: string) => (...args: unknown[]) => any = function (path: string) {
        return function (this: any, ...args) {
            const back = Math.random
            Math.random = (...args) => {
                const inst = ci()
                if (inst.logEvents) inst.eventLog.push(path)
                return inst.event(...args)
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        }
    }
    const regularReplace = (orig: (...args: any[]) => any, path: string) => {
        return function (...args: unknown[]) {
            const back = Math.random
            Math.random = (...args) => {
                const inst = ci()
                if (inst.logEvents) inst.eventLog.push(path)
                return inst.event(...args)
            }
            const ret = orig(...args)
            Math.random = back
            return ret
        }
    }

    ig.Event.getNumberVary = regularReplace(ig.Event.getNumberVary, 'ig.Event.getNumberVary')
    // @ts-expect-error
    ig.ACTION_STEP.SELECT_RANDOM.inject({
        getNext: replace('ig.ACTION_STEP.SELECT_RANDOM#getNext'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.WAIT_RANDOM.inject({
        start: replace('ig.ACTION_STEP.WAIT_RANDOM#start'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.MOVE_TO_LINE.inject({
        start: replace('ig.ACTION_STEP.MOVE_TO_LINE#start'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.MOVE_RANDOM.inject({
        start: replace('ig.ACTION_STEP.MOVE_RANDOM#start'),
        run: replace('ig.ACTION_STEP.MOVE_RANDOM#run'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.ROTATE_FACE.inject({
        start: replace('ig.ACTION_STEP.ROTATE_FACE#start'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.SHOW_RANDOM_ANIMATION.inject({
        start: replace('ig.ACTION_STEP.SHOW_RANDOM_ANIMATION#start'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.SET_RANDOM_VAR_NUMBER.inject({
        run: replace('ig.ACTION_STEP.SET_RANDOM_VAR_NUMBER#run'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.SET_ATTRIB_NUMBER_RANDOM.inject({
        run: replace('ig.ACTION_STEP.SET_ATTRIB_NUMBER_RANDOM#run'),
    })
    // @ts-expect-error
    ig.EVENT_STEP.SELECT_RANDOM.inject({
        getNext: replace('ig.EVENT_STEP.SELECT_RANDOM#getNext'),
    })
    // @ts-expect-error
    ig.EVENT_STEP.WAIT_RANDOM.inject({
        start: replace('ig.EVENT_STEP.WAIT_RANDOM#start'),
    })
    // @ts-expect-error
    ig.EVENT_STEP.MASS_AVATAR_JUMP.inject({
        start: replace('ig.EVENT_STEP.MASS_AVATAR_JUMP#start'),
    })
    // @ts-expect-error
    ig.EVENT_STEP.SET_RANDOM_VAR_NUMBER.inject({
        start: replace('ig.EVENT_STEP.SET_RANDOM_VAR_NUMBER#start'),
    })

    ig.NAV_CLOSE_POINT_SEARCH.RANDOM = regularReplace(
        ig.NAV_CLOSE_POINT_SEARCH.RANDOM,
        'ig.NAV_CLOSE_POINT_SERACH.RANDOM'
    )
    sc.ItemDropEntity.spawnDrops = regularReplace(sc.ItemDropEntity.spawnDrops, 'sc.ItemDropEntity.spawnDrops')
    ig.NavPath.inject({
        _moveCircle: replace('ig.NavPath#_moveCircle'),
        moveEntity: replace('ig.NavPath#moveEntity'),
    })
    sc.CombatParams.inject({
        getDamage: replace('sc.CombatParams#getDamage'),
        getHealAmount: replace('sc.CombatParams#getHealAmount'),
    })
    // @ts-expect-error
    sc.BALL_BEHAVIOR.SLOW_DOWN.inject({
        onInit: replace('sc.BALL_BEHAVIOR.SLOW_DOWN#onInit'),
    })
    sc.EnemyDisplayGui.inject({
        init: replace('sc.EnemyDisplayGui#init'),
        update: replace('sc.EnemyDisplayGui#update'),
    })
    sc.Combat.inject({
        getEnemyTarget: replace('sc.Combat#getEnemyTarget'),
        getPlayerTarget: replace('sc.Combat#getPlayerTarget'),
        getNearbyThreat: replace('sc.Combat#getNearbyThreat'),
        initFrequencyTimers: replace('sc.Combat#initFrequencyTimers'),
        submitFrequency: replace('sc.Combat#submitFrequency'),
    })
    sc.SpawnHelper.inject({
        spawn: replace('sc.SpawnHelper#spawn'),
    })

    sc.AssaultTools.spawn = regularReplace(sc.AssaultTools.spawn, 'sc.AssaultTools.spawn')
    sc.EnemyType.inject({
        update: replace('sc.EnemyType#update'),
        postActionUpdate: replace('sc.EnemyType#postActionUpdate'),
        switchState: replace('sc.EnemyType#switchState'),
        resolveDefeat: replace('sc.EnemyType#resolveDefeat'),
        resolveItemDrops: replace('sc.EnemyType#resolveItemDrops'),
    })
    sc.EnemyState.inject({
        selectAction: replace('sc.EnemyState#selectAction'),
    })

    sc.EnemyAnno.doesRandomlyUnderstand = regularReplace(
        sc.EnemyAnno.doesRandomlyUnderstand,
        'sc.EnemyAnno.doesRandomlyUnderstand'
    )

    ig.ENTITY.Enemy.inject({
        onPreDamageModification: replace('ig.ENTITY.Enemy#onPreDamageModification'),
        onInstantDamage: replace('ig.ENTITY.Enemy#onInstantDamage'),
    })
    ig.ENTITY.EnemySpawner.inject({
        spawnEnemy: replace('ig.ENTITY.EnemySpawner#spawnEnemy'),
    })
    // @ts-expect-error
    sc.ENEMY_REACTION.TARGET_DISTANCE.inject({
        check: replace('sc.ENEMY_REACTION.TARGET_DISTANCE#check'),
    })
    sc.ENEMY_REACTION.COLLAB.inject({
        // @ts-expect-error
        isReady: replace('sc.ENEMY_REACTION.COLLAB#isReady'),
    })
    sc.ENEMY_REACTION.GUARD_COUNTER.inject({
        // @ts-expect-error
        onGuardCounterCheck: replace('sc.ENEMY_REACTION.GUARD_COUNTER#onGuardCounterCheck'),
    })
    // @ts-expect-error
    sc.ENEMY_REACTION.DODGE.inject({
        check: replace('sc.ENEMY_REACTION.DODGE#check'),
    })
    // @ts-expect-error
    sc.ENEMY_REACTION.COUNTER_COUNTER.inject({
        check: replace('sc.ENEMY_REACTION.COUNTER_COUNTER#check'),
    })
    sc.ENEMY_TRACKER.TIME.inject({
        _initTimer: replace('sc.ENEMY_TRACKER.TIME#_initTimer'),
        reset: replace('sc.ENEMY_TRACKER.TIME#reset'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.ESCAPE_FROM_TARGET.inject({
        start: replace('ig.ACTION_STEP.ESCAPE_FROM_TARGET#start'),
        run: replace('ig.ACTION_STEP.ESCAPE_FROM_TARGET#run'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.CIRCLE_TARGET.inject({
        start: replace('ig.ACTION_STEP.CIRCLE_TARGET#start'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.FANCY_AIM.inject({
        start: replace('ig.ACTION_STEP.FANCY_AIM#start'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.WAIT_UNTIL_COMBAT_TRUE.inject({
        run: replace('ig.ACTION_STEP.WAIT_UNTIL_COMBAT_TRUE#run'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.COMBAT_IF.inject({
        getNext: replace('ig.ACTION_STEP.COMBAT_IF#getNext'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.RELEASE_STORED_ENEMIES.inject({
        start: replace('ig.ACTION_STEP.RELEASE_STORED_ENEMIES#start'),
    })
    // @ts-expect-error
    ig.EVENT_STEP.COMBAT_IF.inject({
        getNext: replace('ig.EVENT_STEP.COMBAT_IF#getNext'),
    })
    sc.NPCRunnerEntity.inject({
        initAction: replace('sc.NPCRunnerEntity#initAction'),
        getDestinationEntryAndPos: replace('sc.NPCRunnerEntity#getDestinationEntryAndPos'),
    })
    sc.NpcRunnerSpawner.inject({
        setGroup: replace('sc.NpcRunnerSpawner#setGroup'),
        spawnNpcGroup: replace('sc.NpcRunnerSpawner#spawnNpcGroup'),
        getRandomDestination: replace('sc.NpcRunnerSpawner#getRandomDestination'),
        onPreUpdate: replace('sc.NpcRunnerSpawner#onPreUpdate'),
    })
    ig.ENTITY.Crosshair.inject({
        getThrowDir: replace('ig.ENTITY.Crosshair#getThrowDir'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.RAIN_BOMB.inject({
        start: replace('ig.ACTION_STEP.RAIN_BOMB#start'),
    })
    // @ts-expect-error
    ig.EVENT_STEP.SPAWN_BOMB.inject({
        start: replace('ig.EVENT_STEP.SPAWN_BOMB#start'),
    })
    // @ts-expect-error
    ig.ACTION_STEP.SET_PARTY_TEMP_TARGET.inject({
        start: replace('ig.ACTION_STEP.SET_PARTY_TEMP_TARGET#start'),
    })
    sc.PartyMemberEntity.inject({
        init: replace('sc.PartyMemberEntity#init'),
        changeState: replace('sc.PartyMemberEntity#changeState'),
        update: replace('sc.PartyMemberEntity#update'),
        resetAttackTimer: replace('sc.PartyMemberEntity#resetAttackTimer'),
        startCombat: replace('sc.PartyMemberEntity#startCombat'),
        getBestElement: replace('sc.PartyMemberEntity#getBestElement'),
        selectCombatArt: replace('sc.PartyMemberEntity#selectCombatArt'),
    })
    sc.CommonEvents.inject({
        startCallEvent: replace('sc.CommonEvents#startCallEvent'),
        selectEvent: replace('sc.CommonEvents#selectEvent'),
    })
}

function misc() {
    const replace: (path: string) => (...args: unknown[]) => any = function (path: string) {
        return function (this: any, ...args) {
            const back = Math.random
            Math.random = (...args) => {
                const inst = ci()
                if (inst.logEvents) inst.miscLog.push(path)
                return inst.misc(...args)
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        }
    }
    const regularReplace = (orig: (...args: any[]) => any, path: string) => {
        return function (...args: unknown[]) {
            const back = Math.random
            Math.random = (...args) => {
                const inst = ci()
                if (inst.logEvents) inst.miscLog.push(path)
                return inst.misc(...args)
            }
            const ret = orig(...args)
            Math.random = back
            return ret
        }
    }

    ig.StorageTools.encrypt = regularReplace(ig.StorageTools.encrypt, 'ig.StorageTools#encrypt')
    /* duno is decrypt actually uses Math.random() */
    ig.StorageTools.decrypt = regularReplace(ig.StorageTools.decrypt, 'ig.StorageTools#decrypt')
    ig.Storage.inject({
        _encrypt: replace('ig.Storage#_encrypt'),
        _decrypt: replace('ig.Storage#_decrypt'),
    })
}
