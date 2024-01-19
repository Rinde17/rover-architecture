import { Planete } from "../../src/classes/Planete";
import { Position } from "../../src/classes/Position";
import { Coordinates } from "../../src/classes/Coordinates";
import { Direction } from "../../src/enums/Direction";
import { Rover } from "../../src/classes/Rover";

export class RoverBuilder {
    position: Position = new Position(new Coordinates(0,0), Direction.Nord);
    planete: Planete = new Planete(10, 10);

    // withPlanete(planete: Planete): this {
    //     this.planete = planete;
    //     return this;
    // }

    withPosition(x: number, y: number, direction: Direction): this {
        this.position.coordinates = new Coordinates(x, y);
        this.position.direction = direction;
        return this;
    }

    build(): Rover {
        return new Rover(this.position, this.planete);
    }
}