export class Door {
    isLocked: boolean;
    padlock?: string;
    alarmProtected?: boolean = false;
    alarm?: Alarm;
    riddleDoor?: boolean;


    constructor(isLocked: boolean, padlock?: string, riddleDoor?: boolean, alarmProtected?: boolean,) {
        this.isLocked = isLocked;
        padlock && (this.padlock = padlock);
        alarmProtected && (this.alarmProtected = alarmProtected);
        this.riddleDoor = riddleDoor;

    }

    setAlarm(alarm: Alarm): void {
        this.alarm = alarm;
    }

    getThroughDoor(): boolean {
        if (this.isLocked) {
            return false;
        }
        if (this.alarmProtected && this.alarm?.isOn) {
            return false;
        }

        return true;
    }

}

export class Player {
    inventory: string[];
    keywords: string[];
    riddleSolved: boolean;
    failure: number;
    curse: string[];


    constructor(inventory: string[], keywords: string[] = [], curse: string[] = []) {
        this.inventory = inventory;
        this.keywords = keywords;
        this.curse = curse;
        this.riddleSolved = false;
        this.failure = 0;
    }

    openDoor(door: Door): boolean {
        if (door.riddleDoor && !this.riddleSolved) {
            return false;
        }

        if (door.padlock) {
            const keyIndex = this.inventory.indexOf(door.padlock);

            if (keyIndex === -1) {
                return false;
            }

            this.inventory.splice(keyIndex, 1);
        }

        door.isLocked = false;
        return true;

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
            this.riddleSolved = true;
            return true;
        }

        this.failure++;

        if (this.failure >= 3) {
            this.curse.push("maudit");
            return false;
        }

        return false;
    }

    disableAlarm(alarm: Alarm, code: string): boolean {
        const alarmIndex = this.inventory.indexOf("alarm-code");

        if (alarmIndex === -1) {
            return false;
        }

        const disabled = alarm.desactivate(code);

        if (!disabled) {
            return false;
        }

        this.inventory.splice(alarmIndex, 1);
        return true;
    }

}

export class Room {
    items: string[];

    constructor(items: string[]) {
        this.items = items;
    }
}

interface IRiddle { question: string, response: string }

export class Enigma {
    riddles: IRiddle[];

    constructor(riddles: IRiddle[] = []) {
        this.riddles = riddles;
    }
}

export class Alarm {
    isOn: boolean;
    code?: string;

    constructor(code?: string) {
        this.isOn = false;
        this.code = code;
    }

    activate(): void {
        this.isOn = true;
    }

    desactivate(code?: string): boolean {
        if (code === this.code) {
            this.isOn = false;
            return true;
        }

        return false;
    }
}