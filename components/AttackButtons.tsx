import type { JSX } from "react/jsx-runtime";
import type { Player } from "../objects/Player";
import fight from "../objects/Fight";
import type { Enemy } from "../objects/Fight";
import type { Quest } from "../objects/Player";

type Props = {
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

export default function AttackButtons({
    player,
    enemy,
    updateState,
    updateDialogue,
    updateHealth,
    updateEnemy,
    updatePlayer,
    updateQuest,
    quest,
}: Props): JSX.Element {
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
                updateQuest,
                quest,
            );
        }
    }
    return (
        <>
            {player.state == "DEATH" ? (
                <div className="grid grid-cols-2 grid-rows-2 m-auto">
                    <button className="w-10 h-10 m-auto rounded-full hide"></button>
                    <button className="w-10 h-10 m-auto rounded-full hide"></button>
                    <p>
                        Attack/<br></br>Interact
                    </p>
                    <p>Heal</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 grid-rows-2 m-auto">
                    <button
                        className="w-10 h-10 m-auto rounded-full show"
                        onClick={attack}
                    ></button>
                    <button className="w-10 h-10 m-auto rounded-full show"></button>
                    <p>
                        Attack/<br></br>Interact
                    </p>
                    <p>Heal</p>
                </div>
            )}
        </>
    );
}
