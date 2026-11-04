import { useState } from "react";
import Screen from "../components/Screen";
import type { Player } from "../objects/Player";
import Movement from "../components/Movement";
import LocationText from "../components/LocationText";
import Dialogue from "../components/Dialogue";
import type { Enemy } from "../objects/Fight";
import type { Quest } from "../objects/Player";
import QuestUI from "../components/Quest";
import AttackButtons from "../components/AttackButtons";

function App() {
    const map: number[][] = [
        [
            0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
            0, 0,
        ],
        [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1,
        ],
        [
            0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
            0, 0,
        ],
    ];

    const [player, setPlayer] = useState<Player>({
        name: "Penny",
        level: 1,
        experience: 0,
        gold: 0,
        health: 100,
        maxHealth: 100,
        positionX: 0,
        positionY: 1,
        state: "NORMAL",
        location: "Grasslands",
        weapon: [{ name: "Rubber Bullets", damage: 5 }],
        baseDamage: 5,
        flag: 0,
    });

    const [enemy, setEnemy] = useState<Enemy>({
        health: 1,
        damage: 0,
        experience: 0,
        gold: 0,
        name: "None",
        quest: 0,
    });

    const [quest, setQuest] = useState<Quest>({
        name: "None",
        description: "None",
        inventory: 0,
    });

    const [dialogue, setDialogue] = useState<string[]>(["Let's Begin."]);

    function updateLocation(
        location:
            | "Grasslands"
            | "Rocky Mountains"
            | "Volcana"
            | "Courtyard"
            | "Rainforest",
    ): void {
        if (location != player.location) {
            setPlayer({
                ...player,
                location: location,
            });
        }
    }

    function updateState(
        state: "NORMAL" | "DEATH" | "FIGHT" | "WIN" | "DIALOGUE",
    ): void {
        //console.log("here!!!!" + " " + state + " " + player.state);

        if (state != player.state) {
            setPlayer({
                ...player,
                state: state,
            });
        }
        //console.log(player.state);
    }

    function updateDialogue(input: string): void {
        const container = document.getElementById("overflow");

        if (container == null) {
            throw new Error("Container 'overflow' is somehow null");
        }
        console.log(container.scrollTop + " " + container.scrollHeight);

        container.scrollTop = container.scrollHeight;

        setDialogue([...dialogue, input]);
    }

    function updateHealth(Penny: number, Enemy: number): void {
        setPlayer({
            ...player,
            health: Penny,
        });
        setEnemy({
            ...enemy,
            health: Enemy,
        });
    }

    function updateEnemy(input: Enemy): void {
        setEnemy(input);
    }

    function levelUp(input: Player): Player {
        let mH: number = input.maxHealth;
        let h: number = input.health;
        let e: number = input.experience;
        let bD: number = input.baseDamage;
        let l: number = input.level;

        while (e >= 20 * l) {
            mH = Math.ceil(parseFloat((mH * 1.1).toFixed(2)));
            h = mH;
            e = e - 20 * l;
            bD = parseFloat((bD * 1.1).toFixed(2));
            l = l + 1;
        }

        return {
            ...input,
            maxHealth: mH,
            health: h,
            experience: e,
            baseDamage: bD,
            level: l,
        };
    }

    function resetAll(): void {
        setPlayer({
            name: "Penny",
            level: 1,
            experience: 0,
            gold: 0,
            health: 100,
            maxHealth: 100,
            positionX: 0,
            positionY: 1,
            state: "NORMAL",
            location: "Grasslands",
            weapon: [{ name: "Rubber Bullets", damage: 5 }],
            baseDamage: 5,
            flag: 0,
        });
        setEnemy({
            health: 1,
            damage: 0,
            experience: 0,
            gold: 0,
            name: "None",
            quest: 0,
        });
        setDialogue(["Let's Begin."]);
    }

    function updatePlayer(input: Player) {
        console.log(JSON.stringify(input));
        const newPlayer = levelUp(input);
        console.log(JSON.stringify(newPlayer));

        setPlayer(newPlayer);
        console.log(JSON.stringify(player));
    }

    function updateQuest(input: Quest) {
        setQuest(input);
    }

    return (
        <>
            <main className="w-3/5 grid m-auto grid-cols-6 gap-3">
                <section className="border-3 w-full h-full m-auto text-center p-3 grid grid-cols-1 gap-3 col-span-4 grid-rows-3">
                    <div className="h-full row-span-2">
                        <Screen
                            player={player}
                            enemy={enemy}
                            resetAll={resetAll}
                            updateState={updateState}
                            map={map}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 h-full row-span-1">
                        <div id="movement" className="m-auto">
                            <Movement
                                map={map}
                                player={player}
                                enemy={enemy}
                                updateLocation={updateLocation}
                                updateState={updateState}
                                updateDialogue={updateDialogue}
                                updateHealth={updateHealth}
                                updateEnemy={updateEnemy}
                                updatePlayer={updatePlayer}
                                updateQuest={updateQuest}
                                quest={quest}
                            />
                        </div>

                        <AttackButtons
                            player={player}
                            enemy={enemy}
                            updateLocation={updateLocation}
                            updateState={updateState}
                            updateDialogue={updateDialogue}
                            updateHealth={updateHealth}
                            updateEnemy={updateEnemy}
                            updatePlayer={updatePlayer}
                            updateQuest={updateQuest}
                            quest={quest}
                        />
                    </div>
                </section>
                <aside className="w-full h-full m-auto text-center flex flex-col gap-3 col-span-2">
                    <div>
                        <LocationText
                            player={player}
                            updateLocation={updateLocation}
                        />
                    </div>

                    {quest.name == "None" ? (
                        <></>
                    ) : (
                        <div>
                            <QuestUI quest={quest} />
                        </div>
                    )}

                    <Dialogue
                        updateDialogue={updateDialogue}
                        dialogue={dialogue}
                    />
                </aside>
            </main>
        </>
    );
}

export default App;
