"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoverBuilder = void 0;
const Planete_1 = require("../classes/Planete");
const Position_1 = require("../classes/Position");
const Coordonates_1 = require("../classes/Coordonates");
const Direction_1 = require("../enums/Direction");
const Rover_1 = require("../classes/Rover");
class RoverBuilder {
    constructor() {
        this.position = new Position_1.Position(new Coordonates_1.Coordonates(0, 0), Direction_1.Direction.Nord);
        this.planete = new Planete_1.Planete(10, 10);
    }
    // withPlanete(planete: Planete): this {
    //     this.planete = planete;
    //     return this;
    // }
    withPosition(x, y, direction) {
        this.position.coordonates = new Coordonates_1.Coordonates(x, y);
        this.position.direction = direction;
        return this;
    }
    build() {
        return new Rover_1.Rover(this.position, this.planete);
    }
}
exports.RoverBuilder = RoverBuilder;
