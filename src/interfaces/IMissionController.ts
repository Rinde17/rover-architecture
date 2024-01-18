import { Rover } from "../classes/Rover";

export interface IMissionController {
    envoyerCommandeAuRover(commande: String, rover: Rover): void;
}
