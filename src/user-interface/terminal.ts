import van, { State } from "vanjs-core";
import io from "socket.io-client";

const { button, img, span } = van.tags;

const socket = io("http://localhost:3000", { autoConnect: false });

const stdoutElement = document.getElementById("std-out");

const isConnected: State<boolean> = van.state(false);

socket.on("connect", () => {
    isConnected.val = true;
    changeConnexionIconColor();
    stdoutElement!.innerText += "\n> La connexion au Rover est établie !";
    stdoutElement!.innerText +=
        "\n> Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter)";
});

socket.on("disconnect", (message) => {
    stdoutElement!.innerText +=
        "\n> La connexion avec le Rover à été interrompue !";
    console.log(message);
    stdoutElement!.innerText += `\n> ${message}`;
});

const changeConnexionIconColor = () => {
    const connexionIndicator = document.getElementById("connexion-indicator");
    if (socket.connected === true) {
        connexionIndicator!.style.color = "green";
    } else {
        connexionIndicator!.style.color = "red";
    }
};

export const ConnexionIndicator = () => {
    return span(
        {
            id: "connexion-indicator",
            style: "font-size: 56px; margin: 0;",
        },
        "•"
    );
};

const socketOnOff = () => {
    if (socket.connected) {
        console.log(socket.connected);
        stdoutElement!.innerText += "\n> Déconnexion en cours ...";
        setTimeout(() => {
            socket.close();
            changeConnexionIconColor();
        }, 1500);
        changeConnexionIconColor();

        /* socket.emit("close", "La connexion avec le Rover à été interrompue !");
        socket.close();
        isConnected.val = false;
        changeConnexionIconColor();
        stdoutElement!.innerText +=
            "\n> La connexion avec le Rover à été interrompue !"; */
    } else {
        console.log(socket.connected);
        stdoutElement!.innerText += "\n> Connexion en cours ...";
        setTimeout(() => {
            socket.open();
            changeConnexionIconColor();
        }, 1500);

        /* 
        isConnected.val = true;
        changeConnexionIconColor();
        stdoutElement!.innerText += "\n> La connexion au Rover est établie";
        stdoutElement!.innerText +=
            "\n> Entrez une commande (z: avancer, s: reculer, q: gauche, d: droite, 9: quitter)"; */
    }
};

const Terminal = () => {
    return button(
        { onclick: () => socketOnOff(), id: "disconnected-btn" },
        img({
            src: "./src/assets/img/off-svgrepo-com.svg",
            id: "disconnected-icon",
            width: "56",
            height: "56",
        })
    );
};

export default Terminal;
