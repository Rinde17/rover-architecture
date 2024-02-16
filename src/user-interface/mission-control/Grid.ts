import van from "vanjs-core";

const { table, tbody, tr, th, td } = van.tags;

const Grid = () => {
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
    return table(
        {},
        tbody(
            {},
            yIndex.map((yIndex, index) =>
                tr({ id: index === 0 && "x-index" }, [
                    th(yIndex),
                    index === 0
                        ? xIndex.map((_, index) => th(xIndex[index]))
                        : xIndex.map(() => td()),
                ])
            )
        )
    );
};

export default Grid;
