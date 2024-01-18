import { Rover } from "../classes/Rover";

export class RoverInterpreteur {
    private rover: Rover;

    constructor(rover: Rover) {
        this.rover = rover;
    }

    executerCommande(commande: String) {
        console.log("Rover Debug : ", this.rover);
        switch (commande.toLowerCase()) {
            case "avancer":
                this.rover.avancer();
                break;
            case "reculer":
                this.rover.reculer();
                break;
            case "gauche":
                this.rover.tournerGauche();
                break;
            case "droite":
                this.rover.tournerDroite();
                break;
            default:
                console.log("Commande non reconnue");
                break;
        }
    }
}
