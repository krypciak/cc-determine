export class DeterMineInstance {
    private static instanceIdCounter = 0

    static resetInstanceIdCounter() {
        if (Object.keys(determine.instances).length != 1)
            throw new Error('instanceinator.instances need to be of length 1 when calling resetInstanceIdCounter!')
        this.instanceIdCounter = 1
    }

    id: number

    general!: () => number
    visual!: () => number
    sound!: () => number
    event!: () => number

    constructor(
        seed: string,
        public allTheSame: boolean = false
    ) {
        this.id = DeterMineInstance.instanceIdCounter
        DeterMineInstance.instanceIdCounter++

        this.setSeed(seed)
    }

    setSeed(seed: string) {
        if (this.allTheSame) {
            this.general = this.visual = this.sound = this.event = new Math.seedrandomSeed(seed)
        } else {
            this.general = new Math.seedrandomSeed(seed)
            this.visual = new Math.seedrandomSeed(seed)
            this.sound = new Math.seedrandomSeed(seed)
            this.event = new Math.seedrandomSeed(seed)
        }
    }
}
