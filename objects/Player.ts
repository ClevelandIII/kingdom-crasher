import type { Enemy } from "./Fight";

export type Weapon = {
    name: string;
    damage: number;
};

export type Player = {
    name: string;
    health: number;
    maxHealth: number;
    experience: number;
    level: number;
    gold: number;
    positionX: number;
    positionY: number;
    baseDamage: number;
    state: "NORMAL" | "FIGHT" | "DEATH" | "WIN" | "DIALOGUE";
    location:
        | "Grasslands"
        | "Rainforest"
        | "Rocky Mountains"
        | "Volcana"
        | "Courtyard";
    weapon: Weapon[];
    //currentEnemy: Enemy
    flag: number;
};

export type Quest = {
    name: string;
    description: string;
    inventory: number;
}