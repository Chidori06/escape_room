export class Door {
    isLocked: boolean;
    key: string;

    constructor(isLocked: boolean, key: string) {
        this.isLocked = isLocked;
        this.key = key;
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
        const hasKey = this.keys.includes(door.key);

        if (hasKey) {
            door.isLocked = false;
            return true;
        }
        return false;
    }
}