import { Socket } from "socket.io-client";
import van from "vanjs-core";

const { table, tbody, tr, th, td } = van.tags;

const Grid = (socket: Socket) => {
    const xIndex: Array<string> = [
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
        "K",
        "L",
    ];
    const yIndex: Array<string> = [
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
        "11",
        "12",
    ];

    socket.on("rover-position", (positions) => {
        console.log(positions);
    });
    return table(
        {},
        tbody(
            {},
            yIndex.map((yIndexLabel, index) =>
                tr({ id: index === 0 ? "x-index" : `row-${index}` }, [
                    th({ id: `y-index-${index}` }, yIndexLabel),
                    index === 0
                        ? xIndex.map((xIndexLabel, index2) =>
                              th({ id: `x-index-${index2}` }, xIndex[index2])
                          )
                        : xIndex.map((_, index3) =>
                              td({ id: `x${index - 1}-y${index3}` })
                          ),
                ])
            )
        )
    );
};

export default Grid;
