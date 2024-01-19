import { io } from "socket.io-client";
import readline from "readline";

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function demanderCommande() {
    while (true) {
        const commande: string = await poserQuestion("Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter) : ");

        // Convertir la commande en minuscules pour éviter les erreurs de casse
        const commandeMinuscule = commande.toLowerCase();

        socket.emit("commande", commandeMinuscule);

        // Attendre la réponse du serveur
        const reponse = await attendreReponse();

        // Afficher la réponse
        console.log(reponse);

        if (commandeMinuscule === '9') {
            // Si la commande est "9", fermer la connexion et terminer le programme
            console.log("Déconnexion ...");

            setTimeout(() => {
                console.log("Le Mission Controller est bien déconnecté !");
            }, 3000);

            rl.close();
            socket.close();
            break;
        }
    }
}

function poserQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

function attendreReponse() {
    return new Promise((resolve) => {
        socket.once('response', resolve);
    });
}

socket.on("connect", () => {
    console.log("Le client MissionController est connecté !");
    // Démarrer la boucle en demandant la première commande
    demanderCommande();
});
