import type { JSX } from "react/jsx-runtime";
import type { Player } from "../objects/Player";
import location from "../objects/Location";
import fight from "../objects/Fight";
import type { Enemy } from "../objects/Fight";
import { initFight } from "../objects/Fight";

type Props = {
    map: number[][];
    player: Player;
    updateLocation: (
        location:
            | "Grasslands"
            | "Rocky Mountains"
            | "Volcana"
            | "Courtyard"
            | "Rainforest",
    ) => void;
    updateState: (state: "NORMAL" | "DEATH" | "FIGHT" | "WIN") => void;
    updateDialogue: (input: string) => void;
    updateHealth: (input1: number, input2: number) => void;
    updateEnemy: (input: Enemy) => void;
    enemy: Enemy;
    updatePlayer: (input: Player) => void;
};

export default function Movement({
    map,
    player,
    enemy,
    updateLocation,
    updateState,
    updateDialogue,
    updateHealth,
    updateEnemy,
    updatePlayer,
}: Props): JSX.Element {
    let hide: string[] = ["", "", "", ""];

    function close(hide: string[]): void {
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

    function fightIndicator() {
        let x = player.positionX;
        let y = player.positionY;
        //console.log(x + " " + y);

        if (x == 2 && y == 1) {
            updateDialogue("You've Entered a Fight!");
            updateState("FIGHT");

            let attack = document.getElementById("attack");
            if (attack == null) {
                throw new Error("Invalid movement");
            } else {
                let open: string[] = attack.className.split(" ");
                open[open.length - 1] = "show";

                let newClass = "";
                for (let i = 0; i < open.length; i++) {
                    if (i < open.length - 1) {
                        newClass += open[i] + " ";
                    } else {
                        newClass += open[i];
                    }
                }

                attack.className = newClass;
                close(["up", "down", "left", "right"]);
            }
            initFight(updateEnemy);
        }
    }

    function move(e: any): void {
        if (player.state == "NORMAL") {
            let x = player.positionX;
            let y = player.positionY;
            e.preventDefault();
            const direction = e.target.id;
            hide = ["", "", "", ""];

            if (direction == "up" && y - 1 != -1 && map[y - 1][x] == 1) {
                player.positionY -= 1;
            }

            if (direction == "down" && y + 1 != 3 && map[y + 1][x] == 1) {
                player.positionY += 1;
            }

            if (direction == "left" && map[y][x - 1] == 1) {
                player.positionX -= 1;
            }

            if (direction == "right" && map[y][x + 1] == 1) {
                player.positionX += 1;
            }

            x = player.positionX;
            y = player.positionY;
            //console.log(x + " " + y);

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

            location(player, updateLocation);
            close(hide);
            fightIndicator();
        }
    }

    function attack() {
        if (player.state == "FIGHT") {
            fight(
                player,
                enemy,
                updateDialogue,
                updateHealth,
                updateState,
                updatePlayer,
                updateEnemy,
            );
        }
    }

    return (
        <>
            {player.state == "DEATH" ? (
                <>
                    <div className="grid grid-cols-4 grid-rows-4 gap-3 h-full">
                        <button className="col-span-2 col-start-2 hide">
                            Up
                        </button>
                        <button className="row-span-2 row-start-2 hide">
                            Left
                        </button>
                        <button className="row-span-2 row-start-2 col-start-4 hide">
                            Right
                        </button>
                        <button className="col-span-2 col-start-2 row-start-4 hide">
                            Down
                        </button>

                        <button className="col-span-2 col-start-2 row-start-2 row-span-2 hide m-3 ">
                            Attack
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-4 grid-rows-4 gap-3 h-full">
                        <button
                            className="col-span-2 col-start-2 hide"
                            onClick={move}
                            id="up"
                        >
                            Up
                        </button>
                        <button
                            className="row-span-2 row-start-2 hide"
                            onClick={move}
                            id="left"
                        >
                            Left
                        </button>
                        <button
                            className="row-span-2 row-start-2 col-start-4 show"
                            onClick={move}
                            id="right"
                        >
                            Right
                        </button>
                        <button
                            className="col-span-2 col-start-2 row-start-4 hide"
                            onClick={move}
                            id="down"
                        >
                            Down
                        </button>

                        <button
                            className="col-span-2 col-start-2 row-start-2 row-span-2 m-3 hide"
                            id="attack"
                            onClick={attack}
                        >
                            Attack
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
