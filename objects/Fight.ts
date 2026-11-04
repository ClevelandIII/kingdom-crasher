import type { Player } from "./Player";
import React from "react";
import type { Quest } from "./Player";

export type Enemy = {
    health: number;
    damage: number;
    gold: number;
    experience: number;
    name: string;
    quest: number;
};

// export type Thief = Enemy & {
//     name: "Thief";
// };

export function initFight(updateEnemy: (input: Enemy) => void) {
    //console.log("test");

    let statsMultiplier = Math.random() * (1.5 - 0.5) + 0.5;
    const rounded = Math.round(statsMultiplier * 10) / 10;
    statsMultiplier = parseFloat(rounded.toFixed(2));

    //console.log(statsMultiplier);

    updateEnemy({
        health: 15 * statsMultiplier,
        gold: 5 * statsMultiplier,
        damage: 5 * statsMultiplier,
        experience: 20 * statsMultiplier,
        name: "Thief",
        quest: 100 * statsMultiplier,
    });
}

function deathCheck(
    Penny: number,
    EnemyHP: number,
    player: Player,
    enemy: Enemy,
    updateDialogue: (input: string) => void,
    updateState: (
        state: "NORMAL" | "DEATH" | "FIGHT" | "WIN" | "DIALOGUE",
    ) => void,
    updateHealth: (penny: number, enemy: number) => void,
    updatePlayer: (input: Player) => void,
    updateEnemy: (input: Enemy) => void,
    updateQuest: (input: Quest) => void,
    quest: Quest,
): boolean {
    console.log(player.health);

    if (Penny <= 0) {
        updateDialogue(`Penny has fallen... Retry?`);
        updatePlayer({ ...player, health: 0, state: "DEATH" });
        return false;
    } else if (EnemyHP <= 0) {
        updateDialogue(
            `Penny won! They got ${enemy.experience} experience and ${enemy.gold} gold!`,
        );
        updatePlayer({
            ...player,
            state: "WIN",
            experience: player.experience + enemy.experience,
            gold: player.gold + enemy.gold,
        });
        updateEnemy({
            ...enemy,
            name: "None",
        });
        updateQuest({
            ...quest,
            inventory: parseFloat((quest.inventory += enemy.quest).toFixed(2)),
        });

        console.log("here!");

        return false;
    } else {
        updateHealth(Penny, EnemyHP);
        return true;
    }
}

export default function fight(
    player: Player,
    enemy: Enemy,
    updateDialogue: (input: string) => void,
    updateHealth: (input1: number, input2: number) => void,
    updateState: (
        state: "NORMAL" | "DEATH" | "FIGHT" | "WIN" | "DIALOGUE",
    ) => void,
    updatePlayer: (input: Player) => void,
    updateEnemy: (input: Enemy) => void,
    updateQuest: (input: Quest) => void,
    quest: Quest,
) {
    if (player.health <= 0) {
        updateDialogue(`Penny has fallen... Retry?`);
        updateState("DEATH");
    } else if (enemy.health <= 0) {
        updateDialogue(
            `Penny won! They got ${enemy.experience} experience and ${enemy.gold} gold!`,
        );
        updateState("NORMAL");
    } else {
        let pStatsMultiplier = Math.random() * (1.5 - 0.5) + 0.5;
        const pRounded = Math.round(pStatsMultiplier * 10) / 10;
        pStatsMultiplier = parseFloat(pRounded.toFixed(2));

        let eStatsMultiplier = Math.random() * (1.5 - 0.5) + 0.5;
        const eRounded = Math.round(eStatsMultiplier * 10) / 10;
        eStatsMultiplier = parseFloat(eRounded.toFixed(2));

        let pDamage: number = parseFloat(
            (player.weapon[0].damage * pStatsMultiplier).toFixed(2),
        );
        let eDamage: number = parseFloat(
            (enemy.damage * eStatsMultiplier).toFixed(2),
        );

        const alive = deathCheck(
            parseFloat((player.health - eDamage).toFixed(2)),
            parseFloat((enemy.health - pDamage).toFixed(2)),
            player,
            enemy,
            updateDialogue,
            updateState,
            updateHealth,
            updatePlayer,
            updateEnemy,
            updateQuest,
            quest,
        );

        if (alive) {
            updateDialogue(
                `Penny dealt ${pDamage} damage to the Thief! Enemy dealt ${eDamage} damage to Penny!`,
            );
        }
    }
}
