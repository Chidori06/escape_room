import { describe, expect, it } from "vitest";
import { Door, Player, Room } from "./door";

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

describe("Door", () => {
    it("Ouvrir la porte consomme la clé", () => {
        const door = new Door(true, "red-key");
        const player = new Player(["red-key", "torch"]);
        player.openDoor(door);

        expect(door.getThroughDoor).toBeTruthy;
        expect(player.inventory).not.toContain("red-key");
        expect(player.inventory).toContain("torch");
    });

});

describe("Player", () => {
    it("Ramasse un objet dans la salle et l'ajoute à son inventaire", () => {
        const room = new Room(["torch"]);
        const player = new Player([]);
        player.getItems(room, "torch");

        expect(player.getItems).toBeTruthy;
        expect(room.items).not.toContain("torch");
        expect(player.inventory).toContain("torch");
    });

});