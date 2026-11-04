import type { Player } from "../objects/Player";
import type { Enemy } from "../objects/Fight";
import { resetButtons } from "../objects/ButtonReset";

type Props = {
    player: Player;
    enemy: Enemy;
    resetAll: () => void;
    updateState: (state: "NORMAL" | "DEATH" | "FIGHT" | "WIN" | "DIALOGUE") => void;
    map: number[][];
};

export default function Screen({
    player,
    enemy,
    resetAll,
    updateState,
    map,
}: Props) {
    return (
        <>
            {player.state == "DEATH" ? (
                <>
                    <div className="border-3 w-full h-full m-auto flex">
                        <div className="grid grid-cols-1 w-2/5 h-2/5 m-auto">
                            <h1 className="text-2xl font-bold">Try Again?</h1>

                            <button
                                className="cursor-pointer"
                                onClick={() => {
                                    resetAll;
                                    resetButtons(player, map);
                                }}
                            >
                                Restart
                            </button>
                        </div>
                    </div>
                </>
            ) : player.state == "WIN" ? (
                <>
                    <div className="border-3 w-full h-full m-auto flex">
                        <div className="grid grid-cols-1 w-2/5 h-2/5 m-auto">
                            <h1 className="text-2xl font-bold">
                                You Beat the Enemy!
                            </h1>

                            <p>
                                Gained {enemy.experience} experience and{" "}
                                {enemy.gold} gold!
                            </p>

                            <button
                                className="cursor-pointer"
                                onClick={() => {
                                    updateState("NORMAL");
                                    resetButtons(player, map);
                                }}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="border-3 w-full h-full m-auto grid grid-cols-1 gap-3">
                        <div>
                            <ul className="flex justify-evenly">
                                <li>Health: {player.health}/{player.maxHealth}</li>
                                <li>Level: {player.level}</li>
                            </ul>
                        </div>
                        {enemy.name == "None" ? (
                            <></>
                        ) : (
                            <div>
                                <ul className="flex justify-evenly">
                                    <li>Name: {enemy.name}</li>
                                    <li>Health: {enemy.health}</li>
                                    <li>Damage: {enemy.damage}</li>
                                    <li>Gold: {enemy.gold}</li>
                                    <li>Experience: {enemy.experience}</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
