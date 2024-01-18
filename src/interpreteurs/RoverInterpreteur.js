"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoverInterpreteur = void 0;
class RoverInterpreteur {
    constructor(rover) {
        this.rover = rover;
    }
    executerCommande(commande) {
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
exports.RoverInterpreteur = RoverInterpreteur;
