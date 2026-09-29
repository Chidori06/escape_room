export class Door {
    isLocked: boolean;
    padlock?: string;

    constructor(isLocked: boolean, padlock?: string) {
        this.isLocked = isLocked;
        padlock && (this.padlock = padlock);
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
        if (!door.padlock) {
            door.isLocked = false;
            return true;
        }

        const keyIndex = this.inventory.indexOf(door.padlock);
        if (keyIndex !== -1) {
            door.isLocked = false;
            this.inventory.splice(keyIndex, 1);
            return true;
        }

        return false;
    }

    getItems(room: Room, item: string): boolean {
        const roomItems = room.items.indexOf(item);

        if (roomItems !== -1) {
            this.inventory.push(item);
            room.items.splice(roomItems, 1);
            return true;
        }
        return false;
    }

}

export class Room {
    items: string[];

    constructor(items: string[]) {
        this.items = items;
    }
}