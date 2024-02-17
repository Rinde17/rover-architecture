import { Socket } from "socket.io-client";
import van from "vanjs-core";
import { applyRoverPosition, generateGridIndexes } from "../utils";

const { table, tbody, tr, th, td } = van.tags;

export type Position = { x: number; y: number };

const Grid = (socket: Socket) => {
    const xIndex = van.state<Array<string>>([
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
    ]);
    const yIndex = van.state<Array<string>>([
        "",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
    ]);

    socket.emit("ask-for-planete-size");
    socket.on("planete-size", (size: { width: number; height: number }) => {
        console.log("Planete size: ", size);
        const { yIndexArray, xIndexArray } = generateGridIndexes(size);
        yIndex.val = yIndexArray;
        xIndex.val = xIndexArray;
        applyRoverPosition(oldPosition.val, oldPosition.oldVal);
    });

    // Negative initials values to avoid equals positions in case of backend positions set on x: 0, y: 0
    const oldPosition = van.state<Position>({ x: -1, y: -1 });

    socket.on("rover-position", (positions: Position) => {
        applyRoverPosition(positions, oldPosition.oldVal);
        oldPosition.val = { x: positions.x, y: positions.y };
    });
    return () =>
        table(
            {},
            tbody(
                {},
                yIndex.val.map((yIndexLabel, index) =>
                    tr({ id: index === 0 ? "x-index" : `row-${index}` }, [
                        th({ id: `y-index-${index}` }, yIndexLabel),
                        index === 0
                            ? xIndex.val.map((_, index2) =>
                                  th(
                                      { id: `x-index-${index2}` },
                                      xIndex.val[index2]
                                  )
                              )
                            : xIndex.val.map((_, index3) =>
                                  td({ id: `x${index3}-y${index - 1}` })
                              ),
                    ])
                )
            )
        );
};

export default Grid;
