import {Obstacle} from "../classes/Obstacle";

export interface IPlanete {
    width: number;
    height: number;

    obstacles: Obstacle[];
}