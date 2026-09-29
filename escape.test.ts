import { describe, expect, it } from "vitest";
import { Door, Player } from "./door";

describe("Door", () => {
    it("Une porte fermée ne peut pas être franchie", () => {
        const door = new Door(true, "red-key");
        const result = door.getThroughDoor;

        expect(result).toBeTruthy;
    });

});

describe("Door", () => {
    it("Une porte ouverte peut être franchie", () => {
        const door = new Door(false, "red-key");
        const result = door.getThroughDoor;

        expect(result).toBeFalsy;
    });

});

describe("Door", () => {
    it("Ouvrir une porte nécessitant une clé", () => {
        const door = new Door(true, "red-key");
        const player = new Player(["red-key"]);
        player.openDoor(door);

        expect(door.getThroughDoor).toBeTruthy;
    });

});