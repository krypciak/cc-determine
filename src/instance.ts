export class DeterMineInstance {
    private static instanceIdCounter = 0

    static resetInstanceIdCounter() {
        if (Object.keys(determine.instances).length != 1)
            throw new Error('instanceinator.instances need to be of length 1 when calling resetInstanceIdCounter!')
        this.instanceIdCounter = 1
    }

    id: number

    general!: prng
    visual!: prng
    sound!: prng
    event!: prng
    misc!: prng

    visualLog!: string[]
    soundLog!: string[]
    eventLog!: string[]
    miscLog!: string[]

    constructor(
        seed: string,
        public allTheSame: boolean = false,
        public logEvents: boolean = false
    ) {
        this.id = DeterMineInstance.instanceIdCounter
        DeterMineInstance.instanceIdCounter++

        this.setSeed(seed)
    }

    setSeed(seed: string) {
        const args: seedRandomOptions = {
            state: true,
        }
        if (this.allTheSame) {
            this.general = this.visual = this.sound = this.event = this.misc = new Math.seedrandomSeed(seed, args)
        } else {
            this.general = new Math.seedrandomSeed(seed, args)
            this.visual = new Math.seedrandomSeed(seed, args)
            this.sound = new Math.seedrandomSeed(seed, args)
            this.event = new Math.seedrandomSeed(seed, args)
            this.misc = new Math.seedrandomSeed(seed, args)
        }
        this.visualLog = []
        this.soundLog = []
        this.eventLog = []
        this.miscLog = []
    }

    static printCompressedLog(log: string[]) {
        const newLog: [number, string][] = []
        for (const event of log) {
            if (newLog.last() && newLog.last()[1] == event) {
                newLog.last()[0]++
            } else {
                newLog.push([1, event])
            }
        }
        console.log(newLog)
    }
}
