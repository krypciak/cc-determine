import { DeterMineInstance } from './instance'

let types = []

export function injectDeterminism() {
    // Math.random = function () {
    //     if (!ci().generalRand) throw new Error('determinism: seed not set!')
    //     // console.log('Math.random()')
    //     return ci().generalRand()
    // }

    sound()
    visual()
    event()
}

function ci(): DeterMineInstance {
    return determine.instances[determine.instanceId]
}

// remember to do .random()
function sound() {
    ig.SoundWebAudio.inject({
        play(...args) {
            const back = Math.random
            Math.random = ci().sound
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    ig.MapSoundEntry.inject({
        _selectSegment() {
            const back = Math.random
            Math.random = ci().sound
            this.parent()
            Math.random = back
        },
    })
    sc.ArenaCrowdCheerController.inject({
        play(...args) {
            const back = Math.random
            Math.random = ci().sound
            this.parent(...args)
            Math.random = back
        },
    })
}

function visual() {
    /* only used in ig.TIMER_MODE.SINUS_RND, and that is used only for prop visuals */
    ig.WeightTimer.inject({
        set(a, b) {
            if (this.mode != ig.TIMER_MODE.SINUS_RND) return this.parent(a, b)

            const back = Math.random
            Math.random = ci().visual
            this.parent(a, b)
            Math.random = back
        },
    })
    ig.AnimationState.inject({
        shuffleTime(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    /* only used for visual dream stuff */
    ig.UniformRNG.inject({
        init(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
        get(...args) {
            const back = Math.random
            Math.random = ci().visual
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    /* IS_IT_CUBAUM */
    ig.Game.inject({
        preloadLevel(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    ig.Rumble.RumbleHandle.inject({
        _updatePosition(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    ig.ParticleHandle.inject({
        setData(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    ig.ENTITY.HomingParticle.inject({
        _initOffsetParticle(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    ig.EFFECT_ENTRY.PLAY_ANIM_RANGE.inject({
        update(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.PLAY_ANIMS_OVER_ENTITY.inject({
        // @ts-expect-error
        update(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.DEBRIS_OVER_ENTITY.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.PARTICLE_BOX.inject({
        // @ts-expect-error
        spawnBoxLine(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.OFFSET_PARTICLE_CIRCLE.inject({
        // @ts-expect-error
        spawn(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
        // @ts-expect-error
        _spawnParticles(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.PARTICLE_CIRCLE.inject({
        // @ts-expect-error
        spawn(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
        // @ts-expect-error
        _spawnParticles(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.DEBRIS_CIRCLE.inject({
        // @ts-expect-error
        spawn(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
        // @ts-expect-error
        _spawnParticles(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
        // @ts-expect-error
        spawnVel(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.SHOOT_HOMING_PARTICLE.inject({
        // @ts-expect-error
        _spawnParticles(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.PARTICLE_RHOMBUS.inject({
        // @ts-expect-error
        update(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EFFECT_ENTRY.WIPE_PARTICLES.inject({
        // @ts-expect-error
        update(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    ig.Clouds.inject({
        addCloud(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    ig.Rain.inject({
        spawnRain() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
        spawnRainDrop() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
    ig.DreamSideGui.inject({
        spawnParticle() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
    ig.DreamDotGui.inject({
        spawnParticle() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
    ig.EnvParticleSpawner.inject({
        setQuantity(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
        spawnParticle(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    sc.ItemGuiLayer.inject({
        addItem(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    sc.Combat.inject({
        showHitEffect(...args) {
            const back = Math.random
            Math.random = ci().visual
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    {
        const back1 = sc.HitNumberTools.placeHitNumber
        sc.HitNumberTools.placeHitNumber = function (...args) {
            const back = Math.random
            Math.random = ci().visual
            const ret = back1(...args)
            Math.random = back
            return ret
        }
    }
    sc.DropEntity.inject({
        init(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    {
        const back1 = sc.DropEntity.spawnGenericDrops
        sc.DropEntity.spawnGenericDrops = function (...args) {
            const back = Math.random
            Math.random = ci().visual
            back1(...args)
            Math.random = back
        }
    }
    sc.ItemDropEntity.inject({
        init(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    ig.ENTITY.Elevator.inject({
        moveToDestination(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
    })
    sc.NpcRunnerSpawner.inject({
        getRandomCharacter() {
            const back = Math.random
            Math.random = ci().visual
            const ret = this.parent()
            Math.random = back
            return ret
        },
    })
    ig.EVENT_STEP.DO_THE_SHAKE.inject({
        start() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
    sc.PlayerPetEntity.inject({
        resetIdleTimer(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
        update() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
    ig.ENTITY.Player.inject({
        update() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
    sc.FerroEntity.inject({
        setState(...args) {
            const back = Math.random
            Math.random = ci().visual
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    ig.ENTITY.Destructible.inject({
        init(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
        update() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
    ig.ENTITY.ItemDestruct.inject({
        init(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
        update() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
        destroy() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
        dropItem() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
    ig.ENTITY.RegenDestruct.inject({
        init(...args) {
            const back = Math.random
            Math.random = ci().visual
            this.parent(...args)
            Math.random = back
        },
        regenComplete() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
        update() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
    ig.ENTITY.EnemyCounter.inject({
        updateSprites() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EVENT_STEP.FIX_SHOCKWAVE_PLATFORMS.inject({
        start() {
            const back = Math.random
            Math.random = ci().visual
            this.parent()
            Math.random = back
        },
    })
}

function event() {
    {
        const back1 = ig.Event.getNumberVary
        ig.Event.getNumberVary = function (b) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.Event.getNumberVary')
                return ci().event()
            }
            const ret = back1(b)
            Math.random = back
            return ret
        }
    }
    // @ts-expect-error
    ig.ACTION_STEP.SELECT_RANDOM.inject({
        // @ts-expect-error
        getNext(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.SELECT_RANDOM')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.WAIT_RANDOM.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.WAIT_RANDOM')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.MOVE_TO_LINE.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.MOVE_TO_LINE')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.MOVE_RANDOM.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.MOVE_RANDOM')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        run(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.MOVE_RANDOM')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.ROTATE_FACE.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.ROTATE_FACE')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.SHOW_RANDOM_ANIMATION.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.SHOW_RANDOM_ANIMATION')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.SET_RANDOM_VAR_NUMBER.inject({
        // @ts-expect-error
        run(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.SET_RANDOM_VAR_NUMBER')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.SET_ATTRIB_NUMBER_RANDOM.inject({
        // @ts-expect-error
        run(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.SET_ATTRIB_NUMBER_RANDOM')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.EVENT_STEP.SELECT_RANDOM.inject({
        // @ts-expect-error
        getNext(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.EVENT_STEP.SELECT_RANDOM')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.EVENT_STEP.WAIT_RANDOM.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.EVENT_STEP.WAIT_RANDOM')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.EVENT_STEP.MASS_AVATAR_JUMP.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.EVENT_STEP.MASS_AVATAR_JUMP')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.EVENT_STEP.SET_RANDOM_VAR_NUMBER.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.EVENT_STEP.SET_RANDOM_VAR_NUMBER')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })

    {
        const back1 = ig.NAV_CLOSE_POINT_SEARCH.RANDOM
        ig.NAV_CLOSE_POINT_SEARCH.RANDOM = function (...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.NAV_CLOSE_POINT_SEARCH.RANDOM')
                return ci().event()
            }
            const ret = back1(...args)
            Math.random = back
            return ret
        }
    }
    {
        const back1 = sc.ItemDropEntity.spawnDrops
        sc.ItemDropEntity.spawnDrops = function (...args) {
            const back = Math.random
            Math.random = ci().visual
            back1(...args)
            Math.random = back
        }
    }
    ig.NavPath.inject({
        _moveCircle(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.NavPath#_moveCircle')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
        moveEntity() {
            const back = Math.random
            Math.random = () => {
                types.push('ig.NavPath#moveEntity')
                return ci().event()
            }
            const ret = this.parent()
            Math.random = back
            return ret
        },
    })
    sc.CombatParams.inject({
        getDamage(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.CombatParams#getDamage')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
        getHealAmount(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.CombatParams#getHealAmount')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    sc.BALL_BEHAVIOR.SLOW_DOWN.inject({
        // @ts-expect-error
        onInit(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.BALL_BEHAVIOR.SLOW_DOWN#onInit')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    sc.EnemyDisplayGui.inject({
        init(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.EnemyDisplayGui#init')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        update() {
            const back = Math.random
            Math.random = () => {
                types.push('sc.EnemyDisplayGui#update')
                return ci().event()
            }
            this.parent()
            Math.random = back
        },
    })
    sc.Combat.inject({
        getEnemyTarget() {
            const back = Math.random
            Math.random = () => {
                types.push('sc.Combat#getEnemyTarget')
                return ci().event()
            }
            const ret = this.parent()
            Math.random = back
            return ret
        },
        getPlayerTarget(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.Combat#getPlayerTarget')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
        getNearbyThreat(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.Combat#getNearbyThreat')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
        initFrequencyTimers(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.Combat#initFrequencyTimers')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        submitFrequency(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.Combat#submitFrequency')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
    })
    sc.SpawnHelper.inject({
        spawn(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.SpawnHelper#spawn')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    {
        const back1 = sc.AssaultTools.spawn
        sc.AssaultTools.spawn = function (...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.AssaultTools.spawn')
                return ci().event()
            }
            const ret = back1(...args)
            Math.random = back
            return ret
        }
    }
    sc.EnemyType.inject({
        update(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.EnemyType#update')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        postActionUpdate(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.EnemyType#postActionUpdate')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        switchState(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.EnemyType#switchState')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        resolveDefeat(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.EnemyType#resolveDefeat')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        resolveItemDrops(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.EnemyType#resolveItemDrops')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
    })
    sc.EnemyState.inject({
        selectAction(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.EnemyState#selectAction')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    {
        const back1 = sc.EnemyAnno.doesRandomlyUnderstand.bind(sc.EnemyAnno)
        sc.EnemyAnno.doesRandomlyUnderstand = function (...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.EnemyAnno.doesRandomyUnderstand')
                return ci().event()
            }
            const ret = back1(...args)
            Math.random = back
            return ret
        }
    }
    ig.ENTITY.Enemy.inject({
        onPreDamageModification(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ENTITY.Enemy#onPreDamageModification')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
        onInstantDamage(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ENTITY.Enemy#onInstantDamage')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    ig.ENTITY.EnemySpawner.inject({
        spawnEnemy(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ENTITY.EnemySpawner#spawnEnemy')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    sc.ENEMY_REACTION.TARGET_DISTANCE.inject({
        check(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.ENEMY_REACTION.TARGET_DISTANCE#check')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    sc.ENEMY_REACTION.COLLAB.inject({
        isReady(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.ENEMY_REACION.COLLAB#isReady')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    sc.ENEMY_REACTION.GUARD_COUNTER.inject({
        onGuardCounterCheck(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.ENEMY_REACTION.GUARD_COUNTER#onGuardCounterCheck')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    sc.ENEMY_REACTION.DODGE.inject({
        check(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.ENEMY_REACTION.DODGE#check')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    sc.ENEMY_REACTION.COUNTER_COUNTER.inject({
        check(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.ENEMY_REACTION.COUNTER_COUNTER#check')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    sc.ENEMY_TRACKER.TIME.inject({
        _initTimer(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.ENEMY_TRACKER.TIME#_initTimer')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        reset(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.ENEMY_TRACKER.TIME#reset')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.ESCAPE_FROM_TARGET.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.ESCAPE_FROM_TARGET#start')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        // @ts-expect-error
        run(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.ESCAPE_FROM_TARGET#run')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.CIRCLE_TARGET.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.CIRCLE_TARGET#start')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.FANCY_AIM.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.FANCY_AIM#start')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.WAIT_UNTIL_COMBAT_TRUE.inject({
        // @ts-expect-error
        run(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.WAIT_UNTIL_COMBAT_TRUE#run')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.COMBAT_IF.inject({
        // @ts-expect-error
        getNext(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.COMBAT_IF#getNext')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.RELEASE_STORED_ENEMIES.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.RELEASE_STORED_ENEMIES#start')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EVENT_STEP.COMBAT_IF.inject({
        // @ts-expect-error
        getNext() {
            const back = Math.random
            Math.random = () => {
                types.push('ig.EVENT_STEP.COMBAT_IF#getNext')
                return ci().event()
            }
            const ret = this.parent()
            Math.random = back
            return ret
        },
    })
    sc.NPCRunnerEntity.inject({
        initAction(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.NPCRunnerEntity#initAction')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        getDestinationEntryAndPos(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.NPCRunnerEntity#getDestinationEntityAndPos')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    sc.NpcRunnerSpawner.inject({
        setGroup(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.NpcRunnerSpawner#setGroup')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        spawnNpcGroups(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.NpcRunnerSpawner#spawnNpcGroups')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        getRandomDestination(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.NpcRunnerSpawner#getRandomDestination')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
        onPreUpdate() {
            const back = Math.random
            Math.random = () => {
                types.push('sc.NpcRunnerSpawner#onPreUpdate')
                return ci().event()
            }
            this.parent()
            Math.random = back
        },
    })
    ig.ENTITY.Crosshair.inject({
        getThrowDir(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ENTITY.Crosshair#getThrowDir')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.RAIN_BOMB.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.RAIN_BOMB#start')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.EVENT_STEP.SPAWN_BOMB.inject({
        start() {
            const back = Math.random
            Math.random = () => {
                types.push('ig.EVENT_Step.SPAWN_BOMB#start')
                return ci().event()
            }
            this.parent()
            Math.random = back
        },
    })
    // @ts-expect-error
    ig.ACTION_STEP.SET_PARTY_TEMP_TARGET.inject({
        // @ts-expect-error
        start(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('ig.ACTION_STEP.SET_PARTY_TEMP_TARGET')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
    })
    sc.PartyMemberEntity.inject({
        init(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.PartyMemberEntity#init')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        changeState(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.PartyMemberEntity#changeState')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        update(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.PartyMemberEntity#update')
                return ci().event()
            }
            this.parent(...args)
            Math.random = back
        },
        resetAttackTimer() {
            const back = Math.random
            Math.random = () => {
                types.push('sc.PartyMemberEntity#resetAttackTimer')
                return ci().event()
            }
            this.parent()
            Math.random = back
        },
        startCombat() {
            const back = Math.random
            Math.random = () => {
                types.push('sc.PartyMemberEntity#startCombat')
                return ci().event()
            }
            this.parent()
            Math.random = back
        },
        getBestElement() {
            const back = Math.random
            Math.random = () => {
                types.push('sc.PartyMemberEntity#getBestElement')
                return ci().event()
            }
            const ret = this.parent()
            Math.random = back
            return ret
        },
        selectCombatArt() {
            const back = Math.random
            Math.random = () => {
                types.push('sc.PartyMemberEntity#selectComatArt')
                return ci().event()
            }
            const ret = this.parent()
            Math.random = back
            return ret
        },
    })
    sc.CommonEvents.inject({
        startCallEvent(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.CommonEvents#startCallEvent')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
        selectEvent(...args) {
            const back = Math.random
            Math.random = () => {
                types.push('sc.CommonEvents#selectEvent')
                return ci().event()
            }
            const ret = this.parent(...args)
            Math.random = back
            return ret
        },
    })
}
