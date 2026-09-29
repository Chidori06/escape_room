export class Door {
    isLocked: boolean;

    constructor(isLocked: boolean) {
        this.isLocked = true;
    }

    getThroughDoor(door: Door): boolean {
        // if (this.isLocked) {
        //     return true;
        // }
        // return false;
        return this.isLocked ? true : false;
    }

}