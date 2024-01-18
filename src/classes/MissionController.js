"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionController = void 0;
class MissionController {
    constructor(roverInterpreteur) {
        this.roverInterpreteur = roverInterpreteur;
    }
    envoyerCommandeAuRover(commande) {
        this.roverInterpreteur.executerCommande(commande);
    }
}
exports.MissionController = MissionController;
