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

    constructor(
        seed: string,
        public allTheSame: boolean = false
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
            this.general = this.visual = this.sound = this.event = new Math.seedrandomSeed(seed, args)
        } else {
            this.general = new Math.seedrandomSeed(seed, args)
            this.visual = new Math.seedrandomSeed(seed, args)
            this.sound = new Math.seedrandomSeed(seed, args)
            this.event = new Math.seedrandomSeed(seed, args)
        }
        console.log(this.general)
    }
}
