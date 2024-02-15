import van from "vanjs-core";

const { table, tbody } = van.tags;

const Grid = () => {
    return table({}, tbody());
};

export default Grid;
