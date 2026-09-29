import { describe, expect, it } from "vitest";
import { Door } from "./door";

describe("Door", () => {
    it("Une porte fermée ne peut pas être franchie", () => {
        const door = new Door(true);
        const result = door.getThroughDoor;

        expect(result).toBeTruthy;
    });

});

describe("Door", () => {
    it("Une porte ouverte peut être franchie", () => {
        const door = new Door(false);
        const result = door.getThroughDoor;

        expect(result).toBeFalsy;
    });

});