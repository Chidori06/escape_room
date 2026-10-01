import { describe, expect, it } from "vitest";
import { Alarm, Door, Enigma, Player, Room } from "./door";

describe("Door", () => {
    it("Une porte fermée ne peut pas être franchie", () => {
        const door = new Door(true);
        const result = door.getThroughDoor();

        expect(result).toBe(false);
    });

});

describe("Door", () => {
    it("Une porte ouverte peut être franchie", () => {
        const door = new Door(false);
        const result = door.getThroughDoor();

        expect(result).toBe(true);
    });

});

describe("Door", () => {
    it("Ouvrir une porte nécessitant une clé", () => {
        const door = new Door(true, "red-key");
        const player = new Player(["red-key"]);
        player.openDoor(door);

        expect(door.getThroughDoor()).toBeTruthy();
    });

});

describe("Door", () => {
    it("Ouvrir la porte consomme la clé", () => {
        const door = new Door(true, "red-key");
        const player = new Player(["red-key", "torch"]);
        player.openDoor(door);

        expect(door.getThroughDoor()).toBeTruthy;
        expect(player.inventory).toContain("torch");
    });

});

describe("Player", () => {
    it("Ramasse un objet dans la salle et l'ajoute à son inventaire", () => {
        const room = new Room(["torch"]);
        const player = new Player([]);
        player.getItems(room, "torch");

        expect(player.getItems).toBeTruthy();
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

        expect(result).toBe(false);
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
        const door = new Door(true, undefined, true, false);

        player.giveAnswer(riddle.riddles[0], player.keywords[0]);
        player.openDoor(door);

        expect(door.getThroughDoor()).toBeTruthy();
    });

    it("Franchir la porte avec énigme non résolue", () => {
        const player = new Player([], ["no"]);
        const riddle = new Enigma([{ question: "Es-tu là ?", response: "yes" }])
        const door = new Door(true, undefined, true, false);

        player.giveAnswer(riddle.riddles[0], player.keywords[0]);
        player.openDoor(door);

        expect(door.getThroughDoor()).toBe(false);
    });
});

describe("Door", () => {
    it("Essayer de résoudre l'énigme deux fois", () => {
        const player = new Player([], ["no", "yes"]);
        const riddle = new Enigma([{ question: "Es-tu là ?", response: "yes" }])
        const door = new Door(true, undefined, true, false);

        player.giveAnswer(riddle.riddles[0], player.keywords[0]);
        player.openDoor(door);
        player.giveAnswer(riddle.riddles[0], player.keywords[1]);
        player.openDoor(door);
        expect(door.getThroughDoor()).toBeTruthy;
    });

    it("Essayer de résoudre l'énigme trois fois donc conséquence", () => {
        const player = new Player([], ["no", "peut-être", "pas sûr"], []);
        const riddle = new Enigma([{ question: "Es-tu là ?", response: "yes" }])
        const door = new Door(true, undefined, true, false);

        player.giveAnswer(riddle.riddles[0], player.keywords[0]);
        player.openDoor(door);
        player.giveAnswer(riddle.riddles[0], player.keywords[1]);
        player.openDoor(door);
        player.giveAnswer(riddle.riddles[0], player.keywords[2]);
        player.openDoor(door);

        expect(door.getThroughDoor()).toBe(false);
        expect(player.curse).toEqual(["maudit"]);


    });
});

describe("Alarm", () => {
    it("Une alarme est inactive au départ", () => {
        const alarm = new Alarm();

        expect(alarm.isOn).toBe(false);
    });

    it("Une action permet d'activer l'alarme", () => {
        const alarm = new Alarm();
        alarm.activate();

        expect(alarm.isOn).toBe(true);
    });

    it("Une action permet de désactiver l'alarme", () => {
        const alarm = new Alarm();
        alarm.activate();
        alarm.desactivate();

        expect(alarm.isOn).toBe(false);
    });
});

describe("Door", () => {
    it("Essayer de passer une porte sans alarme active", () => {
        const alarm = new Alarm();
        const door = new Door(false, undefined, false, false);
        expect(door.getThroughDoor()).toBeTruthy();
    });

    it("Essayer de passer une porte avec une alarme", () => {
        const alarm = new Alarm();
        alarm.activate();
        const door = new Door(false, undefined, false, true);
        door.setAlarm(alarm);

        expect(door.getThroughDoor()).toBe(false);
    });

    it("Franchir une porte non protégée par une alarme", () => {
        const alarm = new Alarm();
        alarm.activate();
        const door = new Door(false, undefined, false, false);

        expect(door.getThroughDoor()).toBe(true);
    });
});

describe("Alarm", () => {
    it("Un bon code désactive l'alarme", () => {
        const alarm = new Alarm("1234");
        alarm.desactivate("1234");

        expect(alarm.isOn).toBe(false);
    });

    it("Un mauvais code ne désactive pas l'alarme", () => {
        const alarm = new Alarm("1234");
        alarm.activate();
        alarm.desactivate("0000");

        expect(alarm.isOn).toBe(true);
    });
});

describe("Player", () => {
    it("Désactive l'alarme et consomme l'objet", () => {
        const alarm = new Alarm("1234");
        alarm.activate();
        const player = new Player(["alarm-code"]);
        player.disableAlarm(alarm, "1234");

        expect(alarm.isOn).toBe(false);
        expect(player.inventory).not.toContain("alarm-code");
    });
});

it("Ne désactive pas l'alarme et ne consomme pas l'objet", () => {
    const alarm = new Alarm("1234");
    alarm.activate();
    const player = new Player(["alarm-code"]);
    player.disableAlarm(alarm, "0000");

    expect(alarm.isOn).toBe(true);
    expect(player.inventory).toContain("alarm-code");
});

it("Une porte protégée par l'alarme peut être franchie après désactivation", () => {
    const alarm = new Alarm("1234");
    alarm.activate();
    const player = new Player(["alarm-code"]);
    const door = new Door(false, undefined, false, true);
    door.setAlarm(alarm);

    expect(door.getThroughDoor()).toBe(false);

    player.disableAlarm(alarm, "1234");

    expect(door.getThroughDoor()).toBe(true);
});





