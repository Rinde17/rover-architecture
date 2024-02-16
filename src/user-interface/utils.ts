export const printOutput = (message: Array<string>) => {
    const stdoutElement = document.getElementById("textarea");
    for (let i = 0; i < message.length; i++) {
        stdoutElement!.innerHTML += `\n> ${message[i]}`;
    }
    stdoutElement!.scrollTop = stdoutElement!.scrollHeight;
};
