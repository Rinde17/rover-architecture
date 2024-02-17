import { Position } from "./mission-control/Grid";

export const printOutput = (message: Array<string>) => {
    const stdoutElement = document.getElementById("textarea");
    for (let i = 0; i < message.length; i++) {
        stdoutElement!.innerHTML +=
            stdoutElement!.innerHTML.length > 0
                ? `\n> ${message[i]}`
                : `> ${message[i]}`;
    }
    stdoutElement!.scrollTop = stdoutElement!.scrollHeight;
};

export const applyRoverPosition = (
    newPositions: Position,
    oldPositions: Position
) => {
    console.log("oldPosition: ", oldPositions);
    console.log("New positions", newPositions);
    if (
        oldPositions.x !== newPositions.x ||
        oldPositions.y !== newPositions.y
    ) {
        console.log("oldPosition not equals newPosition");
        oldCellColorReset(oldPositions);
    }
    const cell = document.getElementById(
        `x${newPositions.x}-y${newPositions.y}`
    );
    if (cell) {
        console.log(
            "style applyed to cell { x: " +
                newPositions.x +
                ", y: " +
                newPositions.y +
                " }"
        );
        cell.style.setProperty("background-color", "red");
    }
};

export const oldCellColorReset = (oldPosition: Position) => {
    const oldCell = document.getElementById(
        `x${oldPosition.x}-y${oldPosition.y}`
    );
    if (oldCell) {
        oldCell.style.setProperty("background-color", "transparent");
    }
};
