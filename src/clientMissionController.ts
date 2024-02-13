import { io } from "socket.io-client";
import readline from "readline";
import { Inputs } from "./enums/Inputs";

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function demanderCommande() {
    while (true) {
        const commande: string = await poserQuestion(
            "Entrez des commandes (" +
                Inputs.Avancer +
                ": avancer, " +
                Inputs.Reculer +
                ": reculer, " +
                Inputs.Gauche +
                ": gauche, " +
                Inputs.Droite +
                ': droite) ou "exit" pour quitter : '
        );

        // Quitter le programme
        if (commande.toLowerCase() === "exit") {
            // Déconnexion
            console.log("Déconnexion ...");

            setTimeout(() => {
                console.log("Le Mission Controller est bien déconnecté !");
                socket.emit(
                    "close",
                    "Le Mission Controller est bien déconnecté !"
                );
            }, 3000);

            rl.close();
            socket.close();
            break;
        }

        socket.emit("commande", commande);

        // Attendre la réponse du serveur
        const reponse = await attendreReponse();

        // Afficher la réponse
        console.log(reponse);
    }
}

function poserQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

function attendreReponse() {
    return new Promise((resolve) => {
        socket.once("response", resolve);
    });
}

socket.on("connect", () => {
    console.log("Le client MissionController est connecté !");
    // Démarrer la boucle en demandant la première commande
    demanderCommande();
});
