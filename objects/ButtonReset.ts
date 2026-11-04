import type { Player } from "./Player";

export function setButtons(player: Player, map: number[][]): string[] {
    let x = player.positionX;
    let y = player.positionY;
    let hide = ["", "", "", ""];

    if (y - 1 == -1 || map[y - 1][x] != 1) {
        hide[0] = "up";
    }

    if (y + 1 == 3 || map[y + 1][x] != 1) {
        hide[1] = "down";
    }

    if (map[y][x - 1] != 1) {
        hide[2] = "left";
    }

    if (map[y][x + 1] != 1) {
        hide[3] = "right";
    } else if (player.positionX + 1 >= 5 && player.flag < 2) {
        hide[3] = "right";
    }

    return hide;
}

export function resetButtons(player: Player, map: number[][]): void {
    let x = player.positionX;
    let y = player.positionY;
    let hide = ["", "", "", ""];

    if (y - 1 == -1 || map[y - 1][x] != 1) {
        hide[0] = "up";
    }

    if (y + 1 == 3 || map[y + 1][x] != 1) {
        hide[1] = "down";
    }

    if (map[y][x - 1] != 1) {
        hide[2] = "left";
    }

    if (map[y][x + 1] != 1) {
        hide[3] = "right";
    }

    let options = ["up", "down", "left", "right"];
    for (let i: number = 0; i < hide.length; i++) {
        //console.log(hide);
        if (hide[i] == "") {
            const id = document.getElementById(options[i]);
            if (id == null) {
                throw new Error("Invalid movement");
            } else {
                const classNames = id.className;
                let close: string[] = classNames.split(" ");

                close[close.length - 1] = "show";

                let newClass = "";
                for (let i = 0; i < close.length; i++) {
                    if (i < close.length - 1) {
                        newClass += close[i] + " ";
                    } else {
                        newClass += close[i];
                    }
                }

                id.className = newClass;
                //console.log(id.className);
            }
        }

        if (hide[i] != "") {
            const id = document.getElementById(hide[i]);
            if (id == null) {
                throw new Error("Invalid movement");
            } else {
                const classNames = id.className;
                let close: string[] = classNames.split(" ");

                close[close.length - 1] = "hide";

                let newClass = "";
                for (let i = 0; i < close.length; i++) {
                    if (i < close.length - 1) {
                        newClass += close[i] + " ";
                    } else {
                        newClass += close[i];
                    }
                }

                id.className = newClass;

                //console.log(id.className);
            }
        }
    }
}
