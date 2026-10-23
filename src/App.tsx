import { useState } from "react";
import Screen from "../components/Screen";
import type { Player } from "../objects/Player";
import Movement from "../components/Movement";
import LocationText from "../components/LocationText";
import Dialogue from "../components/Dialogue";
import type { Enemy } from "../objects/Fight";

function App() {
    const [map, setMap] = useState<number[][]>([
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
    ]);

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
    });

    const [enemy, setEnemy] = useState<Enemy>({
        health: 1,
        damage: 0,
        experience: 0,
        gold: 0,
        name: "None",
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

    function updateState(state: "NORMAL" | "DEATH" | "FIGHT" | "WIN"): void {
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
            mH = parseFloat((input.maxHealth * 1.1).toFixed(2));
            h = parseFloat((input.maxHealth * 1.1).toFixed(2));
            e = input.experience - 20 * input.level;
            bD = parseFloat((input.baseDamage * 1.1).toFixed(2));
            l = input.level + 1;
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
        });
        setEnemy({
            health: 1,
            damage: 0,
            experience: 0,
            gold: 0,
            name: "None",
        });
        setDialogue(["Let's Begin."]);
    }

    function updatePlayer(input: Player) {
        const newPlayer = levelUp(input);
        //console.log(JSON.stringify(newPlayer));

        setPlayer(newPlayer);
    }

    return (
        <>
            <main className="w-3/5 grid m-auto grid-cols-3 gap-3 py-3">
                <section className="border-3 w-full h-full m-auto text-center p-3 grid grid-cols-1 gap-3 row-cols-4 col-span-2">
                    <div className="row-span-3 h-full">
                        <Screen
                            player={player}
                            enemy={enemy}
                            resetAll={resetAll}
                            updateState={updateState}
                        />
                    </div>

                    <div className="grid grid-cols-2 row-span-1 h-full">
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
                        />
                    </div>
                </section>
                <aside className="w-full h-full m-auto text-center grid grid-cols-1 gap-3 row-cols-35">
                    <LocationText
                        player={player}
                        updateLocation={updateLocation}
                    />
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
