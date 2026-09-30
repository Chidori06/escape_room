import { describe, expect, it } from "vitest";
import { Door, Enigma, Player, Room } from "./door";

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

describe("Door", () => {
    it("Ouvrir une porte nécessitant une clé", () => {
        const door = new Door(true, "red-key");
        const player = new Player(["red-key"]);
        player.openDoor(door);

        expect(door.getThroughDoor).toBeTruthy();
    });

});

describe("Door", () => {
    it("Ouvrir la porte consomme la clé", () => {
        const door = new Door(true, "red-key");
        const player = new Player(["red-key", "torch"]);
        player.openDoor(door);

        expect(door.getThroughDoor).toBeTruthy;
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

describe("Player", () => {
    it("Un objet déjà ramassé ne peut pas l'être deux fois", () => {
        const room = new Room(["torch"]);
        const player = new Player([]);
        const firstItem = player.getItems(room, "torch");
        const secondItem = player.getItems(room, "torch");

        expect(firstItem).toBe(true);
        expect(secondItem).toBe(false);

        expect(room.items).toEqual([]);
        expect(player.inventory).toEqual(["torch"]);
    });

});

describe("Player", () => {
    it("Un joueur peut utiliser un objet qu'il possède", () => {
        const player = new Player(["torch"]);

        const result = player.useItem("torch");

        expect(result).toBeTruthy();
    });

    it("Un joueur ne peut pas utiliser un objet qu'il ne possède pas", () => {
        const player = new Player(["torch"]);

        const result = player.useItem("red-key");

        expect(result).toBeFalsy();
    });
});

describe("Player", () => {
    it("Un joueur donne la bonne réponse à l'énigme", () => {
        const player = new Player([], ["yes"]);
        const riddle = new Enigma([{ question: "Es-tu là ?", response: "yes" }])

        const result = player.giveAnswer(riddle.riddles[0], player.keywords[0]);


        expect(result).toBeTruthy();
    });

    it("Un joueur donne la mauvaise réponse à l'énigme", () => {
        const player = new Player([], ["no"]);
        const riddle = new Enigma([{ question: "Es-tu là ?", response: "yes" }])

        const result = player.giveAnswer(riddle.riddles[0], player.keywords[0]);


        expect(result).toBe(false);
    });
});

describe("Door", () => {
    it("Franchir la porte avec énigme résolue", () => {
        const player = new Player([], ["yes"]);
        const riddle = new Enigma([{ question: "Es-tu là ?", response: "yes" }])
        const door = new Door(true);

        player.giveAnswer(riddle.riddles[0], player.keywords[0]);
        player.openDoor(door);

        expect(door.getThroughDoor).toBeTruthy;
    });

    it("Franchir la porte avec énigme non résolue", () => {
        const player = new Player([], ["no"]);
        const riddle = new Enigma([{ question: "Es-tu là ?", response: "yes" }])
        const door = new Door(true);

        player.giveAnswer(riddle.riddles[0], player.keywords[0]);
        player.openDoor(door);

        expect(door.getThroughDoor(door)).toBe(false);
    });
});

describe("Door", () => {
    it("Essayer de résoudre l'énigme deux fois", () => {
        const player = new Player([], ["no", "yes"]);
        const riddle = new Enigma([{ question: "Es-tu là ?", response: "yes" }])
        const door = new Door(true);

        player.giveAnswer(riddle.riddles[0], player.keywords[0]);
        player.openDoor(door);
        player.giveAnswer(riddle.riddles[0], player.keywords[1]);
        player.openDoor(door);
        expect(door.getThroughDoor(door)).toBeTruthy;
    });

    it("Essayer de résoudre l'énigme trois fois donc conséquence", () => {
        const player = new Player([], ["no", "peut-être", "pas sûr"], []);
        const riddle = new Enigma([{ question: "Es-tu là ?", response: "yes" }])
        const door = new Door(true);

        player.giveAnswer(riddle.riddles[0], player.keywords[0]);
        player.openDoor(door);
        player.giveAnswer(riddle.riddles[0], player.keywords[1]);
        player.openDoor(door);
        player.giveAnswer(riddle.riddles[0], player.keywords[3]);
        player.openDoor(door);

        expect(door.getThroughDoor(door)).toBe(false);
        //expect(player.curse).toContain(["maudit"]);
    });
});
