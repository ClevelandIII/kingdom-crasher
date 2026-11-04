import type { JSX } from "react/jsx-runtime";
import type { Player } from "../objects/Player";
import location from "../objects/Location";
import fight from "../objects/Fight";
import type { Enemy } from "../objects/Fight";
import { initFight } from "../objects/Fight";
import { setButtons } from "../objects/ButtonReset";
import { flag } from "../objects/Flag";
import type { Quest } from "../objects/Player";

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
    updateState: (
        state: "NORMAL" | "DEATH" | "FIGHT" | "WIN" | "DIALOGUE",
    ) => void;
    updateDialogue: (input: string) => void;
    updateHealth: (input1: number, input2: number) => void;
    updateEnemy: (input: Enemy) => void;
    enemy: Enemy;
    updatePlayer: (input: Player) => void;
    updateQuest: (input: Quest) => void;
    quest: Quest;
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
    updateQuest,
    quest,
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
        if (player.flag > 0 && player.state != "FIGHT") {
            let x = player.positionX;
            let y = player.positionY;
            //console.log(x + " " + y);

            if (x == 2 && y == 1) {
                updateDialogue("You've Entered a Fight!");
                updateState("FIGHT");

                close(["up", "down", "left", "right"]);

                initFight(updateEnemy);
            }
        }
    }

    function doorIndicator() {
        let x = player.positionX;
        let y = player.positionY;

        if (player.flag == 0 && x == 4 && y == 1) {
            updatePlayer({
                ...player,
                flag: (player.flag += 1),
            });
            flag(updateDialogue, player, updateQuest, quest, updatePlayer);
        }

        if (player.flag == 1 && x == 4 && y == 1) {
            flag(updateDialogue, player, updateQuest, quest, updatePlayer);
        }
    }

    function move(e: any): void {
        if (player.state == "NORMAL") {
            let x = player.positionX;
            let y = player.positionY;
            e.preventDefault();
            const direction = e.target.id;

            if (direction == "up" && y - 1 != -1 && map[y - 1][x] == 1) {
                updatePlayer({ ...player, positionY: (player.positionY -= 1) });
            }

            if (direction == "down" && y + 1 != 3 && map[y + 1][x] == 1) {
                updatePlayer({ ...player, positionY: (player.positionY += 1) });
            }

            if (direction == "left" && map[y][x - 1] == 1) {
                updatePlayer({ ...player, positionX: (player.positionX -= 1) });
            }

            if (direction == "right" && map[y][x + 1] == 1) {
                if (player.positionX + 1 < 5) {
                    updatePlayer({
                        ...player,
                        positionX: (player.positionX += 1),
                    });
                } else if (player.positionX + 1 >= 5 && player.flag >= 2) {
                    updatePlayer({
                        ...player,
                        positionX: (player.positionX += 1),
                    });
                }
            }

            hide = setButtons(player, map);

            location(player, updateLocation);
            close(hide);
            doorIndicator();
            fightIndicator();
        }
    }

    return (
        <>
            {player.state == "DEATH" ? (
                <div className="grid grid-cols-5 grid-rows-5 gap-3 h-full">
                    <button className="row-span-2 col-start-3 hide">
                        Shop
                    </button>
                    <button className="row-start-3 col-span-2 hide">
                        Left
                    </button>
                    <button className="row-start-3 col-start-4 col-span-2 hide">
                        Right
                    </button>
                    <button className="col-start-3 row-start-4 row-span-2 hide">
                        Down
                    </button>
                    <button
                        className="col-start-3 row-start-3 hide"
                        id="middle"
                    ></button>
                </div>
            ) : (
                <div className="grid grid-cols-5 grid-rows-5 w-50 h-50">
                    <button
                        className="row-span-2 col-start-3 hide"
                        onClick={move}
                        id="up"
                    >
                        Shop
                    </button>
                    <button
                        className="row-start-3 col-span-2 hide"
                        onClick={move}
                        id="left"
                    >
                        Left
                    </button>
                    <button
                        className="row-start-3 col-start-4 col-span-2 show"
                        onClick={move}
                        id="right"
                    >
                        Right
                    </button>
                    <button
                        className="col-start-3 row-start-4 row-span-2 hide"
                        onClick={move}
                        id="down"
                    >
                        Down
                    </button>

                    <button
                        className="col-start-3 row-start-3 hide"
                        id="middle"
                    ></button>
                </div>
            )}
        </>
    );
}
