import { IPlanete } from "../interfaces/IPlanete";
import { Obstacle } from "./Obstacle";

export class Planete implements IPlanete {
    width: number;
    height: number;

    obstacles: Obstacle[] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
