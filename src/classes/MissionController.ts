import { RoverInterpreteur } from "../interpreteurs/RoverInterpreteur";
import { IMissionController } from "../interfaces/IMissionController";

export class MissionController implements IMissionController {
    private roverInterpreteur: RoverInterpreteur;

    constructor(roverInterpreteur: RoverInterpreteur) {
        this.roverInterpreteur = roverInterpreteur;
    }

    envoyerCommandeAuRover(commande: String) {
        this.roverInterpreteur.executerCommande(commande);
    }
}
