import {Direction} from "../src/enums/Direction";
import {RoverBuilder} from "../src/builder/RoverBuilder";

describe("Le rover peut tourner à GAUCHE", () => {
    test("GAUCHE quand le Rover est Direction NORD", () => {
        // Rover de référence
        const roverRef = new RoverBuilder().withPosition(5,5, Direction.Ouest).build();

        // Rover à tester
        const roverTest = new RoverBuilder().withPosition(5,5, Direction.Nord).build();
        roverTest.tournerGauche();

        // Comparaison avec le Rover de référence
        expect(roverTest.getCoordonnees()).toStrictEqual(roverRef.getCoordonnees());
        expect(roverTest.getDirection()).toBe(roverRef.getDirection());
    });

    test("GAUCHE quand le Rover est Direction EST", () => {
        // Rover de référence
        const roverRef = new RoverBuilder().withPosition(5,5, Direction.Nord).build();

        // Rover à tester
        const roverTest = new RoverBuilder().withPosition(5,5, Direction.Est).build();
        roverTest.tournerGauche();

        // Comparaison avec le Rover de référence
        expect(roverTest.getCoordonnees()).toStrictEqual(roverRef.getCoordonnees());
        expect(roverTest.getDirection()).toBe(roverRef.getDirection());
    });

    test("GAUCHE quand le Rover est Direction SUD", () => {
        // Rover de référence
        const roverRef = new RoverBuilder().withPosition(5,5, Direction.Est).build();

        // Rover à tester
        const roverTest = new RoverBuilder().withPosition(5,5, Direction.Sud).build();
        roverTest.tournerGauche();

        // Comparaison avec le Rover de référence
        expect(roverTest.getCoordonnees()).toStrictEqual(roverRef.getCoordonnees());
        expect(roverTest.getDirection()).toBe(roverRef.getDirection());
    });

    test("GAUCHE quand le Rover est Direction OUEST", () => {
        // Rover de référence
        const roverRef = new RoverBuilder().withPosition(5,5, Direction.Sud).build();

        // Rover à tester
        const roverTest = new RoverBuilder().withPosition(5,5, Direction.Ouest).build();
        roverTest.tournerGauche();

        // Comparaison avec le Rover de référence
        expect(roverTest.getCoordonnees()).toStrictEqual(roverRef.getCoordonnees());
        expect(roverTest.getDirection()).toBe(roverRef.getDirection());
    })
})