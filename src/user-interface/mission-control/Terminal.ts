import van from "vanjs-core";

const { div, textarea, span, input } = van.tags;

const Terminal = () => {
    const inputContent = van.state("");
    return [
        div({ id: "std-out" }, textarea({ readOnly: true })),
        div({ id: "cmd" }, [
            span(">"),
            div({ id: "cursor" }),
            input({ type: "text", name: "command", value: inputContent }),
        ]),
    ];
};

export default Terminal;
