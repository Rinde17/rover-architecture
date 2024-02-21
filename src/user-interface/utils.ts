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

export const generateGridIndexes = (planeteSize: {
    width: number;
    height: number;
}): { yIndexArray: Array<string>; xIndexArray: Array<string> } => {
    const alphabet: string = " abcdefghijklmnopqrstuvwxyz";
    const alphabetTable: string[] = [];

    for (let i = 0; i < planeteSize.width; i++) {
        if (i < alphabet.length) {
            alphabetTable.push(alphabet[i].toUpperCase());
        } else {
            alphabetTable.push(alphabet[i % alphabet.length].toUpperCase());
        }
    }

    const numberTable = [];

    for (let j = 0; j <= planeteSize.height; j++) {
        numberTable.push(j.toString());
    }

    return { yIndexArray: alphabetTable.reverse(), xIndexArray: numberTable };
};
