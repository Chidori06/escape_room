export class Door {
    isLocked: boolean;
    padlock: string;

    constructor(isLocked: boolean, padlock: string) {
        this.isLocked = isLocked;
        this.padlock = padlock;
    }

    getThroughDoor(door: Door): boolean {
        return this.isLocked ? true : false;
    }

}

export class Player {

    keys: string[]

    constructor(keys: string[]) {
        this.keys = keys;
    }

    openDoor(door: Door): boolean {
        const hasKey = this.keys.includes(door.padlock);

        if (hasKey) {
            door.isLocked = false;
            return true;
        }
        return false;
    }
}