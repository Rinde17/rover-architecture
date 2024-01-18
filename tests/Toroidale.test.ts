import {Direction} from "../src/enums/Direction";
import {RoverBuilder} from "../src/builder/RoverBuilder";

describe("La Planete est TOROIDALE", () => {
    test("TOROIDALE si le rover en (0,9) direction NORD passe en (0,0) quand il avance (Sur une planète 10x10)", () => {
        // Rover de référence
        const roverRef = new RoverBuilder().withPosition(0,0, Direction.Nord).build();

        // Rover à tester
        const roverTest = new RoverBuilder().withPosition(0,9, Direction.Nord).build();
        roverTest.avancer();

        // Comparaison avec le Rover de référence
        expect(roverTest.getCoordonnees()).toStrictEqual(roverRef.getCoordonnees());
        expect(roverTest.getDirection()).toBe(roverRef.getDirection());
    });

    test("TOROIDALE si le rover en (9,0) direction EST passe en (0,0) quand il avance (Sur une planète 10x10)", () => {
        // Rover de référence
        const roverRef = new RoverBuilder().withPosition(0,0, Direction.Est).build();

        // Rover à tester
        const roverTest = new RoverBuilder().withPosition(9,0, Direction.Est).build();
        roverTest.avancer();

        // Comparaison avec le Rover de référence
        expect(roverTest.getCoordonnees()).toStrictEqual(roverRef.getCoordonnees());
        expect(roverTest.getDirection()).toBe(roverRef.getDirection());
    });

    test("TOROIDALE si le rover en (0,0) direction SUD passe en (0,9) quand il avance (Sur une planète 10x10)", () => {
        // Rover de référence
        const roverRef = new RoverBuilder().withPosition(0,9, Direction.Sud).build();

        // Rover à tester
        const roverTest = new RoverBuilder().withPosition(0,0, Direction.Sud).build();
        roverTest.avancer();

        // Comparaison avec le Rover de référence
        expect(roverTest.getCoordonnees()).toStrictEqual(roverRef.getCoordonnees());
        expect(roverTest.getDirection()).toBe(roverRef.getDirection());
    });

    test("TOROIDALE si le rover en (0,0) direction OUEST passe en (9,0) quand il avance (Sur une planète 10x10)", () => {
        // Rover de référence
        const roverRef = new RoverBuilder().withPosition(9,0, Direction.Ouest).build();

        // Rover à tester
        const roverTest = new RoverBuilder().withPosition(0,0, Direction.Ouest).build();
        roverTest.avancer();

        // Comparaison avec le Rover de référence
        expect(roverTest.getCoordonnees()).toStrictEqual(roverRef.getCoordonnees());
        expect(roverTest.getDirection()).toBe(roverRef.getDirection());
    });
})