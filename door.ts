export class Door {
    isLocked: boolean;
    padlock?: string;
    riddle?: Riddle[];

    constructor(isLocked: boolean, padlock?: string, riddle?: Riddle[]) {
        this.isLocked = isLocked;
        padlock && (this.padlock = padlock);
        riddle && (this.riddle = []);
    }

    getThroughDoor(door: Door): boolean {
        return this.isLocked ? true : false;
    }

}

export class Player {

    inventory: string[];
    keywords: string[];

    constructor(inventory: string[], keywords: string[] = []) {
        this.inventory = inventory;
        this.keywords = keywords;
    }

    openDoor(door: Door): boolean {
        if (!door.padlock) {
            door.isLocked = false;
            return true;
        }

        if (!door.riddle) {
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

    useItem(item: string): boolean {
        return this.inventory.includes(item);
    }

    giveAnswer(riddle: IRiddle, playerAnswer: string): boolean {
        if (riddle.response === playerAnswer) {
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
interface IRiddle { question: string, response: string }
export class Riddle {
    riddles: IRiddle[];

    constructor(riddles: IRiddle[] = []) {
        this.riddles = riddles;
    }
}