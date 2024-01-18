import { Planete } from "../classes/Planete";
import { Position } from "../classes/Position";
import { Coordonates } from "../classes/Coordonates";
import { Direction } from "../enums/Direction";
import { Rover } from "../classes/Rover";

export class RoverBuilder {
    position: Position = new Position(new Coordonates(0,0), Direction.Nord);
    planete: Planete = new Planete(10, 10);

    // withPlanete(planete: Planete): this {
    //     this.planete = planete;
    //     return this;
    // }

    withPosition(x: number, y: number, direction: Direction): this {
        this.position.coordonates = new Coordonates(x, y);
        this.position.direction = direction;
        return this;
    }

    build(): Rover {
        return new Rover(this.position, this.planete);
    }
}