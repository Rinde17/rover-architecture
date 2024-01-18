import { RoverInterpreteur } from "../interpreteurs/RoverInterpreteur";

export class MissionController implements IMissionController {
    private roverInterpreteur: RoverInterpreteur;

    constructor(roverInterpreteur: RoverInterpreteur) {
        this.roverInterpreteur = roverInterpreteur;
    }

    envoyerCommandeAuRover(commande: String) {
        this.roverInterpreteur.executerCommande(commande);
    }
}