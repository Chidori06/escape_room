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

    inventory: string[]

    constructor(inventory: string[]) {
        this.inventory = inventory;
    }

    openDoor(door: Door): boolean {
        const hasKey = this.inventory.indexOf(door.padlock);

        if (hasKey !== -1) {
            door.isLocked = false;
            this.inventory.splice(hasKey, 1);
            return true;
        }
        return false;
    }



}